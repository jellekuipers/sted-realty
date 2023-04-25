import { type Listing } from "@prisma/client";
import { type GetServerSidePropsContext, type NextPage } from "next";
import { useTranslations } from "next-intl";
import { type SubmitHandler } from "react-hook-form";
import { Heading } from "~/components/heading";
import { HeadingContainer } from "~/components/heading-container";
import { Layout } from "~/components/layout";
import { ListingForm } from "~/components/listing-form";
import { getServerAuthSession } from "~/server/auth";

const NewListing: NextPage = () => {
  const t = useTranslations();

  const onSubmit: SubmitHandler<Listing> = (data) => console.log(data);

  return (
    <Layout>
      <HeadingContainer>
        <Heading variant="h1">{t("add_listing")}</Heading>
      </HeadingContainer>
      <ListingForm onSubmit={onSubmit} />
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
