import React from "react";
import { Col, Menu, Row } from "antd";
import { Sider } from "@refinedev/antd";
import { Drawer } from "antd/lib";

const { SubMenu } = Menu;

const NavBar = () => {
  return (
    <Menu mode="horizontal">
      <Row>
        <Col xs={0} sm={0} md={0} lg={24}>
          <Menu.Item key="home">Home</Menu.Item>
          <SubMenu key="sub1" title="About">
            <Menu.Item key="1">Company</Menu.Item>
            <Menu.Item key="2">Team</Menu.Item>
          </SubMenu>
          <Menu.Item key="services">Services</Menu.Item>
          <Menu.Item key="contact">Contact</Menu.Item>
        </Col>
      </Row>
      <Row>
        <Col sm={24} md={24} lg={0}>
          <Drawer>Hi</Drawer>
        </Col>
      </Row>
    </Menu>
  );
};

export default NavBar;
