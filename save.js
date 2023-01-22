
        try {
            const { data } = await axios.get(
              `https://itunes.apple.com/search?term=${formData.search}&limit=5`
            );
          //   console.log(data)
          //   console.log({
          //     value: data.results.map((item) => ({
          //       type: formData.type,
          //       name: item.trackCensoredName || "",
          //       artists: item.artistName,
          //       url: item.trackViewUrl,
          //     //   image: item.album?.images[0].url || item.images[0]?.url,
          //     })),
          //   });
  
          //   formDataDispatch({
          //     type: "ASSIGN",
          //     key: "results",
          //     value: data[type].items.map((item) => ({
          //       type,
          //       name: item.name,
          //       artists: item.artists?.map((artist) => artist.name).join(", "),
          //       uri: item.uri,
          //       url: item.external_urls.spotify,
          //       image: item.album?.images[0].url || item.images[0]?.url,
          //     })),
          //   });
          } catch {}
        