import { useMemo } from "react";
import { Table, Popconfirm, Button } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { Link } from "react-router-dom";

function Products() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin:products"],
    queryFn: fetchProductList,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin:products"] });
    },
  });
  const columns = useMemo(() => {
    return [
      {
        title: "title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created at",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "action",
        render: (text, data) => {
          return (
            <div>
              <Link to={`/admin/products/${data._id}`}>
                <Button primary>Edit</Button>
              </Link>
              <Popconfirm
                title="Delete the product"
                description="Are you sure to delete this product?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  deleteMutation.mutate(data._id, {
                    onSuccess: () => {
                      console.log("success");
                    },
                  });
                }}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
  }, [deleteMutation]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>ERROR {error.message}</div>;
  }
  return (
    <div style={{ padding: "25px" }}>
      <Table dataSource={data} columns={columns} rowKey={"_id"} />;
    </div>
  );
}

export default Products;
