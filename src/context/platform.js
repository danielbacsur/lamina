import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useReducer } from "react";

function reducer(platforms, action) {
  if (action.type === "SPOTIFY") {
    return platforms.find((platform) => platform.name === "spotify")
      ? platforms.map(platform => platform.name === "spotify" ? 
             {
                ...platform,
                quantity: item.quantity + 1,
              }
            : item
      )
      : [
          ...platforms,
          {
            name: "spotify",
            token: action.token,
            expiration: action.expiration * 1000,
          },
        ];
  } else if (action.type === "APPLE") {
    return platforms.find((platform) => platform.name === "apple")
      ? platforms
      : [
          ...platforms,
          {
            name: "apple",
            token: action.token,
            expiration: action.expiration,
          },
        ];
  } else if (action.type === "RECOVER") {
    return action.platforms;
  } else if (action.type === "VALIDATE") {
    return platforms
    // return platforms.filter(platform => platform.expiration < 420);
  } else {
    return platforms;
  }
}

export const usePlatform = () => useContext(PlatformContext);
export const PlatformContext = createContext();

const def = [];
const PlatformProvider = ({ children }) => {
  const [platforms, dispatch] = useReducer(reducer, def);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("platforms")) === null) return;
    dispatch({
      type: "RECOVER",
      platforms: JSON.parse(localStorage.getItem("platforms")),
    });
  }, []);

  useEffect(() => {
    if (platforms === def && localStorage.getItem("platforms")?.length > 0)
      return;
    localStorage.setItem("platforms", JSON.stringify(platforms));
    // dispatch({
    //   type: "VALIDATE",
    // });

  }, [platforms]);

  return (
    <PlatformContext.Provider value={{ platforms, dispatch }}>
      {children}
    </PlatformContext.Provider>
  );
};

export default PlatformProvider;
