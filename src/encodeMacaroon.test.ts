import encodeMacaroon from "./encodeMacaroon.ts";
import { encode } from "https://deno.land/std@0.153.0/encoding/hex.ts";
import { join } from "https://deno.land/std@0.153.0/path/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import {
  ENCODED_MACAROON,
  ENCODED_MACAROON_PATH,
  MACAROON_PATH,
} from "./test.ts";

Deno.test("encodeMacaroon (data)", async () => {
  const macaroonPath = join("fixtures", "admin.macaroon");
  const macaroonFile = await Deno.readFile(macaroonPath);
  const macaroon = encodeMacaroon(macaroonFile);
  assertEquals(macaroon, ENCODED_MACAROON, "encoded macaroon");
});

Deno.test("encodeMacaroon (hex)", async () => {
  const macaroonPath = join("fixtures", "admin.macaroon");
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
