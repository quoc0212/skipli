import { Button, Form, Input } from "antd";
import { useState } from "react";
import loginService from "../services/login.service";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isClickedSendCodeBtn, setIsClickedSendCodeBtn] = useState(false);

  const resendCode = () => {
    return loginService.generateAccessCode(form.getFieldValue("phoneNumber"));
  };

  const onFinish = (values) => {
    if (!isClickedSendCodeBtn) {
      setIsClickedSendCodeBtn(true);
      return loginService.generateAccessCode(form.getFieldValue("phoneNumber"));
    }

    setIsClickedSendCodeBtn(false);
    return loginService
      .validateAccessCode(
        form.getFieldValue("phoneNumber"),
        form.getFieldValue("accessCode")
      )
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem(
            "phoneNumber",
            form.getFieldValue("phoneNumber")
          );
          navigate("/main");
        }
      });
  };

  return (
    <Wrapper>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          width: 800,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
            },
          ]}
          required
        >
          <Input />
        </Form.Item>

        <Form.Item label="Access Code" name="accessCode">
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          {isClickedSendCodeBtn && (
            <Button type="primary" onClick={resendCode}>
              Resend Code
            </Button>
          )}
          <Button type="primary" htmlType="submit">
            {isClickedSendCodeBtn ? "Submit" : "Send Access Code"}
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export default LoginPage;
