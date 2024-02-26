import React, { useEffect, useState } from "react";
import { Typography, Button, Row, Col, Flex, theme } from "antd";
const { Title, Paragraph } = Typography;
import profile from "../../../assets/my-photo/MyProfile.jpeg";
import { getWindowSize } from "../../../utils/get-window-size";
import { styles } from "./styles";
import { lightenHexColor } from "../../../utils/generete-lighter-color";
import { ReactTyped  } from "react-typed";

const { useToken } = theme;

const HeroBanner: React.FC = () => {
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
    <div style={screen === "smaller" ? styles.mainDivMobile : styles.mainDiv}>
      <Row gutter={[16, 16]}>
        {" "}
        <Col
          order={screen === "smaller" ? 2 : 1}
          xs={24}
          sm={24}
          md={16}
          lg={16}
          xl={16}
        >
          <div>
            <Title level={screen === "smaller" ? 2 : 1}>Hi, I'm <ReactTyped style={{color:token.colorPrimary}} strings={["Chanaka."]} typeSpeed={180} backSpeed={50} loop/> </Title>
            <Title level={screen === "smaller" ? 4 : 3}>
              Software Engineer
            </Title>
          </div>
          <Paragraph
            style={
              screen === "smaller" ? styles.paragraphMobile : styles.paragraph
            }
          >
            Passionate problem-solver and innovative thinker with a keen eye for
            detail. Highly motivated and adaptable, I approach challenges with
            enthusiasm, striving for exceptional results. As an AI enthusiast
            and blogger, I am dedicated to continuous learning and expanding my
            expertise in creative solutions
          </Paragraph>
        </Col>
        <Col
          order={screen === "smaller" ? 1 : 2}
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
        >
          <Flex justify={screen === "smaller" ? "center" : "end"}>
            <div
              className=""
              style={{
                borderRadius: "50%",
                boxShadow: `0 6px 17px ${lightenHexColor(
                  token.colorPrimary,
                  20
                )}`,

                width: "250px",
                height: "250px",
              }}
            >
              <img
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                }}
                loading="eager"
                alt=""
                src={profile}
              />{" "}
            </div>
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            {/* Your download button */}
            <Button type="primary">Download Resume</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeroBanner;
