import parse from "./parse.ts";
import {
  CONNECTION_STRING,
  CONNECTION_STRING_LEGACY,
  ENCODED_CERT,
  ENCODED_MACAROON,
  HOSTNAME,
  PORT,
} from "./test.ts";
import { assertEquals, assertThrows } from "https://deno.land/std@0.153.0/testing/asserts.ts";

Deno.test("parse", () => {
  const connectionString = parse(CONNECTION_STRING);
  assertEquals(
    connectionString.host,
    `${HOSTNAME}:${PORT}`,
    "generated expected host string",
  );
  assertEquals(
    connectionString.cert,
    ENCODED_CERT,
    "generated expected cert string",
  );
  assertEquals(
    connectionString.macaroon,
    ENCODED_MACAROON,
    "generated expected macaroon string",
  );
});

Deno.test("parse (legacy format)", () => {
  const connectionString = parse(CONNECTION_STRING_LEGACY);
  assertEquals(
    connectionString.host,
    `${HOSTNAME}:${PORT}`,
    "generated expected host string",
  );
  assertEquals(
    connectionString.cert,
    ENCODED_CERT,
    "generated expected cert string",
  );
  assertEquals(
    connectionString.macaroon,
    ENCODED_MACAROON,
    "generated expected macaroon string",
  );
});

Deno.test("parse (invalid protocol)", () => {
  assertThrows(() => parse("111" + CONNECTION_STRING), Error, "Invalid lndconnect url", "Invalid protocol");
});
