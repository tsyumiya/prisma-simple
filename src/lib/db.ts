// lib/prisma.ts
import { PrismaClient } from "../generated/prisma/client"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma = globalForPrisma.prisma || new PrismaClient()

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma
