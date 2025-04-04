import { PrismaClient } from "@prisma/client";
import { mockDeep } from 'vitest-mock-extended'

export const prisma = mockDeep<PrismaClient>() // here we mock all functions/models deeply

// dont need to write different mocks like this 
// vi.mock('../db',()=>{
//     return {
//         prisma:{sum:{create:vi.fn()}}
//     }
// })

