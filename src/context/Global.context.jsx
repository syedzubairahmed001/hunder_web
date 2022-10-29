import React, { createContext, useState } from "react";

import THEME_COLOR from "../constants/themeColor";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [tweetTheme, setTweetTheme] = useState("blue");
  const [tweetContent, setTweetContent] = useState({
    text: "Hey 👋🏻 copy link to a tweet and paste it in the search box above, to capture a beautiful image! 😍",
    profilePicture: "http://www.hunder.xyz/profile_image.png",
    profileName: "Zubair Ahmed",
    profileUserName: "zubairself",
    tweetCreatedAt: "Mon Oct 24 2022 19:02:10 GMT+0530 (India Standard Time)",
    tweetMetrics: {
      likeCount: 256,
      repostCount: 50,
      replyCount: 10,
    },
  });
  const [tweetInteractionDisplay, setTweetInteractionDisplay] = useState(true);
  const [tweetDateDisplay, setTweetDateDisplay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [tweetDownload, setTweetDownload] = useState({ func: () => {} });

  const registerTweetDownloadFunction = (func) => {
    setTweetDownload({ func });
  };

  const triggerDownloadTweet = () => {
    tweetDownload.func();
  };

  const changeTweetInteraction = (boolVal) => {
    setTweetInteractionDisplay(boolVal);
  };
  const changeTweetDate = (boolVal) => {
    setTweetDateDisplay(boolVal);
  };

  const changeTweetTheme = (themeName) => {
    if (!THEME_COLOR[themeName]) {
      throw new Error("Theme name is not valid");
    }
    setTweetTheme(themeName);
  };

  const changeTweetContent = (tweetData) => {
    const {
      text,
      profilePicture,
      profileName,
      profileUserName,
      tweetCreatedAt,
      tweetMetrics,
      createdAt,
    } = tweetData || {};

    setTweetContent({
      text,
      profileName,
      profilePicture,
      profileUserName,
      tweetCreatedAt,
      tweetMetrics,
      createdAt,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        tweetTheme,
        changeTweetTheme,
        tweetContent,
        changeTweetContent,
        tweetInteractionDisplay,
        tweetDateDisplay,
        changeTweetDate,
        changeTweetInteraction,
        registerTweetDownloadFunction,
        triggerDownloadTweet,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
GlobalProvider.displayName = "GlobalProvider";

const WithGlobalContext = (Child) => (props) =>
  (
    <GlobalContext.Consumer>
      {(context) => <Child {...props} context={context} />}
      {/* Another option is:  {context => <Child {...props} context={context}/>}*/}
    </GlobalContext.Consumer>
  );

WithGlobalContext.displayName = "WithGlobalContext";

export { GlobalProvider, WithGlobalContext };
