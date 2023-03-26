import { type GetServerSidePropsContext, type NextPage } from "next";
import { Heading } from "~/components/heading";
import { Layout } from "~/components/layout";
import { ListingOverview } from "~/components/listing-overview";

const Home: NextPage = () => {
  return (
    <Layout>
      <Heading variant="h1">sted</Heading>
      <ListingOverview />
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      messages: (
        await import(`../translations/${context.locale as string}.json`)
      ).default,
    },
  };
}
