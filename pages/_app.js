import "@material-tailwind/react/tailwind.css";
import 'tailwindcss/tailwind.css'
import Head from 'next/head';
import { Provider } from 'next-auth/client'
import '../styles.css';
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import {DocumentsProvider} from '../context';
const progress = new ProgressBar({
  size: 2,
  color: "blue",
  className: "bar-of-progress",
  delay: 100,
});


Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);


function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
        />
      </Head> 
      <DocumentsProvider>
      <Component {...pageProps} />
      </DocumentsProvider>
  </Provider>
  )
}

export default MyApp
