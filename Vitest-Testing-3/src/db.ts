import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

// Create src/db.ts which exports the prisma client. This is needed because we will be mocking this file out eventually 
// Mocking, as the name suggests, means mocking the behaviour of a file/class/variable when tests are running.  