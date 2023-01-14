import Stripe from "stripe";
import { translateType } from "utils";

const stripe = new Stripe(
  "sk_test_51MNIXiFHXQAurXSs0A7uZKkQvKArBxCwOhN9F0eWJbBJ0gagRNrkgXbWtOlw6ig2EVoF4CLMMgp5XFCkR7LdJeAo00dRO8v59g"
);

const Checkout = async (req, res) => {
  const { items } = req.body;

  const trans = items.map((item) => ({
    price_data: {
      currency: "huf",
      product_data: {
        name: item.title,
        images: [item.image],
        description: translateType(item.type),
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
    cancel_url: `${req.headers.origin}/manage`,
  });
  res.status(200).json(session.url);
};

export default Checkout;
