import React, { useState, useEffect } from "react";

import { NextSeo } from "next-seo";

import Head from "next/head";
import Script from "next/script";
import styles from "../styles/Home.module.css";

import Tweet from "../src/components/Tweet/Tweet";
import TweetSearch from "../src/components/TweetSearch/TweetSearch";
import ColorChanger from "../src/components/ColorChanger/ColorChanger";
import GlobalLoader from "../src/components/GlobalLoader/GlobalLoader.component";

import { GlobalProvider } from "../src/context/Global.context";
// import AdbIcon from "@mui/icons-material/Adb";

import {
  Button,
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  TextField,
  Container,
} from "@mui/material";
export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    if (process.env.NODE_ENV === "development") {
      console.log = () => {};
    }

    script.innerHTML = `
    var ffWidgetId = '498c84a8-c1c1-4e97-9d5f-4fc0e54381c3';
    var ffWidgetScript  = document.createElement('script');
    ffWidgetScript.type = 'text/javascript';
    ffWidgetScript.src = 'https://freddyfeedback.com/widget/freddyfeedback.js';
    document.head.appendChild(ffWidgetScript);`;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <NextSeo
        title="Hunder - Convert tweets to beautiful images without using any design tool"
        description="Hunder allows you to convert tweets to beautiful images without using any design tool, in less than 5 seconds. - Copy link to the tweet - Paste it in Hunder search - Choose a color - And lastly download your image! it's that simple!"
        canonical="https://www.hunder.xyz/"
        openGraph={{
          url: "https://www.hunder.xyz",
          title:
            "Hunder - Convert tweets to beautiful images without using any design tool",
          description: "Open Graph Description",
          images: [
            {
              url: "https://www.hunder.xyz/hunder_og_image_01.jpeg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "https://www.hunder.xyz/hunder_og_image_02.jpeg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
          ],
          siteName: "Hunder",
        }}
        twitter={{
          handle: "@zubairself",
          site: "@zubairself",
          cardType: "summary_large_image",
        }}
      />

      <GlobalProvider>
        <div className={styles.container}>
          <Head>
            <title>Hunder | Convert tweets to beautiful images</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <CustomAppBar />

          <main
            className={styles.main}
          >
            <Box className={styles.tweetContainer}>
              <Tweet />
            </Box>
            <Box mt={1} width="100%">
              <ColorChanger />
            </Box>
            <Footer />
          </main>
        </div>
      </GlobalProvider>
    </>
  );
}

const CustomAppBar = () => {
  return (
    <AppBar
      position="sticky"
      style={{ background: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ background: "transparent" }}>
          <Box display="flex" alignItems="center" width="100%">
            <Box mr={0} p={2}>
              <img src="/hunder_logo.png" className={styles.logo} />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flex="1"
            >
              <TweetSearch />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const Footer = () => {
  return (
    <footer style={{width: "100%"}}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={2}
        mb={1}
      >
        <Typography color="lightgrey">You can find me on Twitter:</Typography>{" "}
        <Box ml={1}>
          <Typography color="Background">
            <a
              rel="noreferrer nopener"
              href="https://twitter.com/zubairself"
              target="_blank"
            >
              {" "}
              @zubairself
            </a>
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};
