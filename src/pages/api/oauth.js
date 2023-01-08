const OAuth = async (req, res) => {
  console.log(req.headers.origin)
  let redirect = process.env.NEXT_PUBLIC_SPOTYFY_AUTH_ENDPOINT;
  redirect += `?client_id=${process.env.NEXT_PUBLIC_SPOTYFY_CLIENT_ID}`;
  redirect += `&redirect_uri=${req.headers.origin}/manage`;
  redirect += `&response_type=${process.env.NEXT_PUBLIC_SPOTYFY_RESPONSE_TYPE}`;
  res.status(200).json(redirect);
};

export default OAuth;
