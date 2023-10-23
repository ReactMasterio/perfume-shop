"use client";
import React, { useEffect, useState } from "react";
import StudentsTable from "../components/StudentsTable";
import Cookies from "js-cookie";
import Unauthorized from "../components/Unauthorized";
import { Button, Typography } from "antd";
import Link from "next/link";

const { Title } = Typography;

const StudentsPage = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(null);
  useEffect(() => {
    const getUser: any = Cookies.get("username");
    setUsername(getUser);
    const role: any = Cookies.get("role");
    setRole(role);
  }, []);

  if (role === "admin") {
    return (
      <div className="w-screen flex justify-center align-middle bg-gray-50 py-8">
        <StudentsTable />
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen[850px] text-center">
        <Unauthorized />
        <Title level={3} type="danger">
          {username} شما به این صفحه دسترسی ندارید
        </Title>
        <Link href="/">
          <Button type="default" size="middle">برگشت به صفحه اصلی</Button>
        </Link>
      </div>
    );
  }
};

export default StudentsPage;
