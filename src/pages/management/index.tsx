import { type GetServerSidePropsContext, type NextPage } from "next";
import { useTranslations } from "next-intl";
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
import { StyledLink } from "~/components/styled-link";
import { HeadingContainer } from "~/components/heading-container";

const Management: NextPage = () => {
  const { data: session } = useSession();

  const { data: listings, isLoading: isLoadingListings } =
    api.listings.getAllByUserId.useQuery({ userId: session?.user.id });

  const t = useTranslations();

  return (
    <Layout>
      <HeadingContainer>
        <Heading variant="h1">{t("management")}</Heading>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <StyledLink href="/listings/new" variant="button">
            {t("add_listing")}
          </StyledLink>
        </div>
      </HeadingContainer>
      <ListingOverview
        listings={listings}
        loading={isLoadingListings}
        user={session?.user}
        view="management"
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

  if (!session || session.user.role !== "SELLER") {
    return {
      redirect: {
        destination: "/",
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
