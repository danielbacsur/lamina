const OAuth = async (req, res) => {
  if (req.query.platform === "spotify") {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_SPOTYFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
    };
    fetch("https://accounts.spotify.com/api/token", params)
      .then((result) => result.json())
      .then((result) => res.status(200).json(result));
  }
  else {
    res.status(200).json({alma: 123})
  }
};

export default OAuth;
