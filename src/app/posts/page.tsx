import { prisma } from "@/lib/db"
import Link from "next/link"
import CreatePost from "../components/create/page"

// interface Post {
//   id: string
//   title: string
//   slug: string
//   content: string
//   published?: boolean | null
//   updatedAt: Date
//   createdAt: Date
// }

export default async function Posts() {
  const posts = await prisma.post.findMany({
    where: {},
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      title: true,
      slug: true,
      author: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    }
  })

  const postsCount = await prisma.post.count()

  console.log("Posts:", posts)

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-bold">Posts ({postsCount})</h1>
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {posts.map(post => (
          <li key={post.id} className="py-2">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <CreatePost />
    </main>
  )
}
