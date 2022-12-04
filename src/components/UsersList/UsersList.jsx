import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchGithubUsersQuery } from "../../redux/githubUsers/githubUsersApi";
import { getSearchValue } from "../../redux/githubUsers/githubUsersSelector";
import Link from "next/link";
import { Table, Row, Col, Empty, Button, Space, Typography, Image } from "antd";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { Spinner, Box } from "../../components/ui";

export const UsersList = () => {
  const [skip, setSkip] = useState(true);
  const query = useSelector(getSearchValue);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query.length > 0) setSkip(false);
  }, [query]);

  const { isLoading, isFetching, error, partialUsers, totalPages } =
    useSearchGithubUsersQuery(`q=${query}&page=${page}`, {
      skip,
      selectFromResult: ({ data, isLoading, isFetching, isError }) => ({
        partialUsers: data?.partialUsers,
        totalPages: data?.totalPages,
        isLoading: isLoading,
        isFetching: isFetching,
        error: isError,
      }),
    });

  const columns = [
    {
      title: "avatar",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (avatar_url) => (
        <Image src={avatar_url} alt="user avatar" width={44} />
      ),
    },
    {
      title: "User",
      dataIndex: "login",
      key: "login",
      render: (text) => (
        <Link href={`/users/${text}`}>
          <Typography.Text copyable>{text}</Typography.Text>
        </Link>
      ),
      sorter: (a, b) => a.login.length - b.login.length,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        {
          text: "User",
          value: "User",
        },
        {
          text: "Organization",
          value: "Organization",
        },
      ],
      onFilter: (value, item) => item.type.includes(value),
      responsive: ["md"],
    },
    {
      title: "Repo url",
      dataIndex: "html_url",
      key: "html_url",
      responsive: ["md"],
      render: (url) => (
        <Typography.Link href={url} target="_blank" rel="noreferrer">
          {url}
        </Typography.Link>
      ),
    },
  ];

  return (
    <>
      {isLoading || isFetching ? (
        <Box>
          <Spinner />
        </Box>
      ) : partialUsers?.length > 0 ? (
        <>
          <Row>
            <Col xs={24}>
              <Table
                dataSource={partialUsers?.map((item) => ({
                  ...item,
                  key: item.id,
                }))}
                columns={columns}
                pagination={{
                  defaultPageSize: "10",
                  showSizeChanger: true,
                  pageSizeOptions: [5, 10, 15, 30],
                  position: ["topLeft", "bottomRight"],
                }}
              />
            </Col>
          </Row>
          {partialUsers?.length > 10 && (
            <Space>
              <Button
                onClick={() => setPage((page) => page - 1)}
                disabled={page === 1}
                icon={<CaretLeftFilled />}
              />
              <Button
                onClick={() => setPage((page) => page + 1)}
                disabled={page === totalPages}
                icon={<CaretRightFilled />}
              />
            </Space>
          )}
        </>
      ) : (query.length > 0 && partialUsers?.length === 0) || error ? (
        <Empty />
      ) : null}
    </>
  );
};
