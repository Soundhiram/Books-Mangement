import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className="site-layout-background"
        style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%' }}
      >
        <Button
          className="trigger"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggle}
          style={{ marginLeft: 16 }}
        />
      </Header>
      {isMobile ? (
        <>
          <Sider
            collapsible
            collapsed={collapsed}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              zIndex: 1,
              left: 0,
              top: 64,
            }}
            collapsedWidth={0}
            onCollapse={toggle}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                Dashboard{' '}
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/home/addbook">Add Book</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/home/list">List Book</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 0, marginTop: 64 }}>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </>
      ) : (
        <>
          <Sider
            collapsible
            collapsed={collapsed}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              zIndex: 1,
              left: 0,
              top: 64,
            }}
            collapsedWidth={0}
            onCollapse={toggle}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/home/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/home/addbook">Add Book</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/home/list">List Book</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout
            className="site-layout"
            style={{
              marginLeft: collapsed ? 80 : 200,
              transition: 'margin-left 0.2s ease',
              marginTop: 64,
            }}
          >
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  );
};

export default AppLayout;
