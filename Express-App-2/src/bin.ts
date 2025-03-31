import { app } from "./index";

import dotenv from 'dotenv'
dotenv.config()

app.listen(3000,()=>{
    console.log('server started')
})

