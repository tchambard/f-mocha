"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const f_promise_1 = require("f-promise");
function wrapWithRun(body) {
    return function (done) {
        function doneErr(err) {
            if (err && err instanceof Error) {
                done(err);
            }
            else {
                done();
            }
        }
        // check done is called only when declared (normal mocha behaviour)
        if (body.length === 0) {
            f_promise_1.run(() => {
                return body.call(this);
            }).then(doneErr, done);
        }
        else {
            f_promise_1.run(() => {
                return body.call(this, doneErr);
            });
        }
    };
}
function overrideFn(fn) {
    return function (name, body) {
        if (!body) {
            if (typeof name === 'string') {
                return fn(name);
            }
            else {
                return fn(wrapWithRun(name));
            }
        }
        return fn(name, wrapWithRun(body));
    };
}
function setup() {
    function patchFn(fnName, subNames) {
        subNames = subNames || [];
        const _fn = glob[fnName];
        if (_fn.wrapped)
            return;
        glob[fnName] = overrideFn(_fn);
        subNames.forEach((subFnName) => {
            glob[fnName][subFnName] = overrideFn(_fn[subFnName]);
        });
        glob[fnName].wrapped = true;
    }
    const glob = global;
    patchFn('it', ['only', 'skip']);
    patchFn('before');
    patchFn('beforeEach');
    patchFn('after');
    patchFn('afterEach');
}
exports.setup = setup;
//# sourceMappingURL=index.js.map