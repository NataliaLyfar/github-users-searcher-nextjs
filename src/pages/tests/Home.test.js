import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { theme } from "../../styleConfig/theme";
import Home from "../index";
import { store } from "../../redux/store";

describe("Home page", () => {
  it("home renders", () => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Home />
        </Provider>
      </ThemeProvider>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
