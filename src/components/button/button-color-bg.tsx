import { Button, ButtonProps } from "antd";
import { ConfigProvider } from "antd/lib";
import React, { FC } from "react";

interface ButtonWithBgProps extends ButtonProps {
  text: string;
  color?: string;
}

const ButtonWithBg: FC<ButtonWithBgProps> = ({
  text,
  color,
  onClick,
  ...rest
}) => {
  return (
    <Button type="primary" onClick={onClick} {...rest}>
      {text}
    </Button>
  );
};

export default ButtonWithBg;
