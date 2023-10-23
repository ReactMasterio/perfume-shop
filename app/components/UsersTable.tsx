import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

interface User {
  Student_ID: string;
  Student_Name: string;
  Student_Social_Security_Number: string;
  Student_Phone_Number: string;
  Student_Email: string;
  Student_Role: string;
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>('/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  }, []);

  const columns = [
    {
      title: 'نام',
      dataIndex: 'Student_Name',
      key: 'Student_Name',
    },
    {
      title: 'کد ملی',
      dataIndex: 'Student_Social_Security_Number',
      key: 'Student_Social_Security_Number',
    },
    {
      title: 'شماره تلفن',
      dataIndex: 'Student_Phone_Number',
      key: 'Student_Phone_Number',
    },
    {
      title: 'ایمیل',
      dataIndex: 'Student_Email',
      key: 'Student_Email',
    },
  ];

  return (
    <div className="bg-white shadow-md rounded w-[750px]">
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default UsersTable;
