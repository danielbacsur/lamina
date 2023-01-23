import Stripe from "stripe";
import { capitalize, translateType } from "utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const Checkout = async (req, res) => {
  const { items } = req.body;

  const trans = items.map((item) => ({
    price_data: {
      currency: "huf",
      product_data: {
        name: item.name,
        images: [item.image],
        // description: `${capitalize(item.type)}${
        //   item.artists ? ` by ${item.artists}` : ""
        // }`,
        metadata: {
          ...item,
        },
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["HU"],
    },
    locale: "hu",
    line_items: trans,
    mode: "payment",
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/product`,
  });
  res.status(200).json(session.url);
};

export default Checkout;
