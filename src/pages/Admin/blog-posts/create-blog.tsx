import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";

export const BlogPostCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });

  return (
    <Create
      // we can pass our customize props
      saveButtonProps={saveButtonProps}
      //  we can pass goBack property for back button.But by defauls it is there
    >
      {/**
       * -------- Properties ---------
       * title
       * title allows you to add a title inside the <Create> component. If you don't pass the title props, it uses the
       * "Create" prefix and the singular resource name by default. For example, for the /posts/create resource, it would be
       * "Create post".
       *
       * saveButtonProps
       * The <Create> component has a save button that submits the form by default. If you want to customize this button you can use the
       * saveButtonProps property
       *
       * -------- resource ---------
       * The <Create> component reads the resource information from the route by default. If you want to use a custom resource for the <Create>
       * component, you can use the resource prop
       * ------------- goBack -------------
       * To customize the back button or to disable it, you can use the goBack property
       */}
      <Form {...formProps} layout="vertical">
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
    </Create>
  );
};
