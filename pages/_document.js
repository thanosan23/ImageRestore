import { Html, Head, Main, NextScript } from 'next/document'

import Navbar from "../components/navbar";
import Footer from "../components/footer";


export default function Document() {
  return (
    <Html lang="en">
      <title>ImageRestore</title>
      <Head>
        <link rel="shortcut icon" href="/logo.svg" />
      </Head>
      <body>
        <Main />
        <Footer/>
        <NextScript />
      </body>
    </Html>
  )
}
