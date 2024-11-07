// app/api/profile/[userId]/route.js
import prisma from "../../../../lib/prisma.js";

// Get user profile by user ID
export async function GET(req, { params }) {
  const { userId } = params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    select: { name: true, email: true, phone: true, isRunner: true, isDirector: true }
  });
  if (!user) return new Response("User not found", { status: 404 });
  return new Response(JSON.stringify(user), { status: 200 });
}

// Update user profile
export async function PUT(req, { params }) {
  const { userId } = params;
  const data = await req.json();
  const user = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      name: data.name,
      phone: data.phone,
      isRunner: data.isRunner,
      isDirector: data.isDirector,
    },
  });
  return new Response(JSON.stringify(user), { status: 200 });
}
