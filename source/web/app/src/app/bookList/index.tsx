import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Modal, Form, Input, Spin } from 'antd';
import axios from 'axios';
import { Book } from '../../assets/interface/interface';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const ListBook: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedBook, setEditedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Book[]>(
        'http://localhost:3333/api/book/books'
      );
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: Book) => {
    setEditedBook(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    try {
      if (!editedBook) return;
      setLoading(true);
      const response = await axios.put<Book>(
        `http://localhost:3333/api/book/book/${editedBook._id}`,
        editedBook
      );
      const updatedBook = response.data;
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        )
      );
      message.success('Book updated successfully');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating book:', error);
      message.error('Failed to update book');
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (book: Book) => {
    confirm({
      title: `Are you sure you want to delete ${book.genre}?`,
      icon: <DeleteOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(book);
      },
      onCancel() {
        ('');
      },
    });
  };

  const handleDelete = async (book: Book) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3333/api/book/book/${book._id}`);
      setBooks((prevBooks) =>
        prevBooks.filter((item) => item._id !== book._id)
      );
      message.success('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book:', error);
      message.error('Failed to delete book');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Year',
      dataIndex: 'yearOfPublication',
      key: 'yearOfPublication',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: Book) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          />
          <Button
            danger
            onClick={() => showDeleteConfirm(record)}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <h1>Book List</h1>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={books}
          pagination={false}
          scroll={{ y: 400 }}
        />
      </Spin>
      <Modal
        title="Edit Book"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              value={editedBook?.title}
              onChange={(e) =>
                setEditedBook((prevEditedBook) => ({
                  ...prevEditedBook!,
                  title: e.target.value,
                }))
              }
            />
          </Form.Item>
          <Form.Item label="Author">
            <Input
              value={editedBook?.author}
              onChange={(e) =>
                setEditedBook((prevEditedBook) => ({
                  ...prevEditedBook!,
                  author: e.target.value,
                }))
              }
            />
          </Form.Item>
          <Form.Item label="Genre">
            <Input
              value={editedBook?.genre}
              onChange={(e) =>
                setEditedBook((prevEditedBook) => ({
                  ...prevEditedBook!,
                  genre: e.target.value,
                }))
              }
            />
          </Form.Item>
          <Form.Item label="Year of Publication">
            <Input
              value={editedBook?.yearOfPublication}
              onChange={(e) =>
                setEditedBook((prevEditedBook) => ({
                  ...prevEditedBook!,
                  yearOfPublication: e.target.value,
                }))
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListBook;
