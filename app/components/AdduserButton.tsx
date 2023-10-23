import { PlusCircleOutlined } from "@ant-design/icons";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Col,
  FloatButton,
  Form,
  Input,
  Modal,
  Row,
  Switch,
  Typography,
  message,
  notification,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { object } from "zod";

interface UpdateUserModalProps {
  Student_ID: string;
}
interface userInfo {
  Student_ID: string;
  Student_Name: string;
  Student_Social_Security_Number: string;
  Student_Phone_Number: string;
  Student_Email: string;
  Student_Role: string;
  Student_Username: string;
  Student_Password: string;
}

function isStrongPassword(value: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{6,}$/;
  return regex.test(value);
}

const { Title } = Typography;

type FieldType = {
  student_name?: string;
  firstname?: string;
  lastname?: string;
  social_security_number?: string;
  student_ID?: string;
  phone_number?: string;
  email?: string;
  username?: string;
  password?: string;
  isAdmin?: boolean;
};

const AddUserButton = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<userInfo | null>(null);

  const showModal = async () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleForm = async (values: Partial<FieldType>) => {
    const userObject: any = {};

    if (values.firstname && values.lastname) {
      userObject.student_name = `${values.firstname} ${values.lastname}`;
    }

    if (values.student_ID) {
      userObject.studentID = values.student_ID;
    }

    if (values.social_security_number) {
      userObject.student_social_security_number = values.social_security_number;
    }

    if (values.phone_number) {
      userObject.student_phone_number = values.phone_number;
    }

    if (values.email) {
      userObject.student_email = values.email;
    }

    if (values.username) {
      userObject.username = values.username;
    }

    if (values.password) {
      userObject.password = values.password;
    }

    if (values.isAdmin) {
      userObject.student_role = "admin";
    } else {
      userObject.student_role = "student";
    }

    console.log(userObject);

    try {
      const response = await axios.post(`/api/students`, userObject);
      if (response.status === 201) {
        message.success("رکورد اضافه شد");
      } else if (response.status === 400) {
        message.error(response.data.error, 3);
      }
    } catch (error: any) {
      message.error(error!.response.data.error, 3);
      console.log(error);
    }
  };

  return (
    <>
      <FloatButton
        icon={<PlusCircleOutlined />}
        type="primary"
        style={{ right: 24 }}
        onClick={showModal}
      />
      <Modal
        title="اصلاح کاربر"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={() => <></>}
        width={1000}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          className="flex flex-col justify-around align-middle w-full"
          layout="vertical"
          onFinish={handleForm}
        >
          <div className="flex justify-around align-middle">
            <Row>
              <Col className="flex align-middle justify-around mx-2 w-full">
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
                  <Input size="large" />
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
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  label="کد ملی"
                  name="social_security_number"
                  rules={[
                    { message: "کد ملی الزامی است" },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "کد ملی باید 10 رقم باشد",
                    },
                  ]}
                >
                  <Input type="number" size="large" />
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
                  <Input type="number" size="large" />
                </Form.Item>
              </Col>

              <Col className="flex justify-around mx-2 w-full">
                <Form.Item
                  label="شماره همراه"
                  name="phone_number"
                  rules={[
                    { message: "شماره همراه الزامی است" },
                    {
                      pattern: /^[0-9]{11}$/,
                      message: "شماره همراه باید 11 رقم باشد",
                    },
                  ]}
                >
                  <Input type="number" size="large" />
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
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  label="نام کاربری"
                  name="username"
                  rules={[
                    { message: "نام کاربری الزامی است" },
                    {
                      pattern: /^[a-zA-Z_@.+-][a-zA-Z0-9_@.+-]*$/,
                      message: "نام کاربری نمی‌تواند با عدد شروع شود",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  label="رمز ورود"
                  name="password"
                  rules={[{ message: "رمز عبور الزامی است" }]}
                  style={{ minHeight: "56px" }}
                >
                  <Input.Password size="large" />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Row>
            <Form.Item
              label="دسترسی ادمین"
              valuePropName="checked"
              name="isAdmin"
            >
              <Switch />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item className="w-full">
              <Button
                type="default"
                size="large"
                htmlType="submit"
                className="w-full"
              >
                ورود
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserButton;
