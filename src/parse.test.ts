import parse from "./parse.ts";
import {
  CONNECTION_STRING,
  CONNECTION_STRING_LEGACY,
  CONNECTION_STRING_NO_CERT,
  CONNECTION_STRING_NO_HOST,
  CONNECTION_STRING_NO_MACAROON,
  ENCODED_CERT,
  ENCODED_MACAROON,
  HOSTNAME,
  PORT,
} from "./test.ts";
import { assertEquals, assertThrows } from "https://deno.land/std@0.176.0/testing/asserts.ts";

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
  assertThrows(() => parse("a" + CONNECTION_STRING), Error, "Invalid lndconnect url", "Invalid protocol");
});

Deno.test("parse (missing properties)", () => {
  assertThrows(() => parse(CONNECTION_STRING_NO_CERT), Error, "Invalid lndconnect url", "Missing certs");
  assertThrows(() => parse(CONNECTION_STRING_NO_HOST), Error, "Invalid lndconnect url", "Missing host");
  assertThrows(() => parse(CONNECTION_STRING_NO_MACAROON), Error, "Invalid lndconnect url", "Missing macaroon");
});
