import { assertEquals } from "https://deno.land/std@0.176.0/testing/asserts.ts";
import decodeCert from "./decodeCert.ts";
import { CERT, CERT_PATH, ENCODED_CERT, ENCODED_CERT_PATH } from "./test.ts";

Deno.test("decodeCert", () => {
  const decodedCert = decodeCert(ENCODED_CERT);
  assertEquals(decodedCert, CERT);
});

Deno.test("decodeCert (path)", () => {
  const decodedCert = decodeCert(ENCODED_CERT_PATH);
  assertEquals(decodedCert, CERT_PATH);
});

Deno.test("decodeCert (empty)", () => {
  assertEquals(decodeCert(""), "");
});
