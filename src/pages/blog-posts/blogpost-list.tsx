import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  MarkdownField,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  //  use table automatically reads the resources that coming from url
  // http://localhost:5173/blog-posts?pageSize=10&current=1
  // Here the blogpost
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource, // to ensure that The query runs only if tableProps and dataSource exist (using logical NOT NOT).
      // This ensures the query doesn't run before blog post data is available.
    },
  });

  return (
    <List title="Blog Posts">
      {/**
       * <List/> is a Refine component that is used for presentation purposes like showing the create button, page title etc.
       * Reffer to List documentation to change properties like title ,resource
       * Link for List Ref - https://refine.dev/docs/ui-integrations/ant-design/components/basic-views/list/
       * rowKey="id" -> Used id as unique key for each row record
       */}
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="content"
          title="Content"
          render={(value: any) => (
            <MarkdownField value={value.slice(0, 80) + "..."} />
          )}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find((item) => item.id === value)?.title
              // .find((item) => item.id === value): iterates through the category data and finds the item whose "id"
              // matches the current cell's "id" (foreign key).
            )
          }
        />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column
          dataIndex={["createdAt"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
