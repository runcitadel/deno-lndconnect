import encodeCert from "./encodeCert.ts";
import { join, dirname } from "https://deno.land/std@0.176.0/path/mod.ts";
import { assertEquals } from "https://deno.land/std@0.176.0/testing/asserts.ts";
import { CERT_PATH, ENCODED_CERT, ENCODED_CERT_PATH } from "./test.ts";

Deno.test("encodeCert (data)", async () => {
  const currentFile = new URL(import.meta.url).pathname;
  const certPath = join(dirname(currentFile), "fixtures", "tls.cert");
  const certFile = await Deno.readTextFile(certPath);
  const cert = encodeCert(certFile);
  assertEquals(cert, ENCODED_CERT);
});

Deno.test("encodeCert (path)", () => {
  const cert = encodeCert(CERT_PATH);
  assertEquals(cert, ENCODED_CERT_PATH);
});

Deno.test("encodeCert (empty)", () => {
  assertEquals(encodeCert(""), "");
});
