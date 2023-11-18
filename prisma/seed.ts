import { PrismaClient } from "@prisma/client";
import { hash, genSalt } from "bcrypt";
const prisma = new PrismaClient();
import { faker } from "@faker-js/faker";

async function generateProducts(quantity: number) {
  for (let i = 0; i < quantity; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price({ min: 50 }), 10),
        image: faker.image.urlLoremFlickr({
          category: "products",
        }),
      },
    });
  }
}
async function main() {
  const salt = await genSalt(10);
  const hashedPassword = await hash("admin123", salt);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@admin.com",
      password: hashedPassword, // admin123
      role: "ADMIN",
    },
  });

  console.log(
    "Admin with admin@admin.com and password admin123 has been created"
  );

  await generateProducts(10);
  console.log("10 Fake product created");
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
