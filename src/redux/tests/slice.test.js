import {
  itemsReducer,
  searchReducer,
  addItem,
  deleteItem,
  changeSearch,
} from "../githubUsers/githubUsersSlice";

describe("githubUsersSlice", () => {
  it("should return default state when passed an empty action", () => {
    const result = itemsReducer(undefined, { type: "" });
    expect(result).toEqual({ items: [] });
  });
  it("should return default state when passed an empty action", () => {
    const result = searchReducer(undefined, { type: "" });
    expect(result).toEqual({ value: "" });
  });
  it("should add new user with 'addItem' action", () => {
    const action = {
      type: addItem.type,
      payload: {
        avatar_url: "https://avatars.githubusercontent.com/u/481465?v=4",
        userLogin: "frangio",
        html_url: "https://github.com/frangio",
      },
    };
    const result = itemsReducer({ items: [] }, action);
    expect(result.items[0].userLogin).toBe("frangio");
    expect(result.items[0].avatar_url).toBe(
      "https://avatars.githubusercontent.com/u/481465?v=4"
    );
    expect(result.items[0].html_url).toBe("https://github.com/frangio");
  });
  it("should delete user with 'deleteItem' action", () => {
    const items = [
      {
        avatar_url: "https://avatars.githubusercontent.com/u/481465?v=4",
        userLogin: "frangio",
        html_url: "https://github.com/frangio",
      },
    ];
    const action = {
      type: deleteItem.type,
      payload: "frangio",
    };
    const result = itemsReducer({ items }, action);
    expect(result).toEqual({ items: [] });
  });
  it("should achange input value with 'changeSearch' action", () => {
    const action = {
      type: changeSearch.type,
      payload: "frangio",
    };
    const result = searchReducer({ value: "" }, action);
    expect(result.value).toBe("frangio");
  });
});
