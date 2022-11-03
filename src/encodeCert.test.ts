import encodeCert from "./encodeCert.ts";
import { join } from "https://deno.land/std@0.153.0/path/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import { CERT_PATH, ENCODED_CERT, ENCODED_CERT_PATH } from "./test.ts";

Deno.test("encodeCert (data)", async () => {
  const certPath = join("src", "fixtures", "tls.cert");
  const certFile = await Deno.readTextFile(certPath);
  const cert = encodeCert(certFile);
  assertEquals(cert, ENCODED_CERT);
});

Deno.test("encodeCert (path)", () => {
  const cert = encodeCert(CERT_PATH);
  assertEquals(cert, ENCODED_CERT_PATH);
});
