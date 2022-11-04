/**
 * Decode an lndconnect url.
 * @param  {String} lndconnect url to parse.
 * @return {Object} Lnd connect data (object containing host, cert, and macaroon keys).
 */
const parse = (string = "") => {
  let parsedUrl = new URL(string);
  // In browsers, the URL API behaviour isn't consistent if using a custom protocol.
  // https://felixfbecker.github.io/whatwg-url-custom-host-repro/
  // Force the protocol to HTTP and parse again to work around this.
  if (
    parsedUrl.protocol !== "lndconnect:"
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
    cert: parsedUrl.searchParams.get("cert") as string,
    macaroon: parsedUrl.searchParams.get("macaroon") as string,
  };
};

export default parse;
