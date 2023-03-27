import { type GetServerSidePropsContext, type NextPage } from "next";
import { useTranslations } from "next-intl";
import { Heading } from "~/components/heading";
import { Layout } from "~/components/layout";
import { ListingForm } from "~/components/listing-form";
import { getServerAuthSession } from "~/server/auth";

const NewListing: NextPage = () => {
  const t = useTranslations();

  return (
    <Layout>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <Heading variant="h1">{t("add_listing")}</Heading>
      </div>
      <ListingForm />
    </Layout>
  );
};

export default NewListing;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session || session.user.role === "BUYER") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      messages: (
        await import(`../../translations/${context.locale as string}.json`)
      ).default,
    },
  };
}
