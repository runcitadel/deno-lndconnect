import encodeMacaroon from "./encodeMacaroon.ts";
import { encode } from "https://deno.land/std@0.176.0/encoding/hex.ts";
import { join, dirname } from "https://deno.land/std@0.176.0/path/mod.ts";
import { assertEquals } from "https://deno.land/std@0.176.0/testing/asserts.ts";
import {
  ENCODED_MACAROON,
  ENCODED_MACAROON_PATH,
  MACAROON_PATH,
} from "./test.ts";

Deno.test("encodeMacaroon (data)", async () => {
  const currentFile = new URL(import.meta.url).pathname;
  const macaroonPath = join(dirname(currentFile), "fixtures", "admin.macaroon");
  const macaroonFile = await Deno.readFile(macaroonPath);
  const macaroon = encodeMacaroon(macaroonFile);
  assertEquals(macaroon, ENCODED_MACAROON, "encoded macaroon");
});

Deno.test("encodeMacaroon (hex)", async () => {
  const currentFile = new URL(import.meta.url).pathname;
  const macaroonPath = join(dirname(currentFile), "fixtures", "admin.macaroon");
  const macaroonFile = await Deno.readFile(macaroonPath);
  const macaroon = encodeMacaroon(
    new TextDecoder().decode(encode(macaroonFile)),
  );
  assertEquals(macaroon, ENCODED_MACAROON);
});

Deno.test("encodeMacaroon (path)", () => {
  const cert = encodeMacaroon(MACAROON_PATH);
  assertEquals(cert, ENCODED_MACAROON_PATH, "encoded macaroon path");
});

Deno.test("encodeMacaroon (empty)", () => {
  assertEquals(encodeMacaroon(""), "");
});
