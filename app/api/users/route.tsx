import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { Prisma } from "@prisma/client";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.admins.findMany();

  if (!users) {
    return NextResponse.json({
      error: "Connection to the Database has been Cut off!!!",
    });
  }

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }
  const isUserExist = await prisma.admins.findUnique({
    where: {
      Admin_UserName: body.username,
    },
  });

  if (isUserExist) {
    return NextResponse.json(
      { message: `the user ${body.username} Already Exist in Database.` },
      { status: 403 }
    );
  }

  const newUser = await prisma.admins.create({
    data: {
      Admin_UserName: body.username,
      Admin_Password: body.password,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
