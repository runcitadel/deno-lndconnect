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
} from "https://deno.land/std@0.162.0/testing/asserts.ts";
import { join } from "https://deno.land/std@0.162.0/path/mod.ts";
import { homedir } from "https://deno.land/std@0.162.0/node/os.ts";


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

Deno.test("untildify should do nothing if it can't find the homedir", () => {
  // Ignore this test on node
  // @ts-ignore process is defined in node, but not in deno
  if (typeof process !== "undefined") return; 
  const oldHome = Deno.env.get("HOME");
  const oldUserProfile = Deno.env.get("USERPROFILE");
  assertEquals(untildify("~/thing"), join(homedir()!, "thing"));
  Deno.env.delete("HOME");
  Deno.env.delete("USERPROFILE");
  assertEquals(untildify("~/thing"), "~/thing");
  if (oldHome) Deno.env.set("HOME", oldHome);
  if (oldUserProfile) Deno.env.set("USERPROFILE", oldUserProfile);
});

Deno.test("strictUriEncode should work properly", () => {
  assertEquals(strictUriEncode("unicorn!foobar"), "unicorn%21foobar");
});
