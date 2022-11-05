import decode from "./decode.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.162.0/testing/asserts.ts";
import {
  CERT,
  CONNECTION_STRING,
  CONNECTION_STRING_LEGACY,
  CONNECTION_STRING_NO_CERT,
  CONNECTION_STRING_NO_HOST,
  CONNECTION_STRING_NO_MACAROON,
  HOSTNAME,
  MACAROON,
  PORT,
} from "./test.ts";

Deno.test("decode (valid)", () => {
  const connectionDetails = decode(CONNECTION_STRING);
  assertEquals(connectionDetails.host, `${HOSTNAME}:${PORT}`, "extracted host");
  assertEquals(connectionDetails.cert, CERT, "extracted cert");
  assertEquals(connectionDetails.macaroon, MACAROON, "extracted macaroon");
});

Deno.test("decode legacy (valid)", () => {
  const connectionDetails = decode(CONNECTION_STRING_LEGACY);
  assertEquals(connectionDetails.host, `${HOSTNAME}:${PORT}`, "extracted host");
  assertEquals(connectionDetails.cert, CERT, "extracted cert");
  assertEquals(connectionDetails.macaroon, MACAROON, "extracted macaroon");
});

Deno.test("decode (invalid protocol)", () => {
  assertThrows(() => decode("a" + CONNECTION_STRING), Error, "Invalid lndconnect url", "Invalid protocol");
});

Deno.test("parse (missing properties)", () => {
  assertThrows(() => decode(CONNECTION_STRING_NO_CERT), Error, "Invalid lndconnect url", "Missing certs");
  assertThrows(() => decode(CONNECTION_STRING_NO_HOST), Error, "Invalid lndconnect url", "Missing host");
  assertThrows(() => decode(CONNECTION_STRING_NO_MACAROON), Error, "Invalid lndconnect url", "Missing macaroon");
});
