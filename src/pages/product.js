import { usePlatform } from "context/platform";
import { Router, useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  const {platforms, dispatch} = usePlatform()
  const Left = () => {
    return (
      <div className="w-full md:w-[50vw] h-[50vh] md:h-screen grid place-items-center px-12 pt-12 md:pb-12">
        <img
          alt="Product Image"
          src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="object-cover w-[25vh] md:w-[25vw] aspect-square rounded-xl shadow-xl"
        />
      </div>
    );
  };
  const Right = () => {
    const TitleSubtitlePrice = () => {
      return (
        <div class="flex justify-between">
          <div>
            <h1 class="text-2xl font-bold">Lamina Falkép</h1>

            <p class="mt-0.5 text-sm">Beépített NFC csippel.</p>
          </div>

          <p class="text-2xl font-bold">4000 Ft</p>
        </div>
      );
    };
    const Details = () => {
      const Short = () => (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veniam
          dicta beatae eos ex error culpa delectus rem tenetur, architecto quam
          nesciunt, dolor veritatis nisi minus inventore, rerum at recusandae?
        </p>
      );
      const Long = () => (
        <>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veniam
            dicta beatae eos ex error culpa delectus rem tenetur, architecto
            quam nesciunt, dolor veritatis nisi minus inventore, rerum at
            recusandae?
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nam
            sapiente nobis ea veritatis error consequatur nisi exercitationem
            iure laudantium culpa, animi temporibus non! Maxime et quisquam
            amet. A, deserunt!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nam
            sapiente nobis ea veritatis error consequatur nisi exercitationem
            iure laudantium culpa, animi temporibus non! Maxime et quisquam
            amet. A, deserunt!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nam
            sapiente nobis ea veritatis error consequatur nisi exercitationem
            iure laudantium culpa, animi temporibus non! Maxime et quisquam
            amet. A, deserunt!
          </p>
        </>
      );
      return (
        <details class="group relative text-justify">
          <summary class="block">
            <div class="group-open:hidden pb-1">
              <Short />
            </div>

            <div class="text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0">
              <span className="block group-open:hidden">Olvass Többet</span>
              <span className="hidden group-open:block">Bezárás</span>
            </div>
          </summary>

          <div class="pb-6">
            <Long />
          </div>
        </details>
      );
    };
    const Form = () => {
      const Fieldset = ({ title, children }) => {
        return (
          <fieldset>
            <legend class="mb-1 text-sm font-medium">{title}</legend>

            <div class="flow-root">
              <div class="-m-0.5 flex flex-wrap">{children}</div>
            </div>
          </fieldset>
        );
      };
      const Input = ({ title, ...args }) => {
        const random = Math.random().toString(36).slice(2, 7);
        return (
          <label for={random} class="cursor-pointer p-0.5">
            <input type="radio" {...args} id={random} class="sr-only peer" />

            <span class="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
              {title}
            </span>
          </label>
        );
      };

      //   useEffect(() => {}, [type, search]) setResult

      const spotify = () => {
        let redirect = process.env.NEXT_PUBLIC_SPOTYFY_AUTH_ENDPOINT;
        redirect += `?client_id=${process.env.NEXT_PUBLIC_SPOTYFY_CLIENT_ID}`;
        redirect += `&redirect_uri=${location.origin}/product`;
        redirect += `&response_type=${process.env.NEXT_PUBLIC_SPOTYFY_RESPONSE_TYPE}`;
        return redirect;
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "platform") {
          if (value === "spotify") {
            router.push(spotify());
            // if not valid token
            console.log("OAuth");
            // else OK
          }
        } else if (name === "type") {
          // set type
        } else if (name === "search") {
          // set search
        } else if (name === "result") {
        }
        // e.preventDefault();
        console.log(e.target.name);
        console.log(e.target.value);
      };
      return (
        <form className="flex flex-col gap-6" onChange={(e) => handleChange(e)}>
          <Fieldset title="Platform">
            <Input title="Spotify" name="platform" value="spotify" />
            <Input title="Apple Music" name="platform" value="apple" onClick={() => dispatch({type: "APPLE", token: "KORTE", expiration: 420})} />
            <Input title="Soundcloud" name="platform" value="soundcloud" onClick={() => dispatch({type: "SPOTIFY", token: "ALMA", expiration: 123})} />
          </Fieldset>
          <Fieldset title="Keresés típúsa">
            <Input title="Zeneszám" name="type" />
            <Input title="Playlist" name="type" />
            <Input title="Album" name="type" />
            <Input title="Előadó" name="type" />
          </Fieldset>
          <Fieldset>
            <input
              type="text"
              name="search"
              id="search"
              className="w-full first-letter:inline-block px-4 text-center py-2 text-xs font-medium border border-brand-900 rounded-full outline-none"
              placeholder="Keress valamit .."
              onChange={(e) => {}}
            />
          </Fieldset>
          <Fieldset title="Keresés eredményei">
            <Input title="Kanye West - Heartless" name="results" />
            <Input title="Kanye West - All Mine" name="results" />
            <Input title="Steve Lacy - Dark Red" name="results" />
            <Input title="Drake - Can I" name="results" />
            <Input title="Kid Cudi - Day 'n' Nite" name="results" />
            <Input title="JAY-Z - Otis" name="results" />
            <Input title="Dr. Dog - Where'd All the Time Go?" name="results" />
          </Fieldset>
          <Fieldset title="Méret">
            <Input title="Kicsi (20x20)" name="size" />
            <Input title="Médium (25x25)" name="size" />
            <Input title="Nagy (30x30)" name="size" />
          </Fieldset>
          <Fieldset title="Mennyiség">
            <Input title="1 DB" name="quantity" />
            <Input title="2 DB" name="quantity" />
            <Input title="5 DB" name="quantity" />
          </Fieldset>
          <Fieldset title="Anyag">
            <Input title="Papír - Habkarton (5mm)" name="material" />
            <Input title="Habosított Műanyag (5mm)" name="material" />
          </Fieldset>

          <div class="flex">
            <button
              type="submit"
              class="w-full block px-4 py-2 font-medium text-xs text-white bg-brand-900 rounded-full hover:bg-brand-800"
            >
              Kosárhoz adás
            </button>
          </div>
        </form>
      );
    };
    return (
      <div className="w-full max-w-screen-sm md:w-[50vw] md:h-screen px-12 !!!!!!!!!!!!!!! border-l !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!">
        <div className="md:min-h-screen flex flex-col justify-center gap-6 py-12">
          <TitleSubtitlePrice />
          <Details />
          <Form />
        </div>
      </div>
    );
  };
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <Left />
      <Right />
    </div>
  );
};

export default Product;
