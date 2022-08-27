import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import decodeMacaroon from "./decodeMacaroon.ts";
import {
  ENCODED_MACAROON,
  ENCODED_MACAROON_PATH,
  MACAROON,
  MACAROON_PATH,
} from "./test.ts";

Deno.test("decodeMacaroon", () => {
  const decodedMacaroon = decodeMacaroon(ENCODED_MACAROON);
  assertEquals(decodedMacaroon, MACAROON);
});

Deno.test("decodeMacaroon (path)", () => {
  const decodedMacaroon = decodeMacaroon(ENCODED_MACAROON_PATH);
  assertEquals(decodedMacaroon, MACAROON_PATH);
});
