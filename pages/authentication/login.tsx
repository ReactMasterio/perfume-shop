"use client";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Typography,
  message,
  theme,
} from "antd";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles/login.module.css";
import Cookies from "js-cookie";

const { Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

interface UserType {
  Admin_ID: number;
  Admin_UserName: string;
  Admin_Password: string;
}

const Login = () => {
  const router = useRouter();

  const onFinish = async (values: FieldType) => {
    const username = values.username;
    const password = values.password;
    const body = {
      username,
      password,
    };
    try {
      const response = await axios.post("/api/auth", body); // Make an API request
      if (response.status === 200) {
        Cookies.set("auth_token", response.data.token, { expires: 1 });

        message.success("LogIn Successfull.");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className={styles.login_bg} dir="rtl">
        <Form
          className={"" + styles.form_bg}
          name="basic"
          style={{ width: 500 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Title level={1} className={styles.form_title}>
            ورود مدیریت
          </Title>

          <Form.Item<FieldType>
            label="نام کاربری"
            name="username"
            rules={[{ required: true, message: "نام کاربری الزامی است" }]}
          >
            <Input size="large" className={styles.input_bg} />
          </Form.Item>

          <Form.Item<FieldType>
            label="رمز ورود"
            name="password"
            rules={[{ required: true, message: "رمز ورود الزامی است" }]}
          >
            <Input.Password size="large" className={styles.input_bg} />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox>مرا به خاطر بسپار</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              size="large"
              htmlType="submit"
              className={styles.btn_submit}
            >
              ورود
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default Login;
