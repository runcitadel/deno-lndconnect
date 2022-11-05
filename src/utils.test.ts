import { isAbsolute } from "./utils.ts";

import { assert } from "https://deno.land/std@0.153.0/testing/asserts.ts";

Deno.test("absolute paths detected correcty (Linux)", () => {
  assert(isAbsolute("/path/to/file"));
});
