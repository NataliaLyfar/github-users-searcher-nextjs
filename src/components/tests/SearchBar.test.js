import { render, screen, fireEvent } from "@testing-library/react";
import "jest-styled-components";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import * as reduxHooks from "react-redux";

import * as actions from "../../redux/githubUsers/githubUsersSlice";
import { SearchBar } from "../SearchBar/SearchBar";
import { theme } from "../../styleConfig/theme";

jest.mock("react-redux");
const onChange = jest.fn();
const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");
const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");

describe("SearchBar component", () => {
  it("renders SearchBar component", () => {
    mockedUseSelector.mockReturnValue("");
    render(
      <ThemeProvider theme={theme}>
        <SearchBar value={mockedUseSelector} onChange={onChange} />
      </ThemeProvider>
    );
    expect(
      screen.getByPlaceholderText("input to search Github users")
    ).toBeInTheDocument();
  });
  it.todo("onChange works"),
    () => {
      mockedUseSelector.mockReturnValue("");
      const dispatch = jest.fn();
      mockedDispatch.mockReturnValue(dispatch);
      const mockedChangeSearch = jest.spyOn(actions, "changeSearch");
      render(
        <ThemeProvider theme={theme}>
          <SearchBar value={mockedUseSelector} onChange={mockedChangeSearch} />
        </ThemeProvider>
      );
      userEvent.type(screen.getByRole("textbox"), "cat");
      expect(mockedChangeSearch).toHaveBeenCalledTimes(3);
    };
  it.todo("should dispatch input value"),
    () => {
      const dispatch = jest.fn();
      mockedDispatch.mockReturnValue(dispatch);
      const mockedChangeSearch = jest.spyOn(actions, "changeSearch");
      render(
        <ThemeProvider theme={theme}>
          <SearchBar value="fg" onChange={mockedChangeSearch} />
        </ThemeProvider>
      );

      fireEvent.change(screen.getByRole("search"));

      expect(dispatch).toHaveBeenCalled();
      expect(mockedChangeSearch).toHaveBeenCalledWith("fg");
    };
});
