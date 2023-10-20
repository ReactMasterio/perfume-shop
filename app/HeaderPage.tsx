"use client";
import React from "react";
import logo from "@/public/next.svg";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "antd";

const { Header } = Layout;

const HeaderPage = () => {
  return (
    <Layout className="layout">
      <Header className="shadow-md">
        <Link href="/authentication/login">
          <Image src={logo} alt="logo" className="h-[50px] w-[50px]" />
        </Link>
      </Header>
    </Layout>
  );
};

export default HeaderPage;
