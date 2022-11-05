import { encode } from "https://deno.land/std@0.162.0/encoding/base64url.ts";
import { decode } from "https://deno.land/std@0.162.0/encoding/hex.ts";
import { strictUriEncode } from "./utils.ts";

/**
 * Encode a binary macaroon as a base64 encoded url string.
 * @param  {String} macaroonPath Path to macaroon file.
 * @return {String} Encoded macaroon
 */
const encodeMacaroon = (input: string | Uint8Array) => {
  if (!input) {
    return "";
  }

  // If we have a string, which does not look like hex treat it as a file path.
  if (typeof input === "string" && !/^[0-9a-fA-F]+$/.test(input)) {
    return strictUriEncode(input);
  } else if (typeof input === "string") {
    // If it's hex, decode the hex and then base64url encode it
    return encode(decode(new TextEncoder().encode(input)));
  } else {
    // Otherwise, just base64url encode it.
    return encode(input);
  }
};

export default encodeMacaroon;
