import React, { useState, useEffect } from "react";

import Head from "next/head";
import Script from "next/script";
import styles from "../styles/Home.module.css";

import Tweet from "../src/components/Tweet/Tweet";
import TweetSearch from "../src/components/TweetSearch/TweetSearch";
import ColorChanger from "../src/components/ColorChanger/ColorChanger";
import GlobalLoader from "../src/components/GlobalLoader/GlobalLoader.component"

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
    if(process.env.NODE_ENV === "development"){
      console.log = () => {}
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
    <GlobalProvider>
      <div className={styles.container}>
        <Head>
          <title>Hunder | Screenshot tweets like a pro</title>
          <link rel="icon" href="/favicon.ico" />
          <Script>
            {`
              var ffWidgetId = '498c84a8-c1c1-4e97-9d5f-4fc0e54381c3';
              var ffWidgetScript  = document.createElement('script');
              ffWidgetScript.type = 'text/javascript';
              console.log("test");
              ffWidgetScript.src = 'https://freddyfeedback.com/widget/freddyfeedback.js';
              document.head.appendChild(ffWidgetScript);

            `}
          </Script>
        </Head>
        <CustomAppBar />

        <main
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          
          <Box>{/* <TweetSearch /> */}</Box>
          <Tweet />
          <Box mt={1}>
            <ColorChanger />
          </Box>
        </main>
      </div>
    </GlobalProvider>
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
              <img src="/Hunder_logo.png" style={{ width: "55px" }} />
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

