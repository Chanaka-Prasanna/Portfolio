import { ConfigProvider, Form, Input, Layout } from "antd";
import React from "react";
import { backgroundColor } from "../../../antd-config/config";

const ReachMe = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: backgroundColor,
          },
        },
      }}
    >
      <Layout>
        <Form>
          <Form.Item>
            <Input />
          </Form.Item>
        </Form>
      </Layout>
    </ConfigProvider>
  );
};

export default ReachMe;
