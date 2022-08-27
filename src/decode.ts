import decodeCert from "./decodeCert.ts";
import decodeMacaroon from "./decodeMacaroon.ts";

/**
 * Decode an lndconnect url.
 * @param  {String} lndconnect url to decode.
 * @return {Object} Lnd connect data (object containing host, cert, and macaroon keys).
 */
const decode = (string = "") => {
  let parsedUrl = new URL(string);
  // In browsers, the URL API behaviour isn't consistent if using a custom protocol.
  // https://felixfbecker.github.io/whatwg-url-custom-host-repro/
  // Force the protocol to HTTP and parse again to work around this.
  if (
    parsedUrl.protocol !== "lndconnect:" && parsedUrl.protocol !== "lnconnect:"
  ) {
    throw new Error("Invalid lndconnect url");
  }

  parsedUrl.protocol = "http:";
  parsedUrl = new URL(parsedUrl.toString());

  if (parsedUrl.protocol !== "lndconnect:") {
    throw new Error("Invalid protocol");
  }

  const hasCert = parsedUrl.searchParams.has("cert");
  const hasMacaroon = parsedUrl.searchParams.has("macaroon");
  const hasHost = !!(parsedUrl.host || parsedUrl.searchParams.get("host"));
  if (
    !hasCert ||
    !hasMacaroon ||
    !hasHost
  ) {
    throw new Error("Invalid lndconnect url");
  }

  return {
    host: parsedUrl.host || parsedUrl.searchParams.get("host"),
    cert: decodeCert(parsedUrl.searchParams.get("cert") as string),
    macaroon: decodeMacaroon(parsedUrl.searchParams.get("macaroon") as string),
  };
};

export default decode;
