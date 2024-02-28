import {
  ExclamationCircleFilled,
  FacebookFilled,
  FacebookOutlined,
  GithubFilled,
  GithubOutlined,
  LinkedinFilled,
  MailFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Divider, Flex, Layout, Typography, theme } from "antd";
import React from "react";
import { styles } from "./styles";
import { EmailField } from "@refinedev/antd";
import { backgroundColor } from "../../../antd-config/config";
const { useToken } = theme;

const Footer = () => {
  const { token } = useToken();
  const { Link } = Typography;

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            footerPadding: "3% 10%",
            footerBg: backgroundColor,
          },
        },
      }}
    >
      <Layout.Footer>
        <Divider style={{ borderColor: "white" }} />

        {/* Centered content */}
        <Flex align="center" justify="center" gap="large">
          <Link href="">
            <FacebookFilled
              style={{ ...styles.icon, color: token.colorPrimary }}
            />
          </Link>
          <Link href="https://www.linkedin.com/in/chanaka-prasanna/">
            <LinkedinFilled
              style={{ ...styles.icon, color: token.colorPrimary }}
            />
          </Link>
          <Link href="https://github.com/Chanaka-Prasanna">
            <GithubOutlined
              style={{ ...styles.icon, color: token.colorPrimary }}
            />
          </Link>
          {/* <Link href="">
            <MailFilled style={{ ...styles.icon, color: token.colorPrimary }} />
          </Link>
          <Link
            href={`https://wa.me/${+94765602490}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <WhatsAppOutlined
              style={{ ...styles.icon, color: token.colorPrimary }}
            />
          </Link> */}

          {/* <br></br> is not needed for centering */}
        </Flex>

        {/* Copyright text already centered within Flex with justify="center" */}

        <Flex justify="center" style={{ marginTop: "15px" }}>
          <Typography.Text style={{ color: "#ffffff", textAlign: "center" }}>
            {`Copyright ©2024 All rights reserved `}
          </Typography.Text>
        </Flex>
      </Layout.Footer>
    </ConfigProvider>
  );
};

export default Footer;
