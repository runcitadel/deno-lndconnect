import { assertEquals } from "https://deno.land/std@0.162.0/testing/asserts.ts";
import encode from "./encode.ts";
import { CERT, CONNECTION_STRING, HOSTNAME, MACAROON, PORT } from "./test.ts";

Deno.test("encode", () => {
  const connectionString = encode({
    host: `${HOSTNAME}:${PORT}`,
    macaroon: MACAROON,
    cert: CERT,
  });
  assertEquals(connectionString, CONNECTION_STRING);
});
