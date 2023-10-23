"use client";
import { ColumnsType } from "antd/es/table";
import { title } from "process";
import React, { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";

const page = () => {
  return (
    <div className="w-screen flex justify-center align-middle bg-gray-50 py-8">
      <UsersTable />
    </div>
  );
};

export default page;
