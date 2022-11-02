import { render, screen, fireEvent } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import { ThemeProvider } from "styled-components";

import { theme } from "../../styleConfig/theme";
import { UserCard } from "../UserCard";
import * as actions from "../../redux/githubUsers/githubUsersSlice";
import { mockLocalStorage } from "./ui/mockLocalStorage";

jest.mock("react-redux");
const { getItemMock, setItemMock } = mockLocalStorage();
const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");
const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");

describe("UserCard", () => {
  it("UserCard renders", () => {
    render(
      <ThemeProvider theme={theme}>
        <UserCard
          avatar_url="https://avatars.githubusercontent.com/u/481466?v=4"
          login="fg"
          html_url="https://github.com/fg"
          name="fergio"
          followers={2}
          following={12}
          public_repos={40}
        />
      </ThemeProvider>
    );
    expect(screen.getByText("fergio")).toBeInTheDocument();
  });
  it.todo("should add user to FavoriteList"),
    () => {
      const dispatch = jest.fn();
      mockedDispatch.mockReturnValue(dispatch);
      const mockedAddItem = jest.spyOn(actions, "addItem");
      render(
        <UserCard
          avatar_url="https://avatars.githubusercontent.com/u/481466?v=4"
          login="fg"
          html_url="https://github.com/fg"
          name="fergio"
          followers={2}
          following={12}
          public_repos={40}
          isFavorited={false}
        />
      );

      fireEvent.click(screen.getByRole("button"));

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(mockedAddItem).toHaveBeenCalledWith("fg");
    };
});
