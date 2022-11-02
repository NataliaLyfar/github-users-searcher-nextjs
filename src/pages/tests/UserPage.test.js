import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { store } from "../../redux/store";
import { theme } from "../../styleConfig/theme";
import User, { getServerSideProps } from "../../pages/users/[userLogin]";

const testUser = {
  avatar_url: "https://avatars.githubusercontent.com/u/2738851?v=4",
  bio: null,
  blog: "http://www.fatihgursoy.com",
  company: null,
  created_at: "2012-11-06T22:55:09Z",
  email: null,
  events_url: "https://api.github.com/users/fg/events{/privacy}",
  followers: 60,
  followers_url: "https://api.github.com/users/fg/followers",
  following: 85,
  following_url: "https://api.github.com/users/fg/following{/other_user}",
  gists_url: "https://api.github.com/users/fg/gists{/gist_id}",
  gravatar_id: "",
  hireable: true,
  html_url: "https://github.com/fg",
  id: 2738851,
  location: "Istanbul, Turkey",
  login: "fg",
  name: "Fatih GÜRSOY",
  node_id: "MDQ6VXNlcjI3Mzg4NTE=",
  organizations_url: "https://api.github.com/users/fg/orgs",
  public_gists: 0,
  public_repos: 86,
  received_events_url: "https://api.github.com/users/fg/received_events",
  repos_url: "https://api.github.com/users/fg/repos",
  site_admin: false,
  starred_url: "https://api.github.com/users/fg/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/fg/subscriptions",
  twitter_username: null,
  type: "User",
  updated_at: "2022-10-14T12:23:36Z",
  url: "https://api.github.com/users/fg",
};

describe("getServerSideProps()", () => {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testUser),
    })
  );
  it("should redirect when error", async () => {
    const context = {
      params: { userLogin: "fg[[[" },
    };
    const response = await getServerSideProps(context);
    expect(response).toEqual(
      expect.objectContaining({
        redirect: { destination: "/" },
      })
    );
  });
  it("should call api", async () => {
    const context = {
      params: { userLogin: "fg" },
    };
    const response = await getServerSideProps(context);
    expect(response).toEqual(
      expect.objectContaining({
        props: { user: testUser },
      })
    );
  });
});
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/users",
      pathname: "/users",
      query: { userLogin: "fg" },
      asPath: "/users/fg",
    };
  },
}));
describe("UserPage", () => {
  it("UserPage Should render correctly on route: /users/fg", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <User user={testUser} />
        </Provider>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
