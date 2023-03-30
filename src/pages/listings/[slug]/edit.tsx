import { type Listing } from "@prisma/client";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { type GetServerSidePropsContext, type NextPage } from "next";
import { type SubmitHandler } from "react-hook-form";
import superjson from "superjson";
import { Heading } from "~/components/heading";
import { HeadingContainer } from "~/components/heading-container";
import { Layout } from "~/components/layout";
import { ListingForm } from "~/components/listing-form";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

const EditListing: NextPage<{ slug: string }> = ({ slug }) => {
  const { data: listing } = api.listings.getBySlug.useQuery({ slug });

  const apiContext = api.useContext();

  const updateListing = api.listings.update.useMutation({
    onSuccess: () => apiContext.listings.getBySlug.refetch({ slug }),
  });

  const onSubmit: SubmitHandler<Listing> = async (data) =>
    await updateListing.mutateAsync(data);

  return (
    <Layout>
      <HeadingContainer>
        <Heading variant="h1">
          {listing?.address}, {listing?.zipcode} {listing?.city}
        </Heading>
      </HeadingContainer>
      <ListingForm listing={listing} onSubmit={onSubmit} />
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

  const session = await getServerAuthSession(context);

  const slug = context.params?.slug as string;

  const listing = await ssg.listings.getBySlug.fetch({ slug });

  const userCanEdit =
    listing?.userId === session?.user.id || session?.user.role === "ADMIN";

  if (!session || !userCanEdit) {
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
      trpcState: ssg.dehydrate(),
      slug,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      messages: (
        await import(`../../../translations/${context.locale as string}.json`)
      ).default,
    },
  };
}
