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
import Link from "next/link";

const { Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
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
      const response = await axios.post("/api/auth", body);
      if (response.status === 200) {
        Cookies.set("auth_token", response.data.token, { expires: 1 });
        Cookies.set("username", response.data.user!.Student_Username, {
          expires: 1,
        });
        Cookies.set("role", response.data.user!.Student_Role, {
          expires: 1,
        });
        Cookies.set("StudentID", response.data.user!.Student_ID, {
          expires: 1,
        });

        message.success("LogIn Successfull.");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error: any) {
      const errorMessage = error.response.data.error;
      message.error(errorMessage);
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
            ورود به حساب کاربری
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

          <Form.Item>
            <Link href="/authentication/signup" className={styles.signIn_Link}>
              ایجاد حساب کاربری
            </Link>
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
