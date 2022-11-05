import { decode } from "https://deno.land/std@0.153.0/encoding/base64url.ts";
import { encode } from "https://deno.land/std@0.153.0/encoding/hex.ts";
import { untildify } from "./utils.ts";
import { isAbsolute } from "https://deno.land/std@0.153.0/path/win32.ts";

/**
 * decode a binary macaroon as a base64 decoded url string.
 * @param  {String} macaroonPath Path to macaroon file.
 * @return {String} decoded macaroon
 */
const decodeMacaroon = (macaroonString: string): string => {
  if (!macaroonString) {
    return "";
  }

  const unescaped = decodeURIComponent(macaroonString);

  if (isAbsolute(untildify(unescaped))) {
    return unescaped;
  }

  return new TextDecoder().decode(encode(decode(unescaped)));
};

export default decodeMacaroon;
