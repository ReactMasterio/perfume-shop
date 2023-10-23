import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { Prisma } from "@prisma/client";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const users = await prisma.students.findMany();

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

  const isUserExist = await prisma.students.findUnique({
    where: {
      Student_ID: body.studentID,
    },
  });

  const isUsernameExist = await prisma.students.findFirst({
    where: {
      Student_Username: body.username,
    },
  });

  if (isUserExist) {
    return NextResponse.json(
      { error: "دانشجو با این شماره دانشجویی قبلا ثبت نام کرده است" },
      { status: 400 }
    );
  }
  if (isUsernameExist) {
    return NextResponse.json(
      { error: "این نام کاربری را یک کابر دیگر استفاده میکند" },
      { status: 400 }
    );
  }

  const newUser = await prisma.students.create({
    data: {
      Student_Name: body.student_name,
      Student_Social_Security_Number: body.student_social_security_number,
      Student_ID: body.studentID,
      Student_Phone_Number: body.student_phone_number,
      Student_Email: body.student_email,
      Student_Username: body.username,
      Student_Password: body.password,
      Student_Role: body.student_role,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
