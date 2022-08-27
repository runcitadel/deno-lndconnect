import encodeCert from "./encodeCert.ts";
import encodeMacaroon from "./encodeMacaroon.ts";
import format from "./format.ts";

/**
 * Generate an lndconnect url.
 * @param  {Object} data Data to encode (object containing host, cert, and macaroon keys).
 * @return {String} lndconnect url.
 */
const encode = (data: { cert: string; macaroon: string; host: string }) => {
  const cert = encodeCert(data.cert);
  const macaroon = encodeMacaroon(data.macaroon);
  const host = data.host;

  return format({ host, cert, macaroon });
};

export default encode;
