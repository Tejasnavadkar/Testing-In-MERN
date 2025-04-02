import Request  from 'supertest'  // to simulate request to server withou directly using axios or  without starting server
import {describe,it,expect,Mock, vi} from 'vitest'
import {app} from '../index'
import { prisma } from '../__mocks__/db'


// mocking
// this basically mock the actual db call
// vi.mock('../db',()=>{ // here i want to mock ../db file
//    return { 
//     prisma:{sum:{create:vi.fn()}} // but everytime we have to create keys for every modle and operation for mocking so we use Deep mocking 
// }         
// })

// Remove the mock we added in index.test.ts , simply add a vi.mock("../db") for mocking all keys directly
vi.mock('../db')


// to test http servers(api endpoints)
// here we use supertest library to simulate requset and get response instead of axios, advantage of using Request(supertest) not need start server
describe('POST/sum',()=>{
    it('should return sum of two numbers', async ()=>{

        prisma.sum.create.mockResolvedValue({  // here we return mocked response also in case we return/use response value
            id:1,
            a:2,
            b:1,
            result:3
        })

        vi.spyOn(prisma.sum,"create")  // to validate input while insert into db

       const res = await Request(app).post('/sum').send({
            a:1,
            b:2
        })
        
        expect(prisma.sum.create).toHaveBeenCalledWith({
            data:{
                a:1,
                b:2,
                result:3
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.answer).toBe(3)
    })

    it('should return msg for invalid input',async ()=>{ // here we write test case for handle error also`        
       const res = await Request(app).post('/sum').send({
            a:"sjsjs"
        })

        expect(res.statusCode).toBe(411)
        expect(res.body.message).toBe("Invalid Inputs")
    })


    // test case when variable send through headers
    it('should return sum of two numbers',async ()=>{
       const res = await Request(app).get('/sum').set({
            a:"1",
            b:"2"
        })

        expect(res.statusCode).toBe(200)
        expect(res.body.answer).toBe(3)
    })
    it('should return message',async ()=>{
        const res = await Request(app).get('/sum').send()
 
         expect(res.statusCode).toBe(411)
         expect(res.body.message).toBe("Invalid Inputs")
     })
})

// to send body use send() and to send headers use set()

