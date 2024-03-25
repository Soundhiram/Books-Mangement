import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import axios from 'axios';

const AddBooks: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    axios
      .post('http://localhost:3333/api/book/book', values)
      .then((response) => {
        console.log('Book added:', response.data);
        message.success('Book added successfully!');
        form.resetFields();
      })
      .catch((error) => {
        console.error('Error adding book:', error);
        message.error('Failed to add book. Please try again later.');
      });
  };

  return (
    <div>
      <h1>Add Book</h1>
      <Row justify="center">
        <Col xl={12} lg={14} md={16} sm={20} xs={24}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter the title of the book',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="author"
              label="Author"
              rules={[
                {
                  required: true,
                  message: 'Please enter the author of the book',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="genre"
              label="Genre"
              rules={[
                {
                  required: true,
                  message: 'Please enter the genre of the book',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="yearOfPublication"
              label="Year of Publication"
              rules={[
                {
                  required: true,
                  message: 'Please enter the year of publication',
                },
                { type: 'date', message: 'Please enter a valid year' },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Book
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AddBooks;
