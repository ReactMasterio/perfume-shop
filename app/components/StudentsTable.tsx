"use client";
import {
  EditTwoTone,
  PlusCircleFilled,
  PlusCircleOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, FloatButton, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateUserModal from "./EditUserButton";
import EditUserButton from "./EditUserButton";
import DeleteUserButton from "./DeleteUserButton";
import AddUserButton from "./AdduserButton";

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
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="bg-white shadow-md rounded w-[750px]">
      <AddUserButton />
      <table className="min-w-full w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-sm leading-normal">
            <th className="py-3 px-6 w-1/4">#</th>
            <th className="py-3 px-6 w-1/4">نام</th>
            <th className="py-3 px-6 w-1/4">کد ملی</th>
            <th className="py-3 px-6 w-1/4">شماره تلفن</th>
            <th className="py-3 px-6 w-1/4">ایمیل</th>
            <th className="py-3 px-6 w-1/4">نام کاربری</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user) => (
            <tr key={user.Student_ID}>
              <td className="py-3 px-6 w-1/4">
                <Space>
                  <EditUserButton Student_ID={user.Student_ID} />
                  <DeleteUserButton Student_ID={user.Student_ID} />
                </Space>
              </td>
              <td className="py-3 px-6 w-1/4">{user.Student_Name}</td>
              <td className="py-3 px-6 w-1/4">
                {user.Student_Social_Security_Number}
              </td>
              <td className="py-3 px-6 w-1/4">{user.Student_Phone_Number}</td>
              <td className="py-3 px-6 w-1/4">{user.Student_Email}</td>
              <td className="py-3 px-6 w-1/4">{user.Student_Username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
