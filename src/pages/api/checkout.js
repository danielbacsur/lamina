import Stripe from "stripe";

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
        description: `By ${item.artist}`,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["HU"],
    },
    // shipping_options: [
    //   {
    //     shipping_rate_data: {
    //       type: "fixed_amount",
    //       fixed_amount: { amount: 0, currency: "huf" },
    //       display_name: "Free shipping",
    //       delivery_estimate: {
    //         minimum: { unit: "business_day", value: 5 },
    //         maximum: { unit: "business_day", value: 7 },
    //       },
    //     },
    //   },
    // ],
    locale: "hu",
    allow_promotion_codes: true,
    line_items: trans,
    mode: "payment",
    success_url: `${req.headers.origin}/cart`,
    cancel_url: `${req.headers.origin}/cart`,
  });
  res.status(200).json(session.url);
};

export default Checkout;
