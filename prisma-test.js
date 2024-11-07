import prisma from "./lib/prisma.js";

async function testPrisma() {
  const user = await prisma.user.findFirst();
  console.log("User from Prisma:", user);
}

testPrisma();
