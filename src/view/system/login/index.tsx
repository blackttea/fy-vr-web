import React, {useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import {getUserInfoApi, loginApi} from "../../../api/user";
import {setLocal} from "../../../utils/cache/useSession";
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "../../Home";
import "./index.scss"
import { getMenu } from "../../../store/system";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    username: "admin",
    password: "admin",
  })
  const navigate = useNavigate()
  const onFinish = () => {
    const data = {
      username: form.username,
      password: form.password,
      code: "V3Admin"
    }
    loginApi(data).then((res: any) => {
      if (res.code === 200) {
        setLocal("token", res.data.token)
        getMenu().then(() => { navigate('/') })
      }
    })
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img src="src/assets/img/logo-text-2.png" className="login-logo" alt=""/>
        <Form
          name="form"
          className="login-form"
          initialValues={ form }
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              onChange={ (e) => { setForm({ ...form, username: e.target.value }) } }
              defaultValue={ form.username } prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              onChange={ (e) => { setForm({ ...form, password: e.target.value }) } }
              defaultValue={ form.password }
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
