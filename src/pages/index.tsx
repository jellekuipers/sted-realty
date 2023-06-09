import { type GetServerSidePropsContext, type NextPage } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { useSession } from "next-auth/react";
import { Layout } from "~/components/layout";
import { ListingOverview } from "~/components/listing-overview";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";
import { query } from "../../../filter-query/src/index";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const { data: listings, isLoading: isLoadingListings } =
    api.listings.getAllByStatus.useQuery({
      accessibility: "PUBLIC",
      activity: "ACTIVE",
    });

    useEffect(() => {
    if (typeof window !== undefined && typeof window === 'object') {
      console.log(query);
    }
  }, []);

  return (
    <Layout>
      <ListingOverview
        listings={listings}
        loading={isLoadingListings}
        user={session?.user}
        view="public"
      />
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext(),
    transformer: superjson,
  });

  await ssg.listings.getAllByStatus.prefetch({
    accessibility: "PUBLIC",
    activity: "ACTIVE",
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      messages: (
        await import(`../translations/${context.locale as string}.json`)
      ).default,
    },
  };
}
