/**
 * Based on https://github.com/jonschlinkert/is-absolute
 * 
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Copyright (c) 2009-2014, TJ Holowaychuk
 */

import { isAbsolute } from "./utils.ts";

import {
  assert,
  assertFalse,
} from "https://deno.land/std@0.153.0/testing/asserts.ts";

Deno.test("isAbsolute should support windows", () => {
  assert(isAbsolute("c:\\"));
  assert(isAbsolute("//C://user\\docs\\Letter.txt"));
  assertFalse(isAbsolute("a:foo/a/b/c/d"));
  assertFalse(isAbsolute(":\\"));
  assertFalse(isAbsolute("foo\\bar\\baz"));
  assertFalse(isAbsolute("foo\\bar\\baz\\"));
  assert(isAbsolute("\\\\unc\\share"));
  assert(isAbsolute("\\\\unc\\share\\foo"));
  assert(isAbsolute("\\\\unc\\share\\foo\\"));
  assert(isAbsolute("\\\\unc\\share\\foo\\bar"));
  assert(isAbsolute("\\\\unc\\share\\foo\\bar\\"));
  assert(isAbsolute("\\\\unc\\share\\foo\\bar\\baz"));
});

Deno.test("isAbsolute should support windows unc", () => {
  assert(isAbsolute("\\\\foo\\bar"));
  assert(isAbsolute("//UNC//Server01//user//docs//Letter.txt"));
});

Deno.test("isAbsolute should support unices", () => {
  assert(isAbsolute("/foo/bar"));
  assertFalse(isAbsolute("foo/bar"));
  assert(isAbsolute("/user/docs/Letter.txt"));
});
