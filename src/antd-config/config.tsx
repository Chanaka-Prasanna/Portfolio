import { ThemeConfig } from "antd";

type ThemeNames =
  | "Blue"
  | "Purple"
  | "Magenta"
  | "Red"
  | "Orange"
  | "Yellow"
  | "Green";

type TokenConfig = {
  fontSizeHeading1: number;
  fontSizeHeading2: number;
  fontSizeHeading3: number;
  fontSizeHeading4: number;
};

type RefineThemes = Record<ThemeNames, ThemeConfig>;

const commonTokenConfig: TokenConfig = {
  fontSizeHeading1: 55,
  fontSizeHeading2: 30,
  fontSizeHeading3: 35,
  fontSizeHeading4: 25,
};

export const RefineThemes: RefineThemes = {
  Blue: {
    token: {
      colorPrimary: "#1677FF",
      ...commonTokenConfig,
    },
  },
  Purple: {
    token: {
      colorPrimary: "#722ED1",
      ...commonTokenConfig,
    },
  },
  Magenta: {
    token: {
      colorPrimary: "#EB2F96",
      ...commonTokenConfig,
    },
  },
  Red: {
    token: {
      colorPrimary: "#F5222D",
      ...commonTokenConfig,
    },
  },
  Orange: {
    token: {
      colorPrimary: "#FA541C",
      ...commonTokenConfig,
    },
  },
  Yellow: {
    token: {
      colorPrimary: "#FAAD14",
      ...commonTokenConfig,
    },
  },
  Green: {
    token: {
      colorPrimary: "#52C41A",
      ...commonTokenConfig,
    },
  },
};
