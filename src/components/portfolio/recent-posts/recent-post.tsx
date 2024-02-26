import React, { useEffect, useState } from "react";
import { Typography, Button, Row, Col, Flex, theme, Card } from "antd";
import { lightenHexColor } from "../../../utils/generete-lighter-color";
import { styles } from "./styles";
import { getWindowSize } from "../../../utils/get-window-size";
const { Title, Link, Text, Paragraph } = Typography;
const { useToken } = theme;
import { v4 as uuidv4 } from "uuid";

const blogs = [
  {
    titlle:
      "How to Customize the Default auth Pages of Your Refine Application",
    date: "Feb 19, 2024",
    link: "https://medium.com/@chanakapinfo/how-to-customize-the-default-auth-pages-of-your-refine-application-56e26eb39594",
    tech: "Refine, react",
    des: "In this article, I’ll walk you through creating a Refine application step by step. After that, I’ll provide some insights into the application we’re building in just a few minutes. Lastly, I’ll help you implement authentication logic from scratch by customizing our authentication pages to fit our preferences",
  },
  {
    titlle: "Say Goodbye to REST Headaches — GraphQL , The Game Changer",
    date: "Feb 4, 2024",
    link: "https://medium.com/@chanakapinfo/say-goodbye-to-rest-headaches-graphql-the-game-changer-6fd5fc9c8419",
    tech: "GraphQL,REST",
    des: "In 2012, Facebook introduced GraphQL with the aim of enhancing data retrieval processes across their platforms and facilitating the development of the News Feed feature for iOS applications. The primary objective was to design a system that would be accessible and comprehensible not only to developers but also to designers and individuals without technical expertise. Initially employed for internal purposes, Facebook opted to release GraphQL as an open-source tool in 2015",
  },
  {
    titlle:
      "Introducing Refine — Your Turbo Boost for Building Data-Driven Apps in React",
    date: "Jan 29, 2024",
    link: "https://medium.com/@chanakapinfo/introducing-refine-your-turbo-boost-for-building-data-driven-apps-in-react-56a8b8780a13",
    tech: "Refine, react",
    des: "Refine is a React-based framework for building data-intensive applications. It offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability",
  },
  {
    titlle: "TypeScript Type Assertion and Explicit Type Definition",
    date: "Jan 27, 2024",
    link: "https://medium.com/@chanakapinfo/typescript-type-assertion-and-explicit-type-definition-568e1a345ed6",
    tech: "TypeScript",
    des: "TypeScript, a superset of JavaScript, brings static typing to the world of JavaScript development. One powerful feature it offers is the ability to work with types in a flexible manner. In this blog post, we’ll dive into two essential concepts: Type Assertion and Explicit Type Definition. These tools allow developers to communicate with the TypeScript compiler, providing guidance on the types of variables and data structures used in their code",
  },
  {
    titlle:
      "Unleashing the Power of Random Forest Classification: A Practical Guide",
    date: "Oct 14, 2023",
    link: "https://medium.com/@chanakapinfo/unleashing-the-power-of-random-forest-classification-a-practical-guide-a172e0a32fa4",
    tech: "Random Forest Classification",
    des: "Random Forest is a well-known supervised machine learning algorithm used with labeled data, and it falls under the ensemble learning technique, which involves combining predictions from multiple decision trees to enhance performance. It can be applied to both classification and regression problems",
  },
  {
    titlle: "Steps For Your Machine Learning Project",
    date: "Sep 30, 2023",
    link: "https://medium.com/@chanakapinfo/steps-for-your-machine-learning-project-fb089e032484",
    tech: "Machine Learning",
    des: "Before embarking on a machine learning project, it’s crucial to grasp the fundamental classifications of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Data and labels are available in supervised learning, whereas unsupervised learning deals with unlabeled data. Reinforcement learning comes into play when explicitly defining desired behavior, such as determining how a self-driving car should navigate various traffic scenarios",
  },
];

const RecentPost = () => {
  const { token } = useToken();
  const [screen, setScreen] = useState(getWindowSize().screen);
  const handleScreen = () => {
    setScreen(getWindowSize().screen);
  };
  useEffect(() => {
    window.addEventListener("resize", handleScreen);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleScreen);
    };
  }, []);
  return (
    <section
      style={{
        backgroundColor: lightenHexColor(token.colorPrimary, 70),
        ...(screen === "smaller"
          ? styles.mainSectionMobile
          : styles.mainSection),
      }}
    >
      <Title level={3}>Recent Posts</Title>

      <Row gutter={[16, 16]}>
        {blogs.map((blog) => (
          <Col key={uuidv4()} xs={24} sm={24} md={12} lg={12}>
            <Card
              title={
                <Text
                  style={{
                    fontWeight: 900,
                  }}
                  ellipsis={{
                    tooltip: `${blog.titlle}`,
                  }}
                >
                  {blog.titlle}
                </Text>
              }
              // bordered={false}
            >
              <Title level={5}>
                {`${blog.tech}`} &nbsp; | &nbsp; {`${blog.date}`}
              </Title>
              <Paragraph
                ellipsis={{
                  rows: 3,
                  expandable: false,
                  suffix: "",
                  onEllipsis: (ellipsis) => {
                    console.log("Ellipsis changed:", ellipsis);
                  },
                }}
                // title={`$--William Shakespeare`}
              >
                {blog.des}
              </Paragraph>
              <Link href={blog.link}>
                {" "}
                <Button type="primary">Read more</Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default RecentPost;
