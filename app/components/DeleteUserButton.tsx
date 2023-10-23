import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Typography, message, notification } from "antd";
import axios from "axios";
import React, { useState } from "react";

interface UpdateUserModalProps {
  Student_ID: string;
}

const { Title } = Typography;

const DeleteUserButton = ({ Student_ID }: UpdateUserModalProps) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/students/${Student_ID}`);
      if (response.status === 202) {
        message.success(`${response.data.message}`, 2);
      }
    } catch (error) {
      console.log(error);

      message.error("رکورد حذف نشد مشکلی پیش آمده", 2);
    }
  };

  return (
    <>
      <Button
        className="group"
        type="text"
        onClick={handleDelete}
        icon={
          <TrashIcon className="w-5 h-5 group-hover:text-red-500 transition duration-150" />
        }
      />
    </>
  );
};

export default DeleteUserButton;
