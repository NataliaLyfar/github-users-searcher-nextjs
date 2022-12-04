import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { UserCard } from "../../components/UserCard";
import { Box } from "../../components/ui";
import styled from "styled-components";
import { BASE_URL } from "../../constants";
import axios from "axios";

export const getServerSideProps = async (context) => {
  const { login } = context.params;
  try {
    const { data } = await axios.get(`${BASE_URL}users/${login}`);
    return {
      props: { user: data },
    };
  } catch (error) {
    return {
      redirect: { destination: "/" },
    };
  }
};

const User = ({ user }) => {
  const router = useRouter();
  const { login } = router.query;
  return (
    <>
      <Head>
        <title>User: {login}</title>
      </Head>
      <main>
        <Container>
          <StyledButton
            onClick={() => router.back()}
            icon={<ArrowLeftOutlined />}
          />
          <UserCard {...user} />
        </Container>
      </main>
    </>
  );
};

export default User;

const StyledButton = styled(Button)`
  margin-bottom: ${(p) => p.theme.space[1]}px;
  margin-right: auto;
`;
const Container = styled(Box)`
  flex-direction: column;
  margin: ${(p) => p.theme.space[3]}px auto;
`;
