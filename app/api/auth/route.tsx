// pages/auth/login.tsx
import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate user credentials
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const [username, password] = [body.username, body.password];

  // Authenticate the user (check credentials in the database)
  const user = await prisma.students.findFirst({
    where: {
      Student_Username: username,
      Student_Password: password,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "نام کاربری و یا رمز عبور اشتباه است" },
      { status: 401 }
    );
  }

  // Generate a JWT token
  const secretKey = "your-secret-key";
  const token = sign({ userId: user.Student_Username }, secretKey, {
    expiresIn: "1h",
  });

  return NextResponse.json({ status: 200, token, user });
}
