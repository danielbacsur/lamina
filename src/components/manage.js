const OrderButton = ({ text, onClick }) => (
  <button
    className={"h-12 rounded text-white bg-black font-serif"}
    onClick={onClick}
  >
    {text}
  </button>
);

const SearchBar = ({ onChange }) => (
  <div className="w-full h-12 flex gap-4 border border-black rounded overflow-hidden shadow-lg">
    <div className="flex-none h-full aspect-square grid place-items-center shadow-lg bg-black/5">
      🔎
    </div>
    <input
      className="flex-1 text-center pr-4 outline-none"
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
const SearchResult = ({ src, title, text, onClick }) => (
  <button
    className="w-full gap-4 pr-4 flex items-center justify-between hover:scale-105 transition-all shadow-lg rounded overflow-hidden"
    onClick={onClick}
  >
    <div
      className="flex-none w-12 aspect-square shadow-lg bg-cover transition-all"
      style={{
        backgroundImage: `url(${src})`,
      }}
    ></div>
    <span className="flex-1 font-serif text-left">{title}</span>
    <span className="font-serif text-sm capitalize">{text}</span>
  </button>
);


export { OrderButton, SearchBar, SearchResult };
