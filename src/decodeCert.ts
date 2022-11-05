import { decode } from "https://deno.land/std@0.153.0/encoding/base64url.ts";
import { encode } from "https://deno.land/std@0.153.0/encoding/base64.ts";
import { untildify } from "./utils.ts";
import { isAbsolute } from "https://deno.land/std@0.153.0/path/win32.ts";

/**
 * decode a tls certificate from a base64 encoded url string.
 * @param  {String} certString base64url encoded string to decode
 * @return {String} decoded certificate
 */
const decodeCert = (certString: string): string => {
  if (!certString) {
    return "";
  }

  const unescaped = decodeURIComponent(certString);

  if (isAbsolute(untildify(unescaped))) {
    return unescaped;
  }

  const cert = encode(decode(unescaped));
  const prefix = "-----BEGIN CERTIFICATE-----\n";
  const postfix = "-----END CERTIFICATE-----";
  return prefix + cert.match(/.{0,64}/g)?.join("\n") + postfix;
};

export default decodeCert;
