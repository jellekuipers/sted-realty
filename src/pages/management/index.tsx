import { type GetServerSidePropsContext, type NextPage } from "next";
import { useTranslations } from "next-intl";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { Heading } from "~/components/heading";
import { Layout } from "~/components/layout";
import { ListingOverview } from "~/components/listing-overview";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import { appRouter } from "~/server/api/root";

const Management: NextPage = () => {
  const { data: listings, isLoading: isLoadingListings } =
    api.listings.getAll.useQuery();
  const t = useTranslations();

  return (
    <Layout>
      <Heading variant="h1">{t("management")}</Heading>
      <ListingOverview listings={listings} loading={isLoadingListings} />
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

  await ssg.listings.getAll.prefetch();

  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

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
