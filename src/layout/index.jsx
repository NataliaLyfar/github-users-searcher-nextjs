import { Layout, Typography, BackTop, Divider } from "antd";
import { Title } from "../components/ui";
import styled from "styled-components";
import { breakpoints } from "../styleConfig/breakpoints";

const { Header, Content, Footer } = Layout;
const { Link } = Typography;

export const MainLayout = ({ children }) => {
  return (
    <>
      <Layout>
        <StyledHeader theme="dark">
          <Title>GITHUB USERS SEARCHER</Title>
        </StyledHeader>
        <StyledContent>{children}</StyledContent>
        <Divider style={{ margin: "0" }} />
        <Footer style={{ textAlign: "center" }}>
          &#169; 2022 | All Rights Reserved | Developed by
          <Link
            href="https://github.com/NataliaLyfar/goit-react-hw-05-movies.git"
            target="_blank"
            rel="noreferrer"
          >
            &nbsp;Natalia Lyfar
          </Link>
        </Footer>
        <BackTop>
          <ToTop>UP</ToTop>
        </BackTop>
      </Layout>
    </>
  );
};

const StyledContent = styled(Content)`
  min-height: calc(100vh - 167px);
  padding: 0 ${(p) => p.theme.space[3]}px;
  margin: ${(p) => p.theme.space[3]}px 0;
  @media (${breakpoints.tablet}) {
    padding: 0 ${(p) => p.theme.space[5]}px;
  }
  @media (${breakpoints.laptop}) {
    padding: 0 ${(p) => p.theme.space[7]}px;
  }
`;
const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ToTop = styled.div`
  height: 40px;
  width: 40px;
  border-radius: ${(p) => p.theme.radii.round};
  background-color: ${(p) => p.theme.colors.black};
  color: ${(p) => p.theme.colors.white};
  text-align: center;
  font-size: ${(p) => p.theme.fontSizes.s};
  line-height: 40px;
`;
