import { render, screen, fireEvent } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import { FavoriteList } from "../FavoriteList";
import * as actions from "../../redux/githubUsers/githubUsersSlice";
import { mockLocalStorage } from "./ui/mockLocalStorage";

jest.mock("react-redux");
const { getItemMock, setItemMock } = mockLocalStorage();
const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");
const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");

const items = [
  {
    avatar_url: "https://avatars.githubusercontent.com/u/481465?v=4",
    userLogin: "frangio",
    html_url: "https://github.com/frangio",
  },
  {
    avatar_url: "https://avatars.githubusercontent.com/u/481466?v=4",
    userLogin: "fg",
    html_url: "https://github.com/fg",
  },
];
describe("FavoriteList", () => {
  it("should create FavoriteList with empty items array", () => {
    mockedUseSelector.mockReturnValue([]);
    const component = render(<FavoriteList />);

    expect(component).toMatchSnapshot();
  });
  it("should create FavoriteList with favorite users items", () => {
    const getedItems = getItemMock.mockReturnValue(items);
    mockedUseSelector.mockReturnValue(getedItems);
    const component = render(<FavoriteList />);

    expect(component).toMatchSnapshot();
  });
  it.todo("should delete user from FavoriteList"),
    () => {
      const dispatch = jest.fn();
      mockedDispatch.mockReturnValue(dispatch);
      const mockedDeleteItem = jest.spyOn(actions, "deleteItem");
      render(
        <FavoriteList
          avatar_url="https://avatars.githubusercontent.com/u/481466?v=4"
          userLogin="fg"
          html_url="https://github.com/fg"
        />
      );

      fireEvent.click(screen.getByRole("button"));

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(mockedDeleteItem).toHaveBeenCalledWith("fg");
    };
});
