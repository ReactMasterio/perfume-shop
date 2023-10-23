"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import axios from "axios";
import AddUserButton from "./AddUserButton";
import EditUserButton from "./EditUserButton";
import DeleteUserButton from "./DeleteUserButton";

interface User {
  Student_ID: string;
  Student_Name: string;
  Student_Social_Security_Number: string;
  Student_Phone_Number: string;
  Student_Email: string;
  Student_Username: string;
}

const StudentsTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("/api/students")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []);

  const columns = [
    {
      title: "#",
      key: "action",
      render: (_: any, user: User) => (
        <Space>
          <EditUserButton Student_ID={user.Student_ID} />
          <DeleteUserButton Student_ID={user.Student_ID} />
        </Space>
      ),
    },
    {
      title: "نام",
      dataIndex: "Student_Name",
      key: "Student_Name",
    },
    {
      title: "کد ملی",
      dataIndex: "Student_Social_Security_Number",
      key: "Student_Social_Security_Number",
    },
    {
      title: "شماره دانشجویی",
      dataIndex: "Student_ID",
      key: "Student_ID",
    },
    {
      title: "شماره تلفن",
      dataIndex: "Student_Phone_Number",
      key: "Student_Phone_Number",
    },
    {
      title: "ایمیل",
      dataIndex: "Student_Email",
      key: "Student_Email",
    },
    {
      title: "نام کاربری",
      dataIndex: "Student_Username",
      key: "Student_Username",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded w-3/4">
      <AddUserButton />
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default StudentsTable;
