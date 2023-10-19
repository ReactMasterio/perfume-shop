"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Typography,
  theme,
} from "antd";
import React from "react";
import "@/app/login/style.css";

const { Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className="login_bg flex justify-center items-center h-screen absolute inset-0 ">
        <Form
          className="form-bg p-4 rounded-lg shadow-md border border-gray-900"
          name="basic"
          style={{ width: 500 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Title level={1} className="text-center m-4">
            ورود مدیریت
          </Title>

          <Form.Item<FieldType>
            label="نام کاربری"
            name="username"
            rules={[{ required: true, message: "نام کاربری الزامی است" }]}
          >
            <Input size="large" className="shadow-lg input_bg" />
          </Form.Item>

          <Form.Item<FieldType>
            label="رمز ورود"
            name="password"
            rules={[{ required: true, message: "رمز ورود الزامی است" }]}
          >
            <Input.Password size="large" className="shadow-lg input_bg " />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>مرا به خاطر بسپار</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="default" size="large" htmlType="submit" className="w-full">
              ورود
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default Login;
