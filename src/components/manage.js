const IFrame = ({ tag }) => (
  <iframe
    className="w-full h-[80px] rounded-[12px] shadow-lg"
    src={`https://open.spotify.com/embed/${tag}`}
    allowFullScreen=""
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  />
);

export {
  IFrame,
};
