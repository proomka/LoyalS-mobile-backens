const server = require("../server");
const express = require("request"); // делает запрос на страницу
const assert = require("assert"); // сравнивает значения

describe("server tests", () => {
    before(done => {
        server.listen(3000, done);
    });

    after(done => {
        server.close(done);
    });

    describe("description", () => {
        it("should ", done => {});
    });
});
