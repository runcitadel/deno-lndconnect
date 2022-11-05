import { assertEquals } from "https://deno.land/std@0.162.0/testing/asserts.ts";
import format from "./format.ts";
import {
  CONNECTION_STRING,
  ENCODED_CERT,
  ENCODED_MACAROON,
  HOSTNAME,
  PORT,
} from "./test.ts";

Deno.test("format", () => {
  const connectionString = format({
    host: `${HOSTNAME}:${PORT}`,
    macaroon: ENCODED_MACAROON,
    cert: ENCODED_CERT,
  });
  assertEquals(connectionString, CONNECTION_STRING);
});
