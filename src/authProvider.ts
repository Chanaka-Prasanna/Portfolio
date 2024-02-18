import type { AuthProvider } from "@refinedev/core";
import axios from "axios";

const axiosInstance = axios.create();

const mockUsers = [
  { email: "chanaka1@mail.com", roles: ["admin"], token: "123", pwd: "123" },
  { email: "chanaka2@mail.com", roles: ["editor"], token: "456", pwd: "123" },
];

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    // Suppose we actually send a request to the back end here.
    const user = mockUsers.find(
      (item) => item.email === email && item.pwd === password
    );

    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${user.token}`,
      };
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Login Error",
        name: "Invalid email or password",
      },
    };
  },
  check: async () => {
    const token = localStorage.getItem("auth");

    return { authenticated: Boolean(token) };
  },
  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
      name: "Logout Failed!",
      message: "Something went wrong.",
    };
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  },
  getPermissions: () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { roles } = JSON.parse(user);

      return roles;
    }

    return null;
  },
  getIdentity: async () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { email, roles } = JSON.parse(user);
      /**
       * Depending on the UI framework you use, resolving name and avatar properties in the getIdentity method may show the user's
       * name and avatar in the header in the default layout.
       */

      return {
        email,
        roles,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }

    return null;
  },
  register: async ({ email, roles, token, pwd }) => {
    const user = mockUsers.find((user) => user.email === email);

    if (user) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: "User already exists",
        },
      };
    }

    mockUsers.push({ email, roles, token, pwd });

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  forgotPassword: async ({ email }) => {
    // send password reset link to the user's email address here

    // if request is successful
    return {
      success: true,
      redirectTo: "/login",
    };

    // if request is not successful
    return {
      success: false,
      error: {
        name: "Forgot Password Error",
        message: "Email address does not exist",
      },
    };
  },
  updatePassword: async ({ password }) => {
    // update the user's password here

    // if request is successful
    return {
      success: true,
      redirectTo: "/login",
    };

    // if request is not successful
    return {
      success: false,
      error: {
        name: "Forgot Password Error",
        message: "Email address does not exist",
      },
    };
  },
};

export default authProvider;
