import decode from "./decode.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.153.0/testing/asserts.ts";
import {
  CERT,
  CONNECTION_STRING,
  CONNECTION_STRING_LEGACY,
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
