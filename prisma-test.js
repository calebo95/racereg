// prisma-test.js
import prisma from "./lib/prisma.js";

async function testPrisma() {
  try {
    const users = await prisma.user.findMany();
    console.log("Prisma connection successful. Users:", users);
  } catch (error) {
    console.error("Prisma connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
