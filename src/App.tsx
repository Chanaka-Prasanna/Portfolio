import { Refine } from "@refinedev/core";
import {
  ThemedLayoutV2,
  useNotificationProvider,
  ErrorComponent,
  RefineThemes,
  AuthPage,
} from "@refinedev/antd";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { dataProvider } from "./rest-data-provider";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";
import { BlogPostList } from "./pages/blog-posts/blogpost-list";
import { BlogPostShow } from "./pages/blog-posts/show-blog";
import { BlogPostEdit } from "./pages/blog-posts/edit-blog";
import { BlogPostCreate } from "./pages/blog-posts/create-blog";
import authProvider from "./authProvider";

//  to test
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
const axiosInstance = axios.create();

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
      <ConfigProvider theme={RefineThemes.Blue}>
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
            <Route
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="blog_posts" />}
              />
              <Route path="blog-posts">
                <Route index element={<BlogPostList />} />
                <Route path="show/:id" element={<BlogPostShow />} />
                <Route path="edit/:id" element={<BlogPostEdit />} />
                <Route path="create" element={<BlogPostCreate />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
