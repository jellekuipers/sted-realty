import { type GetServerSidePropsContext, type NextPage } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { useSession } from "next-auth/react";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { Heading } from "~/components/heading";
import { Layout } from "~/components/layout";
import { ListingOverview } from "~/components/listing-overview";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import { appRouter } from "~/server/api/root";

const Management: NextPage = () => {
  const { data: session } = useSession();

  const { data: listings, isLoading: isLoadingListings } =
    api.listings.getAll.useQuery();

  const t = useTranslations();

  return (
    <Layout>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <Heading variant="h1">{t("management")}</Heading>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Link
            href="/listings/new"
            className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            {t("add_listing")}
          </Link>
        </div>
      </div>
      <ListingOverview
        listings={listings}
        loading={isLoadingListings}
        user={session?.user}
      />
    </Layout>
  );
};

export default Management;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext(),
    transformer: superjson,
  });

  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  await ssg.listings.getAllByUserId.prefetch({ userId: session.user.id });

  return {
    props: {
      session,
      trpcState: ssg.dehydrate(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      messages: (
        await import(`../../translations/${context.locale as string}.json`)
      ).default,
    },
  };
}
