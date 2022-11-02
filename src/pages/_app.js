import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styleConfig/GlobalStyle";
import { theme } from "../styleConfig/theme";
import { ToastContainer, Flip } from "react-toastify";
import { MainLayout } from "../layout";

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ToastContainer
      position="top-center"
      theme="dark"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      transition={Flip}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);

export default MyApp;
