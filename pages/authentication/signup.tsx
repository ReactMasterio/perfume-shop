"use client";
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Typography,
  message,
  notification,
  theme,
} from "antd";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles/signup.module.css";
import Cookies from "js-cookie";
import Link from "next/link";

const { Title } = Typography;

type FieldType = {
  firstname?: string;
  lastname?: string;
  social_security_number?: string;
  student_ID?: string;
  phone_number?: string;
  email?: string;
  username?: string;
  password?: string;
};

function isStrongPassword(value: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{6,}$/;
  return regex.test(value);
}

const SignUp = () => {
  const router = useRouter();

  const onFinish = async (values: FieldType) => {
    const { firstname, lastname, ...rest } = values;
    const fullname = `${firstname} ${lastname}`;

    const reqBody = {
      ...rest,
      fullname,
    };
    try {
      const response = await axios.post("/api/students", reqBody);

      if (response.status === 201) {
        message.success("کابر ساخته شد")

        setTimeout(()=>{
          router.push("/authentication/login")
        },3000)
      }
    } catch (error: any) {
      if (error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error(error.response.data.error);
      }
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
          className={styles.form_bg}
          name="basic"
          style={{ width: 500 }}
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Title level={1} className={styles.form_title}>
            ساختن حساب کاربری
          </Title>

          <Row className={styles.form_row}>
            <Form.Item
              label="نام"
              name="firstname"
              rules={[
                { required: true, message: "نام الزامی است" },
                {
                  pattern: /^[\u0600-\u06FF\s]+$/,
                  message: "نام باید فقط شامل حروف فارسی باشد",
                },
              ]}
            >
              <Input size="large" className={styles.input_bg} />
            </Form.Item>

            <Form.Item
              label="نام خانوادگی"
              name="lastname"
              rules={[
                { required: true, message: "نام خانوادگی الزامی است" },
                {
                  pattern: /^[\u0600-\u06FF\s]+$/,
                  message: "نام خانوادگی باید فقط شامل حروف فارسی باشد",
                },
              ]}
            >
              <Input size="large" className={styles.input_bg} />
            </Form.Item>
          </Row>
          <Row className={styles.form_row}>
            <Form.Item
              label="کد ملی"
              name="social_security_number"
              rules={[
                { required: true, message: "کد ملی الزامی است" },
                { pattern: /^[0-9]{10}$/, message: "کد ملی باید 10 رقم باشد" },
              ]}
            >
              <Input type="number" size="large" className={styles.input_bg} />
            </Form.Item>

            <Form.Item
              label="شماره دانشجویی"
              name="student_ID"
              rules={[
                { required: true, message: "شماره دانشجویی الزامی است" },
                {
                  pattern: /^[0-9]{14}$/,
                  message: "شماره دانشجویی باید 14 رقم باشد",
                },
              ]}
            >
              <Input type="number" size="large" className={styles.input_bg} />
            </Form.Item>
          </Row>

          <Row className={styles.form_row}>
            <Form.Item
              label="شماره همراه"
              name="phone_number"
              rules={[
                { required: true, message: "شماره همراه الزامی است" },
                {
                  pattern: /^[0-9]{11}$/,
                  message: "شماره همراه باید 11 رقم باشد",
                },
              ]}
            >
              <Input type="number" size="large" className={styles.input_bg} />
            </Form.Item>

            <Form.Item
              label="ایمیل"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "لطفاً یک ایمیل معتبر وارد کنید",
                },
              ]}
            >
              <Input size="large" className={styles.input_bg} />
            </Form.Item>
          </Row>

          <Row className={styles.form_row}>
            <Form.Item
              label="نام کاربری"
              name="username"
              rules={[
                { required: true, message: "نام کاربری الزامی است" },
                {
                  pattern: /^[a-zA-Z_@.+-][a-zA-Z0-9_@.+-]*$/,
                  message: "نام کاربری نمی‌تواند با عدد شروع شود",
                },
              ]}
            >
              <Input size="large" className={styles.input_bg} />
            </Form.Item>

            <Form.Item
              label="رمز ورود"
              name="password"
              rules={[
                { required: true, message: "رمز عبور الزامی است" },
                {
                  validator: (rule, value) => {
                    if (!isStrongPassword(value)) {
                      return Promise.reject(
                        " رمز عبور باید شامل حروف بزرگ، کوچک، عدد و نماد ها باشد"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password size="large" className={styles.input_bg} />
            </Form.Item>
          </Row>

          <Form.Item>
            <Link href="/authentication/login" className={styles.signIn_Link}>
              حساب دارید؟ وارد شوید
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              size="large"
              htmlType="submit"
              className={styles.btn_submit}
            >
              ساخت حساب
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default SignUp;
