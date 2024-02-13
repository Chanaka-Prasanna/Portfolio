import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

export const BlogPostEdit: React.FC<IResourceComponentsProps> = () => {
  /**
   * useForm is a Refine hook that provides the necessary props for the form.
   * When used the in the edit page, it fetches record data with the URL's id,
   * populating and submitting the form with dataProvider's update method. It also
   * offers saveButtonProps for the form's submit button.
   */
  const { formProps, saveButtonProps, queryResult } = useForm();
  /**
   * useForm is a Refine hook that provides the necessary props for the form.
   * When used the in the edit page, it fetches record data with the **URL's id**,
   * populating and submitting the form with dataProvider's update method. It also
   * offers saveButtonProps for the form's submit button
   */

  const blogPostsData = queryResult?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,
  });
  /**
   * if we need to select a category from the categories resource to assign the blog
   * post to the category, we can use the useSelect hook provided by Refine. This hook
   * fetches the data by passing the params to the dataProvider's getList method and then
   * returns the necessary props to be used in the <Select/> component.
   *
   * The useSelect hook returns 10 records by default, but the category of the blog post may
   * not be in the first 10 records. To solve this problem, we can use the defaultValue prop
   * to set the default value of the useSelect hook like above
   */
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Id"
          name={["id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly disabled />
        </Form.Item>
        <Form.Item
          label="Title"
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Status"
          name={["status"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Created At"
          name={["createdAt"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Edit>
  );
};
