import { type GetServerSidePropsContext, type NextPage } from "next";
import { Layout } from "~/components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight">sted</h1>
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
