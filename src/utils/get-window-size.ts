import { screenBreakPoint } from "./screen-break-point";

export const getWindowSize = () => {
  const { innerWidth: width, innerHeight: height } = window;
  let screen;

  if (width <= screenBreakPoint) {
    screen = "smaller";
  } else {
    screen = "larger";
  }

  return { width, height, screen };
};
