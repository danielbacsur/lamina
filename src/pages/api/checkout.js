import Stripe from "stripe";
import { getType, getUUID } from "utils";

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
        description: `${item.platform} ${getType(item.url)}`,
        metadata: {
          title: item.title,
          url: item.url,
          image: item.image,
          platform: item.platform,
          type: item.type,
          uuid: item.uuid,
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
    allow_promotion_codes: true,
    line_items: trans,
    metadata: { items: JSON.stringify(items) },
    mode: "payment",
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/manage`,
  });
  res.status(200).json(session.url);
};

export default Checkout;
