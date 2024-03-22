import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.less';
interface LoginFormProps {
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3333/api/users/login',
        { username, password }
      );
      console.log('1');
      navigate('/home/dashboard');
      const token = response.data.token;
      localStorage.setItem('token', token);
      message.success('Login successful');
      console.log('2');
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onClickSignUp = () => {
    toggleForm();
  };

  return (
    <div className="card-div-login">
      <Card className="card-content-form">
        <h1 className="title">Log in</h1>

        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            label="Username"
            name="username"
            style={{ fontWeight: 500 }}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            style={{ fontWeight: 500 }}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div className="button-div">
              <Button
                className="button-auth"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Log in
              </Button>
            </div>
          </Form.Item>
        </Form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="link-div">
          <p className="link-para">
            Don't have an account?{' '}
            <span
              style={{ cursor: 'pointer', color: 'red' }}
              onClick={onClickSignUp}
            >
              Sign up
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
