"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const sumInput = zod_1.default.object({
    a: zod_1.default.number(),
    b: zod_1.default.number()
});
// for test http server(api endpoints) we need superset library to write test cases
// app.post('/sum', (req: Request, res: Response): void => {
//     const { a, b } = req.body
//     const answer = a + b
//     res.json({
//         answer
//     })
//     return
// })
exports.app.post('/sum', (req, res) => {
    const parsedInput = sumInput.safeParse(req.body);
    if (!parsedInput.success) { //  should write test cases for handling error also
        res.status(411).json({
            message: 'Invalid Inputs'
        });
        return;
    }
    const answer = parsedInput.data.a + parsedInput.data.b;
    res.json({
        answer
    });
    return;
});
// if api accept headers instead of body then how we can write cases?
exports.app.get('/sum', (req, res) => {
    const parsedInput = sumInput.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    });
    if (!parsedInput.success) { //  should write test cases for handling error also
        res.status(411).json({
            message: 'Invalid Inputs'
        });
        return;
    }
    const answer = parsedInput.data.a + parsedInput.data.b;
    res.json({
        answer
    });
    return;
});
// here we seperate logic of server listning from here coz we export entire app from here and it imported by supertest for test cases
// if you have test running you dont want them to take up a port
