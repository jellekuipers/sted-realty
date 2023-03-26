import { type GetServerSidePropsContext, type NextPage } from "next";
import { useTranslations } from "next-intl";
import { Heading } from "~/components/heading";
import { Layout } from "~/components/layout";

const Listing: NextPage = () => {
  const t = useTranslations();

  return (
    <Layout>
      <Heading variant="h1">{t("listings")}</Heading>
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
