import React, { useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import { InputBase, InputAdornment, Box, Typography } from "@mui/material";

import { withGlobalContext } from "../../context/Global.context";

import styles from "./TweetSearch.module.css";

const TweetSearch = (props) => {
  const [searchValue, setSearchValue] = useState();
  const [error, setError] = useState(false);
  const { context } = props || {};
  const { tweetTheme, tweetContent, changeTweetContent, setIsLoading } =
    context || {};
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <form
        style={{ width: "400px", height: "50px" }}
        className={styles.container}
        onSubmit={async (e) => {
          setError(false);
          e.preventDefault();
          setIsLoading(true);

          if(!validURL(searchValue)){
            setError("Please enter a valid tweet URL");
            setIsLoading(false);
            return;
          }

          let tweetId = searchValue.split('/');
          tweetId = tweetId[tweetId.length-1];

          const response = await fetch("/api/tweet", {
            method: "POST",
            body: JSON.stringify({
              tweetId,
            }),
          });
          setIsLoading(false);
          const dataJson = await response.json();
          console.log(dataJson);
          if(!dataJson || !dataJson.data){
            setError("Please enter a valid Tweet URL")
          }
          if (dataJson && dataJson.data) {
            const tweetData = dataJson.data;
            const tweetIncludes = dataJson.includes;

            const user = tweetIncludes?.users[0];

            let userPfp = user.profile_image_url.split("/");
            userPfp[userPfp.length - 1] = userPfp[userPfp.length - 1].replace(
              "_normal",
              ""
            );
            userPfp = userPfp.join("/");

            changeTweetContent({
              text: tweetData.text,
              profilePicture: userPfp,
              profileUserName: user.username,
              profileName: user.name,
              tweetCreatedAt: tweetData.created_at,
              tweetMetrics: {
                likeCount: tweetData?.public_metrics?.like_count,
                repostCount:
                  tweetData?.public_metrics?.quote_count +
                  tweetData?.public_metrics?.retweet_count,
                replyCount: tweetData?.public_metrics?.reply_count,
              },
            });
          }
        }}
      >
        <Box ml={1.5}>
          <Search />
        </Box>

        <InputBase
          // size="small"
          style={{ padding: "10px" }}
          placeholder="Paste the tweet URL and press enter"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={(e) => {
            setError(false);
            const val = e.target.value;
            
            setSearchValue(val);
          }}
          onSubmit={async () => {
            console.log(searchValue);
          }}
          value={searchValue}
        />
      </form>
      {error && (
        <Typography variant="caption" color="lightsalmon">
          {error}
        </Typography>
      )}
    </Box>
  );
};

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}


export default withGlobalContext(TweetSearch);
