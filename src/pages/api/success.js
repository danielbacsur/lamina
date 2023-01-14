import Stripe from "stripe";
import { translateType } from "utils";

const stripe = new Stripe(
  "sk_test_51MNIXiFHXQAurXSs0A7uZKkQvKArBxCwOhN9F0eWJbBJ0gagRNrkgXbWtOlw6ig2EVoF4CLMMgp5XFCkR7LdJeAo00dRO8v59g"
);

const Success = async (req, res) => {
  const sessionID = req.body.session_id;

  const session = await stripe.checkout.sessions.retrieve(sessionID);
  // const customer = await stripe.customers.retrieve(session.customer);
  res.status(200).json(session);
};

export default Success;
