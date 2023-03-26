import { type GetServerSidePropsContext, type NextPage } from "next";
import { useTranslations } from "next-intl";
import { Heading } from "~/components/heading";
import { Layout } from "~/components/layout";
import { getServerAuthSession } from "~/server/auth";

const Profile: NextPage = () => {
  const t = useTranslations();

  return (
    <Layout>
      <Heading variant="h1">{t("profile")}</Heading>
    </Layout>
  );
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      messages: (
        await import(`../../translations/${context.locale as string}.json`)
      ).default,
    },
  };
}
