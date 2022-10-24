export default async function handler(req, res) {
  // console.log(req);
  if (req.method === "POST") {
    console.log("req" + req.body);

    const { tweetId } = JSON.parse(req.body) || {};
    const params = `?expansions=author_id&tweet.fields=lang,author_id,created_at,public_metrics&user.fields=created_at,profile_image_url,withheld,verified,name&media.fields=preview_image_url&
    `

    const fetchedTweet = await fetch(
      "https://api.twitter.com/2/tweets/" + tweetId + params,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_API_KEY}`,
        },
        
      }

    );
    const responseTweet = await fetchedTweet.json();
    console.log(JSON.stringify(responseTweet));
    res.json(responseTweet);
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
