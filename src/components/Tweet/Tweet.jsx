import React, { useEffect, useRef, useState } from "react";
// import { exportComponentAsJPEG } from "react-component-export-image";
import html2canvas from "html2canvas";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

import GlobalLoader from "../GlobalLoader/GlobalLoader.component";

import { Box, Avatar, Typography } from "@mui/material";

import TwitterIcon from "@mui/icons-material/Twitter";

import THEME_COLORS from "../../constants/themeColor";
import { WithGlobalContext } from "../../context/Global.context";

import styles from "./Tweet.module.css";

const dynamicStyles = {
  blue: {
    // mainColor: ,
    primaryTextStyles: { color: "#fff" },
    secondaryTextStyles: { color: "#fff", opacity: 0.8 },
    tertioryColorStyles: { color: "#fff", opacity: 0.6 },
    containerClassName: styles["container_var__1"],
    tweetContainerClassName: styles["tweetContainer_var__1"],
    profilePicClassName: styles["profilePic_var__1"],
  },
  pink: {
    // mainColor: ,
    primaryTextStyles: { color: "#fff" },
    secondaryTextStyles: { color: "#fff", opacity: 0.8 },
    tertioryColorStyles: { color: "#fff", opacity: 0.6 },
    containerClassName: styles["container_var__2"],
    tweetContainerClassName: styles["tweetContainer_var__2"],
    profilePicClassName: styles["profilePic_var__2"],
  },
  purple: {
    // mainColor: ,
    primaryTextStyles: { color: "#fff" },
    secondaryTextStyles: { color: "#fff", opacity: 0.8 },
    tertioryColorStyles: { color: "#fff", opacity: 0.6 },
    containerClassName: styles["container_var__3"],
    tweetContainerClassName: styles["tweetContainer_var__3"],
    profilePicClassName: styles["profilePic_var__3"],
  },
  green: {
    // mainColor: ,
    primaryTextStyles: { color: "#333" },
    secondaryTextStyles: { color: "#333", opacity: 0.8 },
    tertioryColorStyles: { color: "#333", opacity: 0.6 },
    containerClassName: styles["container_var__4"],
    tweetContainerClassName: styles["tweetContainer_var__4"],
    profilePicClassName: styles["profilePic_var__4"],
  },
  white: {
    // mainColor: ,
    primaryTextStyles: { color: "#333" },
    secondaryTextStyles: { color: "#333", opacity: 0.8 },
    tertioryColorStyles: { color: "#333", opacity: 0.6 },
    containerClassName: styles["container_var__5"],
    tweetContainerClassName: styles["tweetContainer_var__5"],
    profilePicClassName: styles["profilePic_var__5"],
  },
};

const Tweet = (props) => {
  const { colorTheme } = props || {};
  const { context } = props || {};
  const {
    tweetTheme,
    tweetContent,
    tweetInteractionDisplay,
    registerTweetDownloadFunction,
    tweetDateDisplay,
    isLoading,
  } = context || {};
  const tweetRef = useRef();

  useEffect(() => {
    registerTweetDownloadFunction(handleDownloadImage);
    console.log(isLoading);
  }, []);

  if (!tweetTheme) {
    throw new Error("tweet context not found");
  }
  const handleDownloadImage = async () => {
    const element = tweetRef.current;
    const data = await htmlToImage.toPng(element);
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // window.open(data);
    }
  };

  const presentTheme = tweetTheme;

  return (
    <div
      className={dynamicStyles[presentTheme].containerClassName}
      ref={tweetRef}
    >
      {isLoading ? <GlobalLoader /> : ""}
      <div className={dynamicStyles[presentTheme].tweetContainerClassName}>
        <Box p={3}>
          <Box
            my={1}
            display="flex"
            alignItems="top"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Avatar
                src={tweetContent.profilePicture}
                alt="Remy Sharp"
                sx={{ width: 60, height: 60 }}
                className={dynamicStyles[presentTheme].profilePicClassName}
              />
              <Box pl={2}>
                <Typography
                  variant="h6"
                  style={dynamicStyles[presentTheme].primaryTextStyles}
                >
                  {tweetContent.profileName}
                </Typography>
                <Typography
                  variant="body2"
                  style={dynamicStyles[presentTheme].secondaryTextStyles}
                >
                  {`@${tweetContent.profileUserName}`}
                </Typography>
              </Box>
            </Box>
            <Box>
              <TwitterIcon
                style={dynamicStyles[presentTheme].primaryTextStyles}
                className={styles.twitterIcon}
              />
            </Box>
          </Box>
          <Box mt={2}>
            <Typography
              variant="h5"
              style={dynamicStyles[presentTheme].primaryTextStyles}
            >
              {tweetContent.text}
            </Typography>
          </Box>
          {tweetDateDisplay && (
            <Box mt={2} >
              <Typography
                style={dynamicStyles[presentTheme].tertioryColorStyles}
                variant="subtitle1"
              >
                {new Date(tweetContent.tweetCreatedAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </Typography>
            </Box> )} 
          {tweetInteractionDisplay && (
            <Box mt={1} display="flex">
              <Box display="flex">
                <Typography
                  style={dynamicStyles[presentTheme].primaryTextStyles}
                  variant="subtitle1"
                >
                  {intToString(tweetContent?.tweetMetrics?.likeCount)}
                </Typography>{" "}
                <Box ml={0.5}>
                  <Typography
                    style={dynamicStyles[presentTheme].tertioryColorStyles}
                    variant="subtitle1"
                  >
                    Likes
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" ml={2}>
                <Typography
                  style={dynamicStyles[presentTheme].primaryTextStyles}
                  variant="subtitle1"
                >
                  {intToString(tweetContent?.tweetMetrics?.repostCount)}
                </Typography>
                <Box ml={0.5}>
                  <Typography
                    style={dynamicStyles[presentTheme].tertioryColorStyles}
                    variant="subtitle1"
                  >
                    Reposts
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" ml={2}>
                <Typography
                  style={dynamicStyles[presentTheme].primaryTextStyles}
                  variant="subtitle1"
                >
                  {intToString(tweetContent?.tweetMetrics?.replyCount)}
                </Typography>
                <Box ml={0.5}>
                  <Typography
                    style={dynamicStyles[presentTheme].tertioryColorStyles}
                    variant="subtitle1"
                  >
                    Comments
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

function intToString(value) {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
  
}

export default WithGlobalContext(Tweet);
