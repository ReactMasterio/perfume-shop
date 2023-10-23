import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import PostSchema from "./gettingStudentRole";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { studentid: string } }
) {
  const { studentid } = params;
  console.log(studentid);

  const student = await prisma.students.findFirst({
    where: {
      Student_ID: studentid,
    },
  });

  if (!student) {
    return NextResponse.json({ error: "کاربر پیدا نشد" });
  }

  return NextResponse.json(student);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = PostSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors });
  }

  const user = await prisma.students.findFirst({
    where: {
      Student_ID: body.studentID,
    },
  });

  const userInfo = {
    ID: user?.Student_ID,
    Username: user?.Student_Username,
    role: user?.Student_Role,
  };

  return NextResponse.json(userInfo, { status: 200 });
}

export async function PUT(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "درخواست ارسال شده خالی از داده است" },
      { status: 400 }
    );
  }

  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const student = await prisma.students.findFirst({
    where: {
      Student_ID: body.studentID,
    },
  });

  if (!student) {
    return NextResponse.json({ error: "کاربر پیدا نشد" }, { status: 404 });
  }

  const dataToUpdate: any = {};

  if (student.Student_Username !== body.username) {
    dataToUpdate.Student_Username = body.username;
  }

  // Check if 'studentID' has changed
  if (student.Student_ID !== body.studentID) {
    dataToUpdate.Student_ID = body.studentID;
  }

  // Check if 'student_phone_number' has changed
  if (student.Student_Phone_Number !== body.student_phone_number) {
    dataToUpdate.Student_Phone_Number = body.student_phone_number;
  }

  // Check if 'student_social_security_number' has changed
  if (
    student.Student_Social_Security_Number !==
    body.student_social_security_number
  ) {
    dataToUpdate.Student_Social_Security_Number =
      body.student_social_security_number;
  }

  // Check if 'password' has changed
  if (student.Student_Password !== body.password) {
    dataToUpdate.Student_Password = body.password;
  }

  // Check if 'student_name' has changed
  if (student.Student_Name !== body.student_name) {
    dataToUpdate.Student_Name = body.student_name;
  }

  // Check if 'student_email' has changed
  if (student.Student_Email !== body.student_email) {
    dataToUpdate.Student_Email = body.student_email;
  }

  // Check if 'isStudentAdmin' has changed
  if (student.Student_Role !== body.student_role) {
    dataToUpdate.Student_Role = body.student_role;
  }

  // Update the user if any data has changed
  if (Object.keys(dataToUpdate).length > 0) {
    const updatedUser = await prisma.students.update({
      where: { Student_ID: student.Student_ID }, // Assuming you have the user's ID
      data: dataToUpdate,
    });

    return NextResponse.json(
      {
        updatedUser,
        changed: Object.keys(dataToUpdate).length,
        message: "اطلاعات کاربر آپدیت شد",
      },
      { status: 202 }
    );
  }

  return NextResponse.json(
    {
      error:
        " داده وارد شده با پایگاه داده چک شد و تفاوتی پیدا نشد، بنابراین به‌روزرسانی صورت نگرفته است",
    },
    { status: 400 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params: { studentid } }: { params: { studentid: string } }
) {
  const student = await prisma.students.findFirst({
    where: {
      Student_ID: studentid,
    },
  });

  if (!student) {
    return NextResponse.json({ error: "کاربر پیدا نشد" }, { status: 404 });
  }

  const deletedStudent = await prisma.students.delete({
    where: {
      Student_ID: studentid,
    },
  });

  return NextResponse.json(
    { message: "رکورد حذف شد", deletedStudent },
    { status: 202 }
  );
}
