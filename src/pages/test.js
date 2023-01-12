import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [ddata, setDData] = useState();

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("spotify")).token;
    const searchArtists = async () => {
      const { data: searchData } = await axios.get(
        "https://api.spotify.com/v1/search",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: "drake",
            type: "track,artist,album,playlist",
            limit: 1,
          },
        }
      );
      console.log(searchData);

      const res = await Promise.all(
        Object.keys(searchData).map(async (category) => {
          const { data: trackData } = await axios(
            "https://open.spotify.com/oembed",
            {
              params: {
                url: searchData[category].items[0].external_urls.spotify,
              },
            }
          );
          return trackData;
        })
      );
      console.log("res");
      console.log(res);

      // setSearchJSON({
      //   track: searchData.tracks.items[0].external_urls.spotify,
      //   album: searchData.albums.items[0].external_urls.spotify,
      //   playlist: searchData.playlists.items[0].external_urls.spotify,
      //   artist: searchData.artists.items[0].external_urls.spotify,
      // });
      setDData(res);
    };

    searchArtists();
  }, []);
  return ddata?.map((cat) => (
    <div dangerouslySetInnerHTML={{ __html: cat.html }}></div>
  ));
  return <div dangerouslySetInnerHTML={{ __html: ddata }}></div>;
};

export default Test;
