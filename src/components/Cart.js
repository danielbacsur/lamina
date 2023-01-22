import { useState } from "react";

const Cart = ({ enabled }) => {
  const [showSidebar, setShowSidebar] = useState(enabled);

  return (
      <div
        className={`top-0 right-0 w-screen bg-white overflow-y-auto  p-10 pl-20 fixed h-full z-40  ease-in-out duration-300 ${
          enabled ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <h3 className="mt-20 text-4xl font-semibold">
          I am a sidebar
        </h3>
        <h3 className="mt-20 text-4xl font-semibold">
          I am a sidebar
        </h3>
        <h3 className="mt-20 text-4xl font-semibold">
          I am a sidebar
        </h3>
        <h3 className="mt-20 text-4xl font-semibold">
          I am a sidebar
        </h3>
        <h3 className="mt-20 text-4xl font-semibold">
          I am a sidebar
        </h3>
        <h3 className="mt-20 text-4xl font-semibold">
          I am a sidebar
        </h3>
        <h3 className="mt-20 text-4xl font-semibold">
          I am a sidebar
        </h3>
      </div>
  );
};

export default Cart;
