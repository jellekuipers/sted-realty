import { prisma } from "../src/server/db";

async function main() {
  await prisma.user.create({
    data: {
      email: "info+sted@jellekuipers.com",
      role: "ADMIN",
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "info@jellekuipers.com",
      role: "SELLER",
    },
  });

  await prisma.listing.create({
    data: {
      address: "Isabellastraat 59",
      city: "Oosterhout",
      zipcode: "4901JP",
      slug: "isabellastraat-59-4901jp-oosterhout",
      userId: user?.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
