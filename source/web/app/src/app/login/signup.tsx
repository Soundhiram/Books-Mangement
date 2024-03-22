import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../store/actions/authActions';
import { useDispatch } from 'react-redux';

interface SignupFormProps {
  toggleForm: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ toggleForm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    dispatch(signup());
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3333/api/users/register',
        values
      );
      const token = response.data.token;
      localStorage.setItem('token', token);
      message.success('Sign up successful');
      navigate('/home/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onClickSignUp = () => {
    navigate('/login');
  };

  return (
    <div className="sign-up-div">
      <Card className="signup-card">
        <h1 className="title-2">Sign Up</h1>

        <Form
          name="signup-form"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            style={{ fontWeight: 500 }}
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 500 }}
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 500 }}
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 500 }}
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="button-div">
              <Button
                className="button-auth"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Sign up
              </Button>
            </div>
          </Form.Item>
          {error && <p style={{ color: 'red', marginLeft: '20px' }}>{error}</p>}
          <div className="link-div-2">
            <p className="link-para-2">
              Already have an account?{' '}
              <span
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={toggleForm}
              >
                Log In
              </span>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignupForm;
