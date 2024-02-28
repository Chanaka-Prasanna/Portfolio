import { Authenticated, Refine } from "@refinedev/core";
import { useNotificationProvider, ErrorComponent } from "@refinedev/antd";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { dataProvider } from "./rest-data-provider";
import { App as AntdApp } from "antd";
import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";
import { BlogPostList } from "./pages/Admin/blog-posts/blogpost-list";
import { BlogPostShow } from "./pages/Admin/blog-posts/show-blog";
import { BlogPostEdit } from "./pages/Admin/blog-posts/edit-blog";
import { BlogPostCreate } from "./pages/Admin/blog-posts/create-blog";
import authProvider from "./authProvider";

//  to test
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { AuthPage } from "./components/auth";
import { DevtoolsProvider } from "@refinedev/devtools";
import { ThemedLayoutV2 } from "./components/admin/layout";
import { ThemedHeaderV2 } from "./components/admin/layout/header";
import { ThemedSiderV2 } from "./components/admin/layout/sider";
import { ThemedTitleV2 } from "./components/admin/layout/title";
import HomePage from "./pages/Portfoio/Home";
import { RefineThemes } from "./antd-config/config";
const axiosInstance = axios.create();
import { useState } from "react";

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  axiosInstance
    .post(`https://api.fake-rest.refine.dev/auth/token/refresh`)
    .then((tokenRefreshResponse) => {
      localStorage.setItem("token", tokenRefreshResponse.data.token);

      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.token;

      return Promise.resolve();
    });

// Instantiate the interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Red}>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerBindings}
              authProvider={authProvider}
              dataProvider={dataProvider(
                "https://api.fake-rest.refine.dev",
                axiosInstance
              )}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  show: "/blog-posts/show/:id",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  // this meta property enable delete button on both edit page and show page
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route>
                  {/* <Route index element={<HomePage />} /> */}
                  <Route index element={<HomePage />} />
                </Route>
                <Route
                  element={
                    <ThemedLayoutV2
                      Header={ThemedHeaderV2}
                      Sider={ThemedSiderV2}
                      Title={ThemedTitleV2}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route
                    path="blog-posts"
                    element={
                      <Authenticated
                        key="blog-posts"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Outlet />
                      </Authenticated>
                    }
                  >
                    <Route index element={<BlogPostList />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="create" element={<BlogPostCreate />} />
                  </Route>
                </Route>
                <Route
                  element={<Authenticated key="auth" fallback={<Outlet />} />}
                >
                  <Route path="/login" element={<AuthPage />} />
                  <Route
                    path="/register"
                    element={<AuthPage type="register" />}
                  />
                  <Route
                    path="/forgot-password"
                    element={<AuthPage type="forgotPassword" />}
                  />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Routes>
              <UnsavedChangesNotifier />
            </Refine>
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
