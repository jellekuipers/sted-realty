import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { type GetServerSidePropsContext, type NextPage } from "next";
import superjson from "superjson";
import { Heading } from "~/components/heading";
import { Layout } from "~/components/layout";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";

const EditListing: NextPage<{ slug: string }> = ({ slug }) => {
  const { data: listing } = api.listings.getBySlug.useQuery({ slug });

  return (
    <Layout>
      <Heading variant="h1">
        {listing?.address}, {listing?.city}
      </Heading>
    </Layout>
  );
};

export default EditListing;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext(),
    transformer: superjson,
  });

  const slug = context.params?.slug as string;

  await ssg.listings.getBySlug.prefetch({ slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      messages: (
        await import(`../../../translations/${context.locale as string}.json`)
      ).default,
    },
  };
}
