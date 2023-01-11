import { data } from "autoprefixer";
import { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState({});
  
  useEffect(() => {
      const oembed = async (url) => {
        try {
          const { data } = await axios("https://open.spotify.com/oembed", {
            params: {
              url,
            },
          });
    
          console.log(data);
    
          return {
            title: data.title,
            url,
            image: data.thumbnail_url,
    
            // type: getType(e.target.value),
            // uuid: getUUID(e.target.value),
          };
        } catch (error) {
          console.log(error);
        }
      };
    const d = oembed(
      "https://open.spotify.com/playlist/37i9dQZF1E8KL0dRi1xUL8"
    );
    setData(d);
    console.log(d);
  }, []);

  return <div>alma</div>;
};

export default Test;
