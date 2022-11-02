import { render, screen, fireEvent } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import * as actions from "../../redux/githubUsers/githubUsersSlice";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { UsersList } from "../UsersList";
import { theme } from "../../styleConfig/theme";
import { store } from "../../redux/store";

jest.mock("react-redux");

const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");
const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");

const partialUsers = [
  {
    avatar_url: "https://avatars.githubusercontent.com/u/481465?v=4",
    userLogin: "frangio",
    html_url: "https://github.com/frangio",
    type: "User",
  },
  {
    avatar_url: "https://avatars.githubusercontent.com/u/481466?v=4",
    userLogin: "fg",
    html_url: "https://github.com/fg",
    type: "User",
  },
];

describe("UsersList", () => {
  it("UsersList renders table", async () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <UsersList items={[]} />
        </Provider>
      </ThemeProvider>
    );
    expect(screen.queryByRole("table")).toBeNull();
  });
  it("UsersList creates table with users", async () => {
    const component = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <UsersList items={partialUsers} />
        </Provider>
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
