import { type GetServerSidePropsContext, type NextPage } from "next";
import { Layout } from "~/components/layout";
import { ListingOverview } from "~/components/listing-overview";

const Listing: NextPage = () => {
  return (
    <Layout>
      <ListingOverview />
    </Layout>
  );
};

export default Listing;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      messages: (
        await import(`../../translations/${context.locale as string}.json`)
      ).default,
    },
  };
}
