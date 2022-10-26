import React, { useState, useEffect } from "react";

import { Box, Button } from "@mui/material";
import { CalendarToday, FavoriteBorder, Download } from "@mui/icons-material";
import { WithGlobalContext } from "../../context/Global.context";
import THEME_COLORS from "../../constants/themeColor";

import styles from "./ColorChanger.module.css";

const ColorChanger = (props) => {
  const { context } = props || {};
  const {
    changeTweetTheme,
    changeTweetDate,
    changeTweetInteraction,
    tweetInteractionDisplay,
    tweetDateDisplay,
    triggerDownloadTweet,
  } = context || {};
  return (
    <Box className={styles.container}>
      <Box display="flex" flexDirection="row">
        <Box mr={1} display="inline-block">
          <button
            onClick={() => {
              changeTweetTheme(THEME_COLORS.blue);
            }}
            className={`${styles.colorButton} ${styles.colorButton_blue}`}
          ></button>
        </Box>
        <Box mr={1} display="inline-block">
          <button
            onClick={() => {
              changeTweetTheme(THEME_COLORS.pink);
            }}
            className={`${styles.colorButton} ${styles.colorButton_pink}`}
          ></button>
        </Box>

        <Box mr={1} display="inline-block">
          <button
            onClick={() => {
              changeTweetTheme(THEME_COLORS.green);
            }}
            className={`${styles.colorButton} ${styles.colorButton_green}`}
          ></button>
        </Box>
        <Box mr={1} display="inline-block">
          <button
            onClick={() => {
              changeTweetTheme(THEME_COLORS.purple);
            }}
            className={`${styles.colorButton} ${styles.colorButton_purple}`}
          ></button>
        </Box>
        <Box mr={1} display="inline-block">
          <button
            onClick={() => {
              changeTweetTheme(THEME_COLORS.white);
            }}
            className={`${styles.colorButton} ${styles.colorButton_white}`}
          ></button>
        </Box>
      </Box>
      <OtherControls
        changeTweetDate={changeTweetDate}
        changeTweetInteraction={changeTweetInteraction}
        tweetInteractionDisplay={tweetInteractionDisplay}
        tweetDateDisplay={tweetDateDisplay}
        triggerDownloadTweet={triggerDownloadTweet}
      />
    </Box>
  );
};

const OtherControls = (props) => {
  const {
    changeTweetDate,
    changeTweetInteraction,
    tweetInteractionDisplay,
    tweetDateDisplay,
    triggerDownloadTweet,
  } = props || {};
  return (
    <Box display="flex" ml={3} flexDirection="row" alignItems="center" justifyContent="center" mt={1}>
      <ButtonWrap
        onClick={() => {
          changeTweetDate(!tweetDateDisplay);
        }}
      >
        <CalendarToday />
      </ButtonWrap>
      <Box ml={1}>
        <ButtonWrap
          onClick={() => {
            changeTweetInteraction(!tweetInteractionDisplay);
          }}
        >
          <FavoriteBorder />
        </ButtonWrap>
      </Box>

      <Box ml={2}>
        <ButtonWrap onClick={triggerDownloadTweet}>
          Download{` ${" "}`}
          <Download />
        </ButtonWrap>
      </Box>
    </Box>
  );
};

const ButtonWrap = (props) => {
  return (
    <Box
      className={styles.button}
      p={1.5}
      display="flex"
      alignContent="center"
      justifyItems="center"
      onClick={props.onClick}
    >
      {props.children}
    </Box>
  );
};

export default WithGlobalContext(ColorChanger);
