import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  Student_ID: number;
  Student_Name: string;
  Student_Social_Security_Number: number;
  Student_Phone_Number: string;
  Student_Email: string;
  role: string;
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    // Fetch user data from your API endpoint
    axios
      .get<User[]>("/api/users")
      .then((response) => {
        // Update the state with the fetched user data
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []);

  return (
    <div className="bg-white shadow-md rounded my-6 w-[750px]">
      <table className="min-w-full w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-sm leading-normal">
            <th className="py-3 px-6 w-1/4">نام</th>
            <th className="py-3 px-6 w-1/4">کد ملی</th>
            <th className="py-3 px-6 w-1/4">شماره تلفن</th>
            <th className="py-3 px-6 w-1/4">ایمیل</th>
            <th className="py-3 px-6 w-1/4">سطح دسترسی</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user) => (
            <tr key={user.Student_ID}>
              <td className="py-3 px-6 w-1/4">{user.Student_Name}</td>
              <td className="py-3 px-6 w-1/4">
                {user.Student_Social_Security_Number}
              </td>
              <td className="py-3 px-6 w-1/4">{user.Student_Phone_Number}</td>
              <td className="py-3 px-6 w-1/4">{user.Student_Email}</td>
              <td className="py-3 px-6 w-1/4">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
