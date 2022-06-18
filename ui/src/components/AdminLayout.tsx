import React, { useState } from "react";
import "./AppLayout.css";

import "@aws-amplify/ui-react/styles.css";
import { Breadcrumb, Dropdown, Layout, Menu, Space } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import {
  matchPath,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useOutletContext,
  useResolvedPath,
} from "react-router-dom";
import path from "path";

interface Structure {
  key: React.Key;
  label: React.ReactNode;
  icon?: React.ReactNode;
  content?: React.ReactElement;
  children?: Structure[];
  type?: "group";
}

export function getStructureItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  content?: React.ReactElement,
  children?: Structure[],
  type?: "group"
): Structure {
  return {
    key,
    icon,
    label,
    type,
    content,
    children,
  } as Structure;
}
function processItems(items: Structure[], path = ""): Structure[] {
  return [
    ...items.map((i) => {
      const key = `${path}${i.key}`;
      return {
        ...i,
        key,
        children: i.children && processItems(i.children, key),
      } as Structure;
    }),
  ];
}

function getRoutesFromItems(items: Structure[], path = ""): React.ReactNode[] {
  let res: React.ReactNode[] = [];
  for (const item of items) {
    const p = `${path}${item.key}`;
    res.push(<Route key={p} path={`${p}`} element={item.content} />);
    if (item.children) {
      res = [...res, ...getRoutesFromItems(item.children, `${p}`)];
    }
  }
  res.push(<Route key={"*"} path={"*"} element={<>not found</>} />);
  return res;
}

interface AppLayoutProps {
  username: string;
  onLogout?: () => void;
  structure: Structure[];
}

function AppLayout(props: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { username, structure, onLogout } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const pathnameParts = location.pathname.split("/").filter((x) => x);
  const defaultOpenKeys =
    pathnameParts.length > 0
      ? pathnameParts.reduce((prev: string[], val, i) => {
          if (i === 0) {
            prev.push(`/${val}`);
          } else {
            prev.push(`${prev[prev.length - 1]}/${val}`);
          }
          return prev;
        }, [])
      : ["/"];

  const topMenu = (
    <Menu
      onClick={(item) => {
        if (item.key === "logout" && onLogout) {
          onLogout();
        }
      }}
      items={[{ key: "logout", label: "Logout", icon: <LogoutOutlined /> }]}
    />
  );

  return (
    <Layout id="components-layout-demo-side" style={{ minHeight: "100vh" }}>
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        // collapsible={true}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultOpenKeys[defaultOpenKeys.length - 1]]}
          defaultOpenKeys={defaultOpenKeys}
          onClick={(item) => {
            navigate(item.key);
          }}
          items={processItems(structure)}
        />
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header
          className="site-layout-background"
          style={{ padding: 0 }}
        >
          <Space className="antd-header-content">
            <Dropdown overlay={topMenu}>
              <div className="antd-header-content-item">
                <UserOutlined style={{ padding: "0 8px 0 0" }} />
                {username}
              </div>
            </Dropdown>
          </Space>
        </Layout.Header>
        <Layout.Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>{getRoutesFromItems(structure)}</Routes>
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center" }}>...</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
