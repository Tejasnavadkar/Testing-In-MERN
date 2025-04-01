import express  from "express";
import z from 'zod'
export const app = express()  // export we need app in test.ts file
import { prisma } from "./db";
app.use(express.json())

const sumInput = z.object({
    a:z.number(),
    b:z.number()
})



app.post("/sum", async (req, res):Promise<void> => {
    const parsedResponse = sumInput.safeParse(req.body)
    
    if (!parsedResponse.success) {
         res.status(411).json({
            message: "Invalid Inputs"
        })
        return
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    await prisma.sum.create({  // mock this 
        data:{
            a:parsedResponse.data.a,
            b:parsedResponse.data.b,
            result:answer
        }
    })

    res.status(200).json({
        answer
    })
});

app.get("/sum", (req, res):void => {
    const parsedResponse = sumInput.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    })
    
    if (!parsedResponse.success) {
       res.status(411).json({
            message: "Invalid Inputs"
        })
        return 
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    res.status(200).json({
        answer
    })
});



// We’re not doing an app.listen here. This is because we dont want the app to actually start when the tests are running. 
// Usually you create a bin.ts file or main.ts file that imports app and actually listens on a port
 