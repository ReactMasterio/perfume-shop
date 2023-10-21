"use client";
import { ColumnsType } from "antd/es/table";
import { title } from "process";
import React, { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";

const page = () => {
  return (
    <div className="container w-[550px] mx-auto m-5">
      <UsersTable />
    </div>
  );
};

export default page;
