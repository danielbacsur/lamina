export const getType = (url) => {
  return url.split("open.spotify.com")[1].substring(1).split("/")[0];
};
export const getUUID = (url) => {
  return url
    .split("open.spotify.com")[1]
    .substring(1)
    .split("/")[1]
    .split("?")[0];
};
export const translateType = (type) => {
  const transition = {
    track: "zeneszám",
    playlist: "playlist",
    album: "Album",
    artist: "előadó",
  };
  return transition[type]
};
