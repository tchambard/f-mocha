"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const f_promise_1 = require("f-promise");
const __1 = require("..");
__1.setup();
describe("basic test", () => {
    it('sync works', () => {
        chai_1.assert(true, 'got true');
    });
    it('async works like sync', () => {
        chai_1.assert(true, 'got true before wait');
        f_promise_1.wait(cb => setTimeout(cb, 0));
        chai_1.assert(true, 'got true after wait');
    });
    it.skip('skip', () => {
        chai_1.assert(true, "not executed because of skip");
    });
});
describe("basic test on before", () => {
    describe("sync test", () => {
        let expected;
        before('init expected value', () => {
            expected = true;
        });
        it('check expected value set in before', () => {
            chai_1.assert(expected, 'got expected value set in before');
            expected = false;
        });
        it('check expected value set in before but changed in previous it', () => {
            chai_1.assert(!expected, 'got expected value set in before');
        });
    });
    describe("async test", () => {
        let expected;
        before('init expected value', () => {
            chai_1.assert(true, 'got false before wait');
            f_promise_1.wait(cb => setTimeout(cb, 0));
            chai_1.assert(true, 'got true after wait');
            expected = true;
        });
        it('check expected value set in before', () => {
            chai_1.assert(expected, 'got expected value set in before');
            expected = false;
        });
        it('check expected value set in before but changed in previous it', () => {
            chai_1.assert(!expected, 'got expected value set in before');
        });
    });
});
describe("basic test on beforeEach", () => {
    describe("sync test", () => {
        let expected;
        beforeEach('init expected value', () => {
            expected = true;
        });
        it('check expected value set in beforeEach', () => {
            chai_1.assert(expected, 'got expected value set in before');
            expected = false;
        });
        it('check expected value set in beforeEach but changed in previous it', () => {
            chai_1.assert(expected, 'got expected value set in before');
        });
    });
    describe("async test", () => {
        let expected;
        beforeEach('init expected value', () => {
            chai_1.assert(true, 'got false before wait');
            f_promise_1.wait(cb => setTimeout(cb, 0));
            chai_1.assert(true, 'got true after wait');
            expected = true;
        });
        it('check expected value set in beforeEach', () => {
            chai_1.assert(expected, 'got expected value set in before');
            expected = false;
        });
        it('check expected value set in beforeEach but changed in previous it', () => {
            chai_1.assert(expected, 'got expected value set in before');
        });
    });
    describe("async test without string prefix", () => {
        let expected;
        beforeEach(function () {
            this.timeout(20000);
            chai_1.assert(true, 'got false before wait');
            f_promise_1.wait(cb => setTimeout(cb, 0));
            chai_1.assert(true, 'got true after wait');
            expected = true;
        });
        it('check expected value set in beforeEach', () => {
            chai_1.assert(expected, 'got expected value set in before');
            expected = false;
        });
        it('check expected value set in beforeEach but changed in previous it', () => {
            chai_1.assert(expected, 'got expected value set in before');
        });
    });
    describe("async test with done parameter called too soon", () => {
        let expected;
        beforeEach(function (done) {
            done();
            f_promise_1.wait(() => setTimeout(() => {
                expected = true;
            }, 1000));
        });
        it('check expected value set in beforeEach', (done) => {
            chai_1.assert(!expected, 'got expected value set in before');
            done();
        });
    });
    describe("async test with done parameter called in time", () => {
        let expected;
        beforeEach(function (done) {
            chai_1.assert(true, 'got true after wait');
            setTimeout(() => {
                expected = true;
                done();
            }, 1000);
        });
        it('check expected value set in beforeEach', () => {
            chai_1.assert(expected, 'got expected value set in before');
        });
    });
});
//# sourceMappingURL=basic-test.js.map