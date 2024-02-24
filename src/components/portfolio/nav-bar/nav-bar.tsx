import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import { ConfigProvider, Drawer, Layout, Typography, theme } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../../../contexts/color-mode";
import {
  BookOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { getWindowSize } from "../../../utils/get-window-size";
import { screenBreakPoint } from "../../../utils/screen-break-point";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const NavBar: React.FC = () => {
  const { token } = useToken();

  const [open, setOpen] = useState(false);
  const menuItems = [
    {
      key: "1",
      name: "Works",
      icon: <DesktopOutlined />,
    },
    {
      key: "2",
      name: "Blogs",
      icon: <BookOutlined />,
    },
    {
      key: "3",
      name: "Contacts",
      icon: <MailOutlined />,
    },
  ];

  const handleOpen = () => {
    setOpen(!open);
  };
  const [screen, setScreen] = useState(getWindowSize().screen);
  const handleScreen = () => {
    setScreen(getWindowSize().screen);
    if (getWindowSize().screen === "larger") {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreen);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleScreen);
    };
  }, []);
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              activeBarHeight: 0, // to remove  border of menu item
              horizontalLineHeight: "64px",
              // menu
              // itemBg: "red", // color of menu

              // item

              horizontalItemSelectedBg: token.colorPrimary, //Background color of horizontal menu item when selected
              horizontalItemHoverBg: token.colorPrimary, // color when hover an itrm
              horizontalItemSelectedColor: "white", // color when hover an itrm

              //item text
              itemColor: token.colorPrimary, // Color of menu item text
              itemHoverColor: "#ffffff", // hover color of text in item
            },
          },
        }}
      >
        <Menu
          mode="horizontal"
          hidden={screen === "smaller" ? true : false}
          defaultSelectedKeys={["1"]}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "64px",
            padding: "0 15%",
          }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </ConfigProvider>
      {/* Mobile Menu */}
      <Menu
        mode="horizontal"
        hidden={screen === "larger" ? true : false}
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          paddingLeft: "10px",
          fontSize: "25px",
          height: "64px",
        }}
      >
        <MenuOutlined onClick={handleOpen} />
      </Menu>
      {open && (
        <Drawer open={open} onClose={handleOpen}>
          <Menu mode="vertical" defaultSelectedKeys={["1"]}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.name}
              </Menu.Item>
            ))}
          </Menu>
        </Drawer>
      )}
    </div>
  );
};
