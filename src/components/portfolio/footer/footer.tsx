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
          },
        },
      }}
    >
      <Layout.Footer>
        {" "}
        <Divider />
        <Flex vertical={false} justify="center" gap="large">
          <Link href="">
            {" "}
            <FacebookFilled
              style={{ ...styles.icon, color: token.colorPrimary }}
            />
          </Link>
          <Link href="https://www.linkedin.com/in/chanaka-prasanna/">
            <LinkedinFilled
              style={{ ...styles.icon, color: token.colorPrimary }}
            />{" "}
          </Link>
          <Link href="https://github.com/Chanaka-Prasanna">
            {" "}
            <GithubOutlined
              style={{ ...styles.icon, color: token.colorPrimary }}
            />{" "}
          </Link>
          <Link href="">
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
          </Link>

          <br></br>
        </Flex>
        <Flex justify="center">
          <Typography.Text>
            {" "}
            {`Copyright ©2024 All rights reserved `}/////
          </Typography.Text>
        </Flex>
      </Layout.Footer>
    </ConfigProvider>
  );
};

export default Footer;
