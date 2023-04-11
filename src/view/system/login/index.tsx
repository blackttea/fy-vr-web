import React, {useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { loginApi } from "../../../api/user";
import {setLocal} from "../../../utils/cache/useSession";
import {Route, Routes} from "react-router-dom";
import Home from "../../Home";

const App: React.FC = () => {
  const [form, setForm] = useState({
    username: "admin",
    password: "admin",
  })
  const onFinish = () => {
    const data = {
      username: form.username,
      password: form.password,
      code: "V3Admin"
    }
    loginApi(data).then((res: any) => {
      if (res.code === 200) {
        setLocal("token", res.data.token)
      }
    })
  };

  return (
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
        <Input
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
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

// <Routes>
//   <Route path={"/home"} element={ <Home /> } />
// </Routes>
export default App;
