import slugify from "slugify";
import { prisma } from "../src/server/db";

async function main() {
  await prisma.user.create({
    data: {
      email: "info+admin@jellekuipers.com",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  await prisma.user.create({
    data: {
      email: "info+seller01@jellekuipers.com",
      role: "SELLER",
      status: "ACTIVE",
      listings: {
        createMany: {
          data: [
            {
              address: "Isabellastraat 57",
              city: "Oosterhout",
              zipcode: "4901JP",
              slug: slugify('Isabellastraat 57 4901JP Oosterhout'),
            },
            {
              address: "De Wetering 53",
              city: "Oosterhout",
              zipcode: "4906CT",
              slug: slugify('De Wetering 53 4906CT Oosterhout'),
            },
            {
              address: "Zichtbeemd 20",
              city: "Oosterhout",
              zipcode: "4907DE",
              slug: slugify('Zichtbeemd 20 4907DE Oosterhout'),
            },
            {
              address: "Leijsenhoek 20",
              city: "Oosterhout",
              zipcode: "4901ET",
              slug: slugify('Leijsenhoek 20 4901ET Oosterhout'),
            },
          ],
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "info+seller02@jellekuipers.com",
      role: "SELLER",
      status: "ACTIVE",
      listings: {
        createMany: {
          data: [
            {
              address: "Essenburgstraat 19-03",
              city: "Rotterdam",
              zipcode: "3022MB",
              slug: "essenburgstraat-19-03-3022mb-rotterdam",
            },
          ],
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "info+buyer@jellekuipers.com",
      role: "BUYER",
      status: "ACTIVE",
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
