import Request  from 'supertest'  // to simulate request to server withou directly using axios or  without starting server
import {describe,it,expect} from '@jest/globals'
import {app} from '../index'



// here we use supertest library to simulate requset and get response instead of axios advantage of using Request(supertest) not need start server
describe('POST/sum',()=>{
    it('should return sum of two numbers', async ()=>{
       const res = await Request(app).post('/sum').send({
            a:1,
            b:2
        })

        expect(res.statusCode).toBe(200)
        expect(res.body.answer).toBe(3)
    })

    it('should return msg for invalid input',async ()=>{ // here we write test case for handle error also
       const res = await Request(app).post('/sum').send({
            a:"sjsjs"
        })

        expect(res.status).toBe(411)
        expect(res.body.message).toBe("Invalid Inputs")
    })


    // test case when variable send through headers
    it('should return sum of two numbers',async ()=>{
       const res = await Request(app).get('/sum').set({
            a:"1",
            b:"2"
        })

        expect(res.status).toBe(200)
        expect(res.body.answer).toBe(3)
    })
    it('should return message',async ()=>{
        const res = await Request(app).get('/sum').send()
 
         expect(res.status).toBe(411)
         expect(res.body.message).toBe("Invalid Inputs")
     })
})


