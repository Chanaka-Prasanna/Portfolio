import React from "react";
import { Typography, Button, Row, Col, Flex, theme, Card } from "antd";
import { lightenHexColor } from "../../../utils/generete-lighter-color";

const { Title, Link } = Typography;
const { useToken } = theme;
const RecentPost = () => {
  const { token } = useToken();
  return (
    <section
      style={{
        backgroundColor: lightenHexColor(token.colorPrimary, 20),
        padding: "2% 18%",
      }}
    >
      <Title level={3}>Recent Posts</Title>
      <Link>See more</Link>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card hoverable title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card hoverable title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card hoverable title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default RecentPost;
