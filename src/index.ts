import { run } from 'f-promise';


function wrapWithRun(fn: Function) {
    return function (name: string, body: () => void) {
        if (!body) {
            if (typeof name === 'string') {
                return fn(name);
            } else if (typeof name === 'function') {
                return fn(function (done: MochaDone) {
                    run(() => name()).then(done, done);
                });
            }
        }
        return fn(name, function (done: MochaDone) {
            run(() => body()).then(done, done);
        });
    }
}
export function setup() {
    function patchFn(fnName: string, subNames?: string[]) {
        subNames = subNames || [];
        const _fn = glob[fnName];
        if (_fn.wrapped) return;
        glob[fnName] = wrapWithRun(_fn);
        subNames.forEach((subFnName) => {
            glob[fnName][subFnName] = wrapWithRun(_fn[subFnName]);
        });
        glob[fnName].wrapped = true;
    }

    const glob = global as any;
    patchFn('it', [ 'only', 'skip']);
    patchFn('before');
    patchFn('beforeEach');
    patchFn('after');
    patchFn('afterEach');
}
