import store from "@/services/redux/store";
import "@/styles/globals.css";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
