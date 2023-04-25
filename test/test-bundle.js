"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/tapzero/fast-deep-equal.js
var require_fast_deep_equal = __commonJS({
  "node_modules/tapzero/fast-deep-equal.js"(exports, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ __name(function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }, "equal");
  }
});

// node_modules/tapzero/index.js
var require_tapzero = __commonJS({
  "node_modules/tapzero/index.js"(exports) {
    "use strict";
    var deepEqual = require_fast_deep_equal();
    var NEW_LINE_REGEX = /\n/g;
    var OBJ_TO_STRING = Object.prototype.toString;
    var AT_REGEX = new RegExp(
      "^(?:[^\\s]*\\s*\\bat\\s+)(?:(.*)\\s+\\()?((?:\\/|[a-zA-Z]:\\\\)[^:\\)]+:(\\d+)(?::(\\d+))?)\\)$"
    );
    var CACHED_FILE;
    var Test = class {
      constructor(name, fn, runner) {
        this.name = name;
        this.fn = fn;
        this.runner = runner;
        this._result = {
          pass: 0,
          fail: 0
        };
        this.done = false;
        this.strict = runner.strict;
      }
      comment(msg) {
        this.runner.report("# " + msg);
      }
      deepEqual(actual, expected, msg) {
        if (this.strict && !msg)
          throw new Error("tapzero msg required");
        this._assert(
          deepEqual(actual, expected),
          actual,
          expected,
          msg || "should be equivalent",
          "deepEqual"
        );
      }
      notDeepEqual(actual, expected, msg) {
        if (this.strict && !msg)
          throw new Error("tapzero msg required");
        this._assert(
          !deepEqual(actual, expected),
          actual,
          expected,
          msg || "should not be equivalent",
          "notDeepEqual"
        );
      }
      equal(actual, expected, msg) {
        if (this.strict && !msg)
          throw new Error("tapzero msg required");
        this._assert(
          actual == expected,
          actual,
          expected,
          msg || "should be equal",
          "equal"
        );
      }
      notEqual(actual, expected, msg) {
        if (this.strict && !msg)
          throw new Error("tapzero msg required");
        this._assert(
          actual != expected,
          actual,
          expected,
          msg || "should not be equal",
          "notEqual"
        );
      }
      fail(msg) {
        if (this.strict && !msg)
          throw new Error("tapzero msg required");
        this._assert(
          false,
          "fail called",
          "fail not called",
          msg || "fail called",
          "fail"
        );
      }
      ok(actual, msg) {
        if (this.strict && !msg)
          throw new Error("tapzero msg required");
        this._assert(
          !!actual,
          actual,
          "truthy value",
          msg || "should be truthy",
          "ok"
        );
      }
      ifError(err, msg) {
        if (this.strict && !msg)
          throw new Error("tapzero msg required");
        this._assert(
          !err,
          err,
          "no error",
          msg || String(err),
          "ifError"
        );
      }
      throws(fn, expected, message) {
        if (typeof expected === "string") {
          message = expected;
          expected = void 0;
        }
        if (this.strict && !message)
          throw new Error("tapzero msg required");
        let caught = null;
        try {
          fn();
        } catch (err) {
          caught = err;
        }
        let pass = !!caught;
        if (expected instanceof RegExp) {
          pass = !!(caught && expected.test(caught.message));
        } else if (expected) {
          throw new Error(`t.throws() not implemented for expected: ${typeof expected}`);
        }
        this._assert(
          pass,
          caught,
          expected,
          message || "show throw",
          "throws"
        );
      }
      _assert(pass, actual, expected, description, operator) {
        if (this.done) {
          throw new Error(
            "assertion occurred after test was finished: " + this.name
          );
        }
        const report = this.runner.report;
        const prefix = pass ? "ok" : "not ok";
        const id = this.runner.nextId();
        report(`${prefix} ${id} ${description}`);
        if (pass) {
          this._result.pass++;
          return;
        }
        const atErr = new Error(description);
        let err = atErr;
        if (actual && OBJ_TO_STRING.call(actual) === "[object Error]") {
          err = actual;
          actual = err.message;
        }
        this._result.fail++;
        report("  ---");
        report(`    operator: ${operator}`);
        let ex = JSON.stringify(expected, null, "  ") || "undefined";
        let ac = JSON.stringify(actual, null, "  ") || "undefined";
        if (Math.max(ex.length, ac.length) > 65) {
          ex = ex.replace(NEW_LINE_REGEX, "\n      ");
          ac = ac.replace(NEW_LINE_REGEX, "\n      ");
          report(`    expected: |-
      ${ex}`);
          report(`    actual:   |-
      ${ac}`);
        } else {
          report(`    expected: ${ex}`);
          report(`    actual:   ${ac}`);
        }
        const at = findAtLineFromError(atErr);
        if (at) {
          report(`    at:       ${at}`);
        }
        report("    stack:    |-");
        const st = (err.stack || "").split("\n");
        for (const line of st) {
          report(`      ${line}`);
        }
        report("  ...");
      }
      async run() {
        this.runner.report("# " + this.name);
        const maybeP = this.fn(this);
        if (maybeP && typeof maybeP.then === "function") {
          await maybeP;
        }
        this.done = true;
        return this._result;
      }
    };
    __name(Test, "Test");
    exports.Test = Test;
    function getTapZeroFileName() {
      if (CACHED_FILE)
        return CACHED_FILE;
      const e = new Error("temp");
      const lines = (e.stack || "").split("\n");
      for (const line of lines) {
        const m = AT_REGEX.exec(line);
        if (!m) {
          continue;
        }
        let fileName = m[2];
        if (m[4] && fileName.endsWith(`:${m[4]}`)) {
          fileName = fileName.slice(0, fileName.length - m[4].length - 1);
        }
        if (m[3] && fileName.endsWith(`:${m[3]}`)) {
          fileName = fileName.slice(0, fileName.length - m[3].length - 1);
        }
        CACHED_FILE = fileName;
        break;
      }
      return CACHED_FILE || "";
    }
    __name(getTapZeroFileName, "getTapZeroFileName");
    function findAtLineFromError(e) {
      const lines = (e.stack || "").split("\n");
      const dir = getTapZeroFileName();
      for (const line of lines) {
        const m = AT_REGEX.exec(line);
        if (!m) {
          continue;
        }
        if (m[2].slice(0, dir.length) === dir) {
          continue;
        }
        return `${m[1] || "<anonymous>"} (${m[2]})`;
      }
      return "";
    }
    __name(findAtLineFromError, "findAtLineFromError");
    var TestRunner = class {
      constructor(report) {
        this.report = report || printLine;
        this.tests = [];
        this.onlyTests = [];
        this.scheduled = false;
        this._id = 0;
        this.completed = false;
        this.rethrowExceptions = true;
        this.strict = false;
      }
      nextId() {
        return String(++this._id);
      }
      add(name, fn, only2) {
        if (this.completed) {
          throw new Error("Cannot add() a test case after tests completed.");
        }
        const t = new Test(name, fn, this);
        const arr = only2 ? this.onlyTests : this.tests;
        arr.push(t);
        if (!this.scheduled) {
          this.scheduled = true;
          setTimeout(() => {
            const promise = this.run();
            if (this.rethrowExceptions) {
              promise.then(null, rethrowImmediate);
            }
          }, 0);
        }
      }
      async run() {
        const ts = this.onlyTests.length > 0 ? this.onlyTests : this.tests;
        this.report("TAP version 13");
        let total = 0;
        let success = 0;
        let fail = 0;
        for (const test3 of ts) {
          const result = await test3.run();
          total += result.fail + result.pass;
          success += result.pass;
          fail += result.fail;
        }
        this.completed = true;
        this.report("");
        this.report(`1..${total}`);
        this.report(`# tests ${total}`);
        this.report(`# pass  ${success}`);
        if (fail) {
          this.report(`# fail  ${fail}`);
        } else {
          this.report("");
          this.report("# ok");
        }
        if (typeof process !== "undefined" && typeof process.exit === "function" && typeof process.on === "function" && Reflect.get(process, "browser") !== true) {
          process.on("exit", function(code) {
            if (typeof code === "number" && code !== 0) {
              return;
            }
            if (fail) {
              process.exit(1);
            }
          });
        }
      }
    };
    __name(TestRunner, "TestRunner");
    exports.TestRunner = TestRunner;
    function printLine(line) {
      console.log(line);
    }
    __name(printLine, "printLine");
    var GLOBAL_TEST_RUNNER = new TestRunner();
    exports.GLOBAL_TEST_RUNNER = GLOBAL_TEST_RUNNER;
    function only(name, fn) {
      if (!fn)
        return;
      GLOBAL_TEST_RUNNER.add(name, fn, true);
    }
    __name(only, "only");
    exports.only = only;
    function skip(_name, _fn) {
    }
    __name(skip, "skip");
    exports.skip = skip;
    function setStrict(strict) {
      GLOBAL_TEST_RUNNER.strict = strict;
    }
    __name(setStrict, "setStrict");
    exports.setStrict = setStrict;
    function test2(name, fn) {
      if (!fn)
        return;
      GLOBAL_TEST_RUNNER.add(name, fn, false);
    }
    __name(test2, "test");
    test2.only = only;
    test2.skip = skip;
    exports.test = test2;
    function rethrowImmediate(err) {
      setTimeout(rethrow, 0);
      function rethrow() {
        throw err;
      }
      __name(rethrow, "rethrow");
    }
    __name(rethrowImmediate, "rethrowImmediate");
  }
});

// test/index.ts
var import_tapzero = __toESM(require_tapzero(), 1);
(0, import_tapzero.test)("example", async (t) => {
  t.ok("ok", "should be an example");
});
