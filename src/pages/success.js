import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Success = () => {
  const router = useRouter();
  const { session_id: sessionID } = router.query;

  const [session, setSession] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("/api/success", {
          session_id: sessionID,
        });
        console.log(data);
        setSession(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [sessionID]);
  return (
    <div className="w-screen h-screen grid place-items-center">
      <span>
        Kedves {session?.customer_details.name.split(" ")[1]}!<br />
        Rendelésed sikeresen Rögzítettük.
      </span>
    </div>
  );
};

export default Success;
