import axios from "axios";
import Cart from "components/Cart";
import { useCart } from "context/cart";
import { useForm } from "context/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Product = () => {
  const { formData, dispatch: formDataDispatch } = useForm();
  const { items, dispatch: cartDispatch } = useCart();
  const [platforms, setPlatforms] = useState({});
  const setPlatform = (platform) => {
    setPlatforms({ ...platforms, ...platform });
  };
  const [prices, setPrices] = useState({});
  const price = () => Object.values(prices).reduce((a, b) => a + b, 0);
  const router = useRouter();

  const search = () => {
    if (!formData.search || !formData.type) return;
    ({
      spotify: async () => {
        try {
          const { data } = await axios.get(
            "https://api.spotify.com/v1/search",
            {
              headers: {
                Authorization: `${platforms[formData.platform].token_type} ${
                  platforms[formData.platform].access_token
                }`,
              },
              params: {
                q: formData.search,
                type: formData.type,
                limit: 5,
              },
            }
          );
          formDataDispatch({
            type: "ASSIGN",
            key: "results",
            value: data[Object.keys(data)[0]].items.map((item) => ({
              type: formData.type,
              name: item.name,
              artists: item.artists?.map((artist) => artist.name).join(", "),
              uri: item.uri,
              url: item.external_urls.spotify,
              image: item.album?.images[0].url || item.images[0]?.url,
            })),
          });
        } catch {}
      },
      apple: async () => {},
      soundcloud: async () => {},
    }[formData.platform]());
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    formDataDispatch({ type: "ASSIGN", key: name, value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { search, result, results, ...rest } = {
      ...formData,
      ...formData.results.find((result) => result.url === formData.result),
      price: price(),
    };
    console.log(rest);
    const { data } = await axios.post("/api/checkout", {
      items: [rest],
    });
    router.push(data);
    // cartDispatch({ type: "APPEND", item: rest });
  };
  const handleCheckout = async () => {
    console.log(items);
    const { data } = await axios.post("/api/checkout", {
      items,
    });
    router.push(data);
  };

  useEffect(() => {
    if (!formData.platform) return;
    const request = async () => {
      const { data } = await axios.get(`/api/platform/${formData.platform}`);
      setPlatform({ [formData.platform]: data });
    };
    request();
  }, [formData.platform]);
  useEffect(() => {
    if (!formData.type) return;
    search();
  }, [formData.type]);
  useEffect(() => {
    if (!formData.search) return;
    const delayDebounceFn = setTimeout(() => {
      search();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [formData.search]);
  useEffect(() => {
    if (!formData.result) return;
    if (
      formData.results.find((result) => result.url === formData.result) ===
      undefined
    ) {
      formDataDispatch({
        type: "ASSIGN",
        key: "result",
        value: formData.results[0].url,
      });
    }
  }, [formData.results]);
  useEffect(() => {
    const { size: s, function: f, quantity: q, material: m } = formData;
    if (!s || !f || !q || !m) return;

    setPrices({
      size: { small: -250, medium: 0, big: 250 }[s],
      function: { normal: -250, smart: 0 }[f],
      quantity: { 1: 4000, 2: 3500, 5: 3000 }[q],
      material: { paper: -250, carbonate: 0 }[m],
    });
  }, [formData.size, formData.function, formData.quantity, formData.material]);

  const Fieldset = ({ title, children }) => {
    return (
      <fieldset>
        <legend className="mb-1 text-sm font-medium">{title}</legend>

        <div className="flow-root">
          <div className="-m-0.5 flex flex-wrap">{children}</div>
        </div>
      </fieldset>
    );
  };
  const Input = ({ title, name, value, ...args }) => {
    const enabled = formData[name] == value;
    return (
      <label htmlFor={`${name}-${value}`} className="cursor-pointer p-0.5">
        <input
          type="radio"
          defaultChecked={enabled}
          name={name}
          value={value}
          id={`${name}-${value}`}
          className="sr-only peer"
          {...args}
        />
        <span className="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
          {title}
        </span>
      </label>
    );
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:fixed md:top-0 md:left-0 w-screen md:w-[50vw] h-[50vh] md:h-screen grid place-items-center px-12 pt-12 md:pb-12">
        <img
          alt="Product Image"
          src={
            formData.results?.find((result) => result.url === formData.result)
              ?.image || "https://via.placeholder.com/640"
          }
          className="object-cover w-[25vh] md:w-[25vw] aspect-square rounded-xl shadow-xl"
        />
      </div>
      <div className="md:absolute md:top-0 md:right-0 w-screen md:w-[50vw] md:min-h-screen px-12 !!!!!!!!!!!!!!! border-l !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!">
        <div className="md:min-h-screen flex flex-col justify-center gap-6 py-12">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">Lamina Borítókép</h1>

              <p className="mt-0.5 text-sm">Beépített NFC csippel.</p>
            </div>

            <p className="text-2xl font-bold">{price()} Ft / kép</p>
          </div>
          <details className="group relative text-justify  [&_summary::-webkit-details-marker]:hidden">
            <summary className="block">
              <div className="group-open:hidden pb-1 prose-p">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  veniam dicta beatae eos ex error culpa delectus rem tenetur,
                  architecto quam nesciunt, dolor veritatis nisi minus
                  inventore, rerum at recusandae?
                </p>
              </div>

              <div className="text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0">
                <span className="block group-open:hidden">Olvass Többet</span>
                <span className="hidden group-open:block">Bezárás</span>
              </div>
            </summary>

            <div className="pb-6 prose-p:">
              <>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  veniam dicta beatae eos ex error culpa delectus rem tenetur,
                  architecto quam nesciunt, dolor veritatis nisi minus
                  inventore, rerum at recusandae?
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat nam sapiente nobis ea veritatis error consequatur nisi
                  exercitationem iure laudantium culpa, animi temporibus non!
                  Maxime et quisquam amet. A, deserunt!
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat nam sapiente nobis ea veritatis error consequatur nisi
                  exercitationem iure laudantium culpa, animi temporibus non!
                  Maxime et quisquam amet. A, deserunt!
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat nam sapiente nobis ea veritatis error consequatur nisi
                  exercitationem iure laudantium culpa, animi temporibus non!
                  Maxime et quisquam amet. A, deserunt!
                </p>
              </>
            </div>
          </details>
          <form
            className="flex flex-col gap-6"
            onChange={(e) => handleChange(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            <Fieldset title="Platform">
              <Input title="Spotify" name="platform" value="spotify" />
              {/* <Input title="Apple Music" name="platform" value="apple" /> */}
              {/* <Input title="Soundcloud" name="platform" value="soundcloud" /> */}
            </Fieldset>
            <Fieldset title="Keresés típúsa">
              <Input title="Zeneszám" name="type" value="track" />
              <Input title="Playlist" name="type" value="playlist" />
              <Input title="Album" name="type" value="album" />
              <Input title="Előadó" name="type" value="artist" />
            </Fieldset>
            <input
              type="text"
              name="search"
              className="w-full first-letter:inline-block px-4 text-center py-2 text-xs font-medium border border-brand-900 rounded-full outline-none"
              placeholder={
                formData.search ? formData.search : "Keress valamit .."
              }
            />
            <Fieldset title="Keresés eredményei">
              {formData.results?.map(({ name, artists, url }) => (
                <Input
                  key={url}
                  title={`${name} ${artists ? ` - ${artists}` : ""}`}
                  name="result"
                  value={url}
                />
              ))}
            </Fieldset>
            <Fieldset title="Méret">
              <Input title="Kicsi (20x20)" name="size" value="small" />
              <Input title="Médium (25x25)" name="size" value="medium" />
              <Input title="Nagy (30x30)" name="size" value="big" />
            </Fieldset>
            <Fieldset title="Funkció">
              <Input title="Normál" name="function" value="normal" />
              <Input
                title="Lejátszható - Beépített NFC Csippel"
                name="function"
                value="smart"
              />
            </Fieldset>
            <Fieldset title="Mennyiség">
              <Input title="1 DB" name="quantity" value={1} />
              <Input title="2 DB" name="quantity" value={2} />
              <Input title="5 DB" name="quantity" value={5} />
            </Fieldset>
            <Fieldset title="Anyag">
              <Input
                title="Papír - Habkarton (5mm)"
                name="material"
                value="paper"
              />
              <Input
                title="Habosított Műanyag (5mm)"
                name="material"
                value="carbonate"
              />
            </Fieldset>

            <button
              type="submit"
              className="w-full block px-4 py-2 font-medium text-xs text-white bg-brand-900 rounded-full hover:bg-brand-800"
            >
              Véglegesítés
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
