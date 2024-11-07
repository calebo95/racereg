// app/api/register/route.js

import { hash } from "bcryptjs";
import prisma from "../../../lib/prisma.js";

export async function POST(req) {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Hash password and create new user
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
}
