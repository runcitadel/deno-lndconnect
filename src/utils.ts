import { homedir } from "https://deno.land/std@0.153.0/node/os.ts";

export function untildify(pathWithTilde: string) {
  const homeDirectory = homedir();
  if (typeof pathWithTilde !== "string") {
    throw new TypeError(`Expected a string, got ${typeof pathWithTilde}`);
  }

  return homeDirectory
    ? pathWithTilde.replace(/^~(?=$|\/|\\)/, homeDirectory)
    : pathWithTilde;
}

export function strictUriEncode(input: string) {
  return encodeURIComponent(input).replace(
    /[!'()*]/g,
    (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

/**
 * Cross platform isAbsolute path routine extracted from node JS code
 */

const CHAR_UPPERCASE_A = 65; /* A */
const CHAR_LOWERCASE_A = 97; /* a */
const CHAR_UPPERCASE_Z = 90; /* Z */
const CHAR_LOWERCASE_Z = 122; /* z */

const CHAR_FORWARD_SLASH = 47; /* / */
const CHAR_BACKWARD_SLASH = 92;

const CHAR_COLON = 58;

function isWindowsDeviceRoot(code: number) {
  return (
    (code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z) ||
    (code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z)
  );
}

function isPathSeparator(code: number) {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
}

export function isAbsolute(path: string) {
  const len = path.length;
  if (len === 0) return false;

  const code = path.charCodeAt(0);
  return (
    isPathSeparator(code) ||
    // Possible device root
    (len > 2 && isWindowsDeviceRoot(code) &&
      path.charCodeAt(1) === CHAR_COLON && isPathSeparator(path.charCodeAt(2)))
  );
}
