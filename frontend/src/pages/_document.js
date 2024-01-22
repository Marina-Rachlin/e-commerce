import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&family=Kalam:wght@700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-xk1XoiRD6fnFuLftdIJ6tbjLh/+q0w2q3CZ5hFtC5xuCO/5bIItuKPommeIC8DW2g6zgYG7z4yv8LtaBz6lAag==" crossOrigin="anonymous" />
        

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
