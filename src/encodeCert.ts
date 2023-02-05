import { encode } from "https://deno.land/std@0.176.0/encoding/base64url.ts";
import { decode } from "https://deno.land/std@0.176.0/encoding/base64.ts";
import { strictUriEncode } from "./utils.ts";

/**
 * Encode a tls certificate as a base64 encoded url string.
 * @param  {String} certPath Path to vertificate file.
 * @return {String} Encoded certificate
 */
const encodeCert = (cert: string) => {
  if (!cert) {
    return "";
  }

  let lines = cert.split(/[\r\n]+/);
  lines = lines.filter((line) => line != "");

  // If its a cert, strip out the header and footer and base64url encode it.
  if (lines[0] === "-----BEGIN CERTIFICATE-----") {
    lines.pop();
    lines.shift();
    return encode(decode(lines.join("")));
  }
  // Otherwise assume it is a filepath.
  return strictUriEncode(lines[0]);
};

export default encodeCert;
