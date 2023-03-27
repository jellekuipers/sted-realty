import { prisma } from "../src/server/db";

async function main() {
  await prisma.user.create({
    data: {
      email: "info+admin@jellekuipers.com",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const firstSeller = await prisma.user.create({
    data: {
      email: "info+seller01@jellekuipers.com",
      role: "SELLER",
      status: "ACTIVE",
    },
  });

  const secondSeller = await prisma.user.create({
    data: {
      email: "info+seller02@jellekuipers.com",
      role: "SELLER",
      status: "ACTIVE",
    },
  });

  await prisma.user.create({
    data: {
      email: "info+buyer@jellekuipers.com",
      role: "BUYER",
      status: "ACTIVE",
    },
  });

  await prisma.listing.create({
    data: {
      address: "Isabellastraat 57",
      city: "Oosterhout",
      zipcode: "4901JP",
      slug: "isabellastraat-59-4901jp-oosterhout",
      userId: firstSeller?.id,
    },
  });

  await prisma.listing.create({
    data: {
      address: "De Wetering 53",
      city: "Oosterhout",
      zipcode: "4906CT",
      slug: "de-wetering-51-4906ct-oosterhout",
      userId: firstSeller?.id,
    },
  });

  await prisma.listing.create({
    data: {
      address: "Essenburgstraat 19-03",
      city: "Rotterdam",
      zipcode: "3022MB",
      slug: "essenburgstraat-19-03-3022mb-rotterdam",
      userId: secondSeller?.id,
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
