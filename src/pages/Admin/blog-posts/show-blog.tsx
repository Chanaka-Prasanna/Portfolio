import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  MarkdownField,
  DateField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  /**
   * The useShow hook is used to get single record data by using the id in the URL.
   *  It sends the parameters to the dataProvider's getOne function and returns the result.

For more
   */
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      {/**
       * <Show/> is a Refine component that is used for presentation purposes like showing the 
       title of the page, list button, etc.

       * Properties 
       * title - > title allows you to add a title inside the <Show> component. If you don't pass title props, 
       * it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" 
       * resource, it will be "Show post".
       * 
       * resource
       * The <Show> component reads the resource information from the route by default. If you want to use a custom 
       * resource for the <Show> component, you can use the resource prop:
     
       */}
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>Category</Title>
      {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
      <Title level={5}>Status</Title>
      <TextField value={record?.status} />
      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
