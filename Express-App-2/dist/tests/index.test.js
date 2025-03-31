"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest")); // to simulate request to server withou directly using axios or  without starting server
const globals_1 = require("@jest/globals");
const index_1 = require("../index");
// here we use supertest library to simulate requset and get response instead of axios advantage of using Request(supertest) not need start server
(0, globals_1.describe)('POST/sum', () => {
    (0, globals_1.it)('should return sum of two numbers', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post('/sum').send({
            a: 1,
            b: 2
        });
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(res.body.answer).toBe(3);
    }));
    (0, globals_1.it)('should return msg for invalid input', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post('/sum').send({
            a: "sjsjs"
        });
        (0, globals_1.expect)(res.status).toBe(411);
        (0, globals_1.expect)(res.body.message).toBe("Invalid Inputs");
    }));
    // test case when variable send through headers
    (0, globals_1.it)('should return sum of two numbers', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get('/sum').set({
            a: "1",
            b: "2"
        });
        (0, globals_1.expect)(res.status).toBe(200);
        (0, globals_1.expect)(res.body.answer).toBe(3);
    }));
    (0, globals_1.it)('should return message', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get('/sum').send();
        (0, globals_1.expect)(res.status).toBe(411);
        (0, globals_1.expect)(res.body.message).toBe("Invalid Inputs");
    }));
});
