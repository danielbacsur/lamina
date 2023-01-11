import axios from "axios";
import { useEffect, useState } from "react";

const Search = () => {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [sdata, setSData] = useState([]);

  useEffect(() => {
    setToken(JSON.parse(window.localStorage.getItem("spotify")).token);
  }, []);

  const searchArtists = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "track,artist,album,playlist",
          limit: 3,
        },
      });
      setSData(data);
      console.log(sdata);
    } catch {
      console.log("error");
    }
  };
  const ddict = {
    tracks: "Track",
    artists: "Track",
    albums: "Track",
    playlists: "Track",
  };
  const renderArtists = () => (
    //   ddict[Object.keys(sdata)[1]];
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        {sdata?.albums?.items?.map((item) => (
          <>
          {item.uri}
            <img
              className="w-32 aspect-square"
              key={item?.id}
              src={item?.images[0]?.url}
            />
          </>
        ))}
      </div>

      <div className="flex gap-8">
        {sdata?.artists?.items?.map((item) => (
          <img
            className="w-32 aspect-square"
            key={item?.id}
            src={item?.images[0]?.url}
          />
        ))}
      </div>

      <div className="flex gap-8">
        {sdata?.playlists?.items?.map((item) => (
          <img
            className="w-32 aspect-square"
            key={item?.id}
            src={item?.images[0]?.url}
          />
        ))}
      </div>

      <div className="flex gap-8">
        {sdata?.tracks?.items?.map((item) => (
          <img
            className="w-32 aspect-square"
            key={item?.id}
            src={item?.album?.images[0]?.url}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>

        {token && (
          <form onChange={searchArtists}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type={"submit"}>Search</button>
          </form>
        )}

        {renderArtists()}
      </header>
    </div>
  );
};

export default Search;
