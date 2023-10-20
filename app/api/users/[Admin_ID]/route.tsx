import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { Admin_ID: string } }
) {
  const user = await prisma.admins.findUnique({
    where: {
      Admin_ID: parseInt(params.Admin_ID),
    },
  });
  if (!user) {
    return NextResponse.json({ error: "user Not Found!" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { Admin_ID: string } }
) {
  const id = parseInt(params.Admin_ID);
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  if (!id) {
    return NextResponse.json({ error: "User Not Found!" }, { status: 404 });
  }

  const updatedUser =await prisma.admins.update({
    where: { Admin_ID: id },
    data: {
      Admin_UserName: body.username,
      Admin_Password: body.password,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { Admin_ID: number } }
) {
  if (params.Admin_ID > 10) {
    return NextResponse.json({ error: "User Not Found!" }, { status: 404 });
  }

  return NextResponse.json({ Admin_ID: params.Admin_ID }, { status: 200 });
}
