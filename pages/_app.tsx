import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Head from "next/head";
import lightTheme from "../styles/theme/lightTheme";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Head>
        <title>Pokepedia | By Yusfi Adilaksa</title>
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
