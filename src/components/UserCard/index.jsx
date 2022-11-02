import { Card, Typography } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { addItem } from "../../redux/githubUsers/githubUsersSlice";
import { getItemsValue } from "../../redux/githubUsers/githubUsersSelector";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text, Paragraph, Link } = Typography;

export const UserCard = ({
  login,
  name,
  followers,
  following,
  avatar_url,
  public_repos,
  html_url,
}) => {
  const items = useSelector(getItemsValue);
  const dispatch = useDispatch();

  const isFavorited = items?.map((item) => item.userLogin).includes(login);

  const handleAdd = () => {
    if (!isFavorited)
      dispatch(addItem({ avatar_url, userLogin: login, html_url }));
  };

  return (
    <Card
      style={{ width: 320 }}
      cover={<img src={avatar_url} alt="user avatar" />}
    >
      <StyledButton isFavorited={isFavorited} role="button" onClick={handleAdd}>
        <HeartOutlined />
      </StyledButton>
      {name && <Title level={3}>{name}</Title>}
      <Paragraph>
        <Text strong>Login:</Text> {login}
      </Paragraph>
      <Paragraph>
        <Text strong>Followers:</Text> {followers}
      </Paragraph>
      <Paragraph>
        <Text strong>Following:</Text> {following}
      </Paragraph>
      <Paragraph>
        <Text strong>Public repos:</Text> {public_repos}
      </Paragraph>
      <Link href={html_url} target="_blank" rel="noreferrer">
        {html_url}
      </Link>
    </Card>
  );
};

const StyledButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 39%;
  background-color: transparent;
  outline: none;
  border: none;
  &:hover,
  &:focus,
  &:active {
    svg {
      color: ${(p) => p.theme.colors.accent};
    }
    background-color: transparent;
    cursor: pointer;
  }
  color: ${(p) =>
    p.isFavorited ? p.theme.colors.accent : p.theme.colors.black};
`;
