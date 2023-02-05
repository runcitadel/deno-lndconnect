import { homedir } from "https://deno.land/std@0.176.0/node/os.ts";


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
