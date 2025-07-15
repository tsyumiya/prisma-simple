import { Post } from "@/lib/definitions"
import { Prisma, PrismaClient } from "../src/generated/prisma/client"

const prisma = new PrismaClient()

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: "Post 1",
    slug: "post-1",
    content: "This is the content of post 1.",
    author: {
      connectOrCreate: {
        where: {
          email: "john@gmail.com"
        },
        create: {
          email: "john@gmail.com",
          hashedPassword: "hashedpassword",
          name: "John Doe"
        }
      }
    }
  }
]

async function main() {
  console.log("Seeding database...")

  for (const post of initialPosts) {
    const createdPost = await prisma.post.create({
      data: post
    })
    console.log(`Created post with ID: ${createdPost.id}`)
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
