import express, { Request, Response } from 'express'
import z from 'zod'
export const app = express()

app.use(express.json())


const sumInput = z.object({
    a:z.number(),
    b:z.number()
})

// for test http server(api endpoints) we need superset library to write test cases

// app.post('/sum', (req: Request, res: Response): void => {

//     const { a, b } = req.body
//     const answer = a + b

//     res.json({
//         answer
//     })
//     return
// })

app.post('/sum', (req: Request, res: Response): void => {

      const parsedInput = sumInput.safeParse(req.body)
       
      if(!parsedInput.success){ //  should write test cases for handling error also
        res.status(411).json({
            message:'Invalid Inputs'
        })
        return
      }

     const answer = parsedInput.data.a + parsedInput.data.b

    res.json({
        answer
    })
    return
})

// if api accept headers instead of body then how we can write cases?


app.get('/sum', (req: Request, res: Response): void => {

    const parsedInput = sumInput.safeParse({
        a:Number(req.headers["a"]),
        b:Number(req.headers["b"])
    })
     
    if(!parsedInput.success){ //  should write test cases for handling error also
      res.status(411).json({
          message:'Invalid Inputs'
      })
      return
    }

   const answer = parsedInput.data.a + parsedInput.data.b

  res.json({
      answer
  })
  return
})


// here we seperate logic of server listning from here coz we export entire app from here and it imported by supertest for test cases
// if you have test running you dont want them to take up a port


