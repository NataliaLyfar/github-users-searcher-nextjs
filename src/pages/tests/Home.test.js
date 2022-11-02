import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { theme } from "../../styleConfig/theme";
import Home from "../../pages/index";
import { store } from "../../redux/store";

describe("Home page", () => {
  it("Home renders", () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Home />
        </Provider>
      </ThemeProvider>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("input to search Github users")
    ).toBeInTheDocument();
  });
});
