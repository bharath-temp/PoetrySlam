//import '../styles/globals.css'
//import type { AppProps } from 'next/app'
//
//function MyApp({ Component, pageProps }: AppProps) {
//  return <Component {...pageProps} />
//}
//
//export default MyApp

import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from '../styles/theme'

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
      <h1>yo</h1>
    </ChakraProvider>
  );
}
export default App;
