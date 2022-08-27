/**
 * Generate an lndconnect url.
 * @param  {Object} data Data to format (object containing host, cert, and macaroon keys).
 * @return {String} lndconnect url.
 */
const format = (
  data: { cert: string; macaroon: string; host: string },
): string => {
  const { cert, macaroon, host } = data;
  const url = new URL("lndconnect://");
  url.host = host;
  url.searchParams.set("cert", cert);
  url.searchParams.set("macaroon", macaroon);
  return url.toString();
};

export default format;
