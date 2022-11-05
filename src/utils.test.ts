/**
 * Based on https://github.com/jonschlinkert/is-absolute
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Copyright (c) 2009-2014, TJ Holowaychuk
 */

import { untildify, strictUriEncode } from "./utils.ts";

import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.153.0/testing/asserts.ts";
import { join } from "https://deno.land/std@0.153.0/path/mod.ts";
import { homedir } from "https://deno.land/std@0.153.0/node/os.ts";


Deno.test("untildify should throw with objects", () => {
  assertThrows(
    () => {
      // @ts-expect-error This is just to test the throwing
      untildify({
        object: true,
      });
    },
    TypeError,
    "Expected a string, got object",
  );
});


Deno.test("untildify should do nothing for absolute paths", () => {
  assertEquals(untildify("/home/user/thing"), "/home/user/thing");
  assertEquals(untildify("C:\\thing"), "C:\\thing");
});

Deno.test("untildify should work properly", () => {
  assertEquals(untildify("~/thing"), join(homedir()!, "thing"));
});

Deno.test("strictUriEncode should work properly", () => {
  assertEquals(strictUriEncode("unicorn!foobar"), "unicorn%21foobar");
});
