import { useDispatch } from "react-redux";
import { Table, Row, Col, Typography, Image, Popconfirm, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { getItemsValue } from "../../redux/githubUsers/githubUsersSelector";
import { useSelector } from "react-redux";
import { deleteItem } from "../../redux/githubUsers/githubUsersSlice";

const { Title } = Typography;

export const FavoriteList = () => {
  const items = useSelector(getItemsValue);
  const dispatch = useDispatch();

  const favoriteColumns = [
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
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        items.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.login)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (login) => {
    dispatch(deleteItem(login));
  };
  return (
    <>
      {items?.length > 0 && (
        <List>
          <Title level={2}>Favorite Github users</Title>
          <Row>
            <Col xs={24}>
              <Table
                dataSource={items?.map((item) => ({
                  ...item,
                  key: item.login,
                }))}
                columns={favoriteColumns}
                pagination={{
                  defaultPageSize: "10",
                  showSizeChanger: true,
                  pageSizeOptions: [5, 10, 15, 30],
                  position: ["topLeft", "bottomRight"],
                }}
              />
            </Col>
          </Row>
        </List>
      )}
    </>
  );
};

const List = styled.div`
  margin-top: ${(p) => p.theme.space[5]}px;
`;
