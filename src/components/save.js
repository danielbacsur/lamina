{/* {state === "DEFAULT" && (
          <form className="w-full flex flex-col gap-8">
            <button
              className="h-12 rounded-[12px] text-white bg-black"
              onClick={() => setState("SEARCH")}
              type="button"
            >
              Lemez hozzáadása
            </button>
            <div className="flex flex-col gap-4">
              {items.map((item) => {
                const tag = item.url.split("open.spotify.com")[1].substring(1);
                return (
                  <div
                    className="flex items-center justify-between gap-4"
                    key={item.url}
                  >
                    <IFrame tag={tag} />
                    <button
                      className="flex-1 h-[80px] rounded-[12px] aspect-square shadow-lg"
                      onClick={() => decrement(item)}
                      type="button"
                    >
                      -
                    </button>
                  </div>
                );
              })}
              {items.length === 0 && (
                <span className="shadow-lg h-[80px] rounded-[12px] grid place-items-center">
                  A kosarad üres
                </span>
              )}
            </div>

            <button
              className="h-12 rounded-[12px] text-white bg-black"
              onClick={checkout}
              type="button"
            >
              Fizetés
            </button>
          </form>
        )}
        {state === "SEARCH" && (
          <form className="w-full flex flex-col gap-8">
            <input
              className="w-full h-12 rounded-[12px] border border-black shadow-lg text-center"
              type="text"
              onChange={(e) => {
                searchArtists(e.target.value);
              }}
            />
            <div className="flex flex-col gap-4">
              {Object.keys(searchJSON).map((key) => {
                const url = searchJSON[key].items[0].external_urls.spotify;
                const suri = searchJSON[key].items[0].uri
                  .substring(8)
                  .replace(":", "/");

                return (
                  <div
                    className="flex items-center justify-between gap-4"
                    key={key}
                  >
                    <IFrame tag={suri} />
                    <button
                      className="flex-none h-[80px] rounded-[12px] aspect-square shadow-lg"
                      onClick={() => addFinal(url)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              className="h-12 rounded-[12px] text-white bg-black"
              onClick={() => setState("DEFAULT")}
              type="button"
            >
              Vissza
            </button>
          </form>
        )} */}
        {/* <div className="w-full h-full flex flex-col justify-between overflow-y-hidden">
          <div className="w-full h-full relative overflow-hidden">
            <div className="w-full h-full overflow-y-auto grid place-items-center overflow-hidden">
              default
            </div>
            <div
              className={clsx(
                "w-full h-full overflow-y-auto bg-white transition-all duration-200 grid place-items-center",
                state === "SEARCH" ? "-translate-y-full" : "translate-y-0"
              )}
            >
              <div className="w-full flex flex-col items-center justify-center gap-8 p-8">


                <input
                  className="w-full h-12 rounded-[12px] border-2 border-black shadow-lg text-center"
                  onChange={(e) => {
                    searchArtists(e.target.value);
                  }}
                />
                <div className="w-full grid lg:grid-cols-2 gap-8">
                  {Object.keys(searchJSON).map((key) => {
                    const url = searchJSON[key].items[0].external_urls.spotify;
                    const suri = searchJSON[key].items[0].uri
                      .substring(8)
                      .replace(":", "/");

                    return (
                      <div className="flex flex-col rounded-[12px] hover:scale-105 transition-all">
                        <IFrame tag={suri} key={key} />
                        <button
                          className="h-8 rounded-[12px] aspect-square shadow-lg"
                          onClick={() => addFinal(url)}
                          type="button"
                        >
                          <span className="capitalize">
                            {translateType(key.slice(0, -1))} hozzáadása
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              </div>

          </div>

          <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8 p-8 border-t">
            {state === "DEFAULT" && (
              <button
                className="w-full h-12 rounded-[12px] text-white bg-black"
                onClick={() => setState("SEARCH")}
              >
                Kereső megnyitása 🔎
              </button>
            )}
            {state === "SEARCH" && (
              <button
                className="w-full h-12 rounded-[12px] border-2 border-black"
                onClick={() => setState("DEFAULT")}
              >
                Vissza ⬅️
              </button>
            )}
            <button
              className="w-full h-12 rounded-[12px] text-white bg-black"
              onClick={checkout}
            >
              Fizetés 💰
            </button>
          </div>
        </div> */}
        {/* <div className="absolute w-full top-0 flex gap-8 p-8 border-t">
          {state === "SEARCH" && (
            <>
              <button
                className="flex-1 h-12 rounded-[12px] text-white bg-black"
                onClick={() => setState("asd")}
                type="button"
              >
                Lemez hozzáadása
              </button>
              <button
                className="flex-1 h-12 rounded-[12px] text-white bg-black"
                onClick={() => setState("SEARCH")}
                type="button"
              >
                Lemez hozzáadása
              </button>
            </>
          )}

          {state === "DEFAULT" && (
            <button
              className="w-full h-12 rounded-[12px] text-white bg-black"
              onClick={() => setState("SEARCH")}
              type="button"
            >
              Lemez hozzáadása
            </button>
          )}
        </div>
        <div className="absolute w-full bottom-0 p-8 border-t">
          <button
            className="w-full h-12 rounded-[12px] text-white bg-black"
            onClick={() => setState("SEARCH")}
            type="button"
          >
            Lemez hozzáadása
          </button>
        </div> */}