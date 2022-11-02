import {
  getItemsValue,
  getSearchValue,
} from "../githubUsers/githubUsersSelector";

describe("redux selectors", () => {
  it("should get value from state 'search'", () => {
    const value = "cat";
    const result = getSearchValue({ search: { value } });
    expect(result).toEqual(value);
  });
  it("should select items from state object 'users'", () => {
    const items = [
      {
        avatar_url: "https://avatars.githubusercontent.com/u/481465?v=4",
        userLogin: "frangio",
        html_url: "https://github.com/frangio",
      },
    ];
    const result = getItemsValue({ users: { items } });
    expect(result).toEqual(items);
  });
});
