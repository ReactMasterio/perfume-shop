import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors });
  }

  const user = await prisma.students.findFirst({
    where: {
      Student_Username: body.username,
    },
  });

  return NextResponse.json({ role: user?.Student_Role }, { status: 200 });
}
