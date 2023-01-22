import React, { createContext, useContext, useEffect, useReducer } from "react";

function reducer(data, action) {
  if (action.type === "ASSIGN") {
    return { ...data, [action.key]: action.value };
  } else if (action.type === "RECOVER") {
    return action.data;
  } else {
    return data;
  }
}

const FormContext = createContext();
export const useForm = () => useContext(FormContext);

const def = {
  platform: "spotify",
  type: "track",
  result: "https://open.spotify.com/track/4EWCNWgDS8707fNSZ1oaA5",
  results: [
    {
      "type": "track",
      "name": "Heartless",
      "artists": "Kanye West",
      "uri": "spotify:track:4EWCNWgDS8707fNSZ1oaA5",
      "url": "https://open.spotify.com/track/4EWCNWgDS8707fNSZ1oaA5",
      "image": "https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18"
    },
    {
      "type": "track",
      "name": "Bound 2",
      "artists": "Kanye West",
      "uri": "spotify:track:3sNVsP50132BTNlImLx70i",
      "url": "https://open.spotify.com/track/3sNVsP50132BTNlImLx70i",
      "image": "https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9"
    },
    {
      "type": "track",
      "name": "Ni**as In Paris",
      "artists": "JAY-Z, Kanye West",
      "uri": "spotify:track:4Li2WHPkuyCdtmokzW2007",
      "url": "https://open.spotify.com/track/4Li2WHPkuyCdtmokzW2007",
      "image": "https://i.scdn.co/image/ab67616d0000b273699bfca9512ee8d1fbf126a7"
    },
    {
      "type": "track",
      "name": "Flashing Lights",
      "artists": "Kanye West, Dwele",
      "uri": "spotify:track:5TRPicyLGbAF2LGBFbHGvO",
      "url": "https://open.spotify.com/track/5TRPicyLGbAF2LGBFbHGvO",
      "image": "https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a"
    },
    {
      "type": "track",
      "name": "Runaway",
      "artists": "Kanye West, Pusha T",
      "uri": "spotify:track:3DK6m7It6Pw857FcQftMds",
      "url": "https://open.spotify.com/track/3DK6m7It6Pw857FcQftMds",
      "image": "https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f"
    }
  ],
  size: "medium",
  function: "smart",
  quantity: "1",
  material: "carbonate",
};
const FormProvider = ({ children }) => {
  const [formData, dispatch] = useReducer(reducer, def);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("form")) === null) return;
    dispatch({
      type: "RECOVER",
      data: JSON.parse(localStorage.getItem("form")),
    });
  }, []);

  useEffect(() => {
    if (formData === def && localStorage.getItem("form")?.length > 0) return;
    localStorage.setItem("form", JSON.stringify(formData));
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
