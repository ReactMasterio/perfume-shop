"use client";
import React, { use, useEffect, useState } from "react";
import logo from "@/public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { Button, Dropdown, MenuProps, Space, message } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
const jwt = require("jsonwebtoken");

const HeaderPage = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");

  useEffect(() => {
    const fetchData = async () => {
      if (Cookies.get("auth_token")) {
        setIsUserLoggedIn(true);
        const getUser = Cookies.get("username");
        const StudentID = Cookies.get("StudentID");
        setUsername(getUser!);
        const reqBody = {
          studentID: StudentID,
        };

        try {
          const response = await axios.post(
            `/api/students/${StudentID}`,
            reqBody
          );
          if (response.status === 200) {
            setRole(response.data.role);
            Cookies.set("role", response.data.role);
          }
        } catch (error) {
          setRole("student");
        }
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    Cookies.remove("username");
    Cookies.remove("role");
    window.location.href = "/authentication/login";
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href="/" onClick={handleLogout}>
          Log Out
        </Link>
      ),
      icon: <TrashIcon className="w-5 h-5 " />,
      danger: true,
    },
  ];

  return (
    <>
      <header className="flex justify-between align-middle w-full py-5 shadow-md">
        <Link href="/authentication/login">
          <Image src={logo} alt="logo" className="h-[50px] w-[50px]" />
        </Link>

        <ul className="flex align-middle justify-between">
          {role === "admin" && (
            <>
              <li className="self-center hover:bg-gray-50 border border-gray-200 rounded-md mx-2 px-8 py-2 transition duration-300  ">
                <Link href="/users">کاربران</Link>
              </li>
              <li className="self-center hover:bg-gray-50 border border-gray-200 rounded-md mx-2 px-8 py-2 transition duration-300  ">
                <Link href="/students">دانشجویان</Link>
              </li>
            </>
          )}
          <li className="self-center hover:bg-gray-50 border border-gray-200 rounded-md mx-2 px-8 py-2 transition duration-300  ">
            <Link href="/">دوره ها</Link>
          </li>
          <li className="self-center hover:bg-gray-50 border border-gray-200 rounded-md mx-2 px-8 py-2 transition duration-300  ">
            <Link href="/">نظرسنجی</Link>
          </li>
        </ul>

        {isUserLoggedIn ? (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="border border-gray-200 shadow-sm rounded-md self-center px-4 py-2 mx-5"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {username ? username : "try again"}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Link
            href="/authentication/login"
            className="border border-gray-200 rounded-lg px-8 py-2 mx-5 self-center shadow-sm hover:bg-blue-800 transition duration-300 hover:text-white"
          >
            ورود
          </Link>
        )}
      </header>
    </>
  );
};

export default HeaderPage;
