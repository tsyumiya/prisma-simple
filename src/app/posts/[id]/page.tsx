import { prisma } from "@/lib/db"
import EditPost from "@/app/components/edit/editForm"
import { notFound } from "next/navigation"
import { cache } from "react"

const getCachedPost = cache(async (id: string) => {
  return await prisma.post.findUnique({
    where: {
      id
    }
  })
})

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  console.log("Post ID:", id)

  const post = await getCachedPost(id)

  // const post = await prisma.post.findUnique({
  //   where: {
  //     id
  //   }
  // })

  console.log("Post:", post)

  if (!post) {
    return notFound()
  }

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      {post && (
        <>
          <h1 className="text-3xl font-bold">{post?.title}</h1>

          <p>{post?.content}</p>

          <EditPost post={{ ...post, content: post?.content ?? "" }} />
        </>
      )}
    </main>
  )
}
