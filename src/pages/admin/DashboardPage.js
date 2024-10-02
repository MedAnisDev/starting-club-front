import { useState } from "react";
import { ConfigProvider, Layout, Menu, Avatar, Typography } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Route, Routes } from "react-router";
import {
  AthleteManagement,
  EventManagement,
  GalleryManagement,
  AnnouncementManagement,
  AdministrativeDocument,
} from "../../components/adminDashboard/index.js";
import AthleteProfile from "../../components/AthleteProfile/AthleteProfile.js";
import { useSelector } from "react-redux";
import "./DashboardPage.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardPage = () => {
  const [themeColor, setThemeColor] = useState("#f5f5f5");
  const [collapsed, setCollapsed] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState(0);
  const currentUser = useSelector((state) => state.auth?.user);

  /** STYLING */

  const siderStyle = {
    backgroundColor: themeColor,
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    insetInlineStart: 0,
    top: 50,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "unset",
  };
  const MenuStyle = {
    backgroundColor: themeColor,
  };

  const leftLayoutStyle = {
    backgroundColor: themeColor,
    minHeight: "100vh",
  };
  const rightLayoutStyle = {
    marginInlineStart: collapsed ? 80 : 200,
    minHeight: "100vh", 
    overflow: "hidden", 
    transitionProperty: "margin-inline-start",
    transitionDuration: "0.6",
  };
  const contentStyle = {
    backgroundColor: themeColor,
    marginLeft: "2em",
    marginTop: "3px",
    padding: "24px",
    background: "#fff",
    borderRadius: "10px",
  };


  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <span className="bold-menu-item">Athletes</span>,
    },
    {
      key: "2",
      icon: <CalendarOutlined />,
      label: <span className="bold-menu-item">Events</span>,
    },
    {
      key: "3",
      icon: <FileOutlined />,
      label: <span className="bold-menu-item">Files</span>,
      children: [
        {
          key: "5",
          icon: <FileTextOutlined />,
          label: (
            <span className="bold-menu-item">Admin Document</span>
          ),
        }
      ],
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: <span className="bold-menu-item">Announcements</span>,
    },
  ];

  const content = [
    <AthleteManagement />,
    <EventManagement />,
    <GalleryManagement />,
    <AnnouncementManagement />,
    <AdministrativeDocument />,
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            colorBgContainer: "#f0f2f5", // Default background for Layout containers
          },
        },
      }}
    >
      <Layout style={leftLayoutStyle} hasSider>
        <Sider
          className="dashboard-sider"
          style={siderStyle}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={220}
          collapsedWidth={80}
          transitionProperty={"width"}
          transitionDuration={0.6}
        >
          <div className="user-profile">
            <Avatar size={64} icon={<UserOutlined />} />
            <div className="user-info">
              <Title level={5} style={{ color: "#d0d0d008", margin: 0 }}>
                {currentUser.firstname ? currentUser.firstname : "Unknown"}{" "}
                {currentUser.lastname ? currentUser.lastname : "Unknown"}
              </Title>
              <p style={{ color: "#d0d0d0", margin: 0 }}>Admin</p>
            </div>
          </div>

          <Menu
            style={MenuStyle}
            mode="inline"
            items={menuItems}
            defaultSelectedKeys={["1"]}
            selectedKeys={[String(selectedNavItem + 1)]}
            onSelect={({ key }) => setSelectedNavItem(parseInt(key, 10) - 1)}
          />
        </Sider>

        <Layout style={rightLayoutStyle} className="dashboard-right-layout">
          <Content style={contentStyle} id="dashboard-content">
            {content[selectedNavItem]}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardPage;
