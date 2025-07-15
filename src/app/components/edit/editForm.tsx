"use client"

import { Prisma } from "@/generated/prisma/client"
import { editPost, State } from "@/actions/actions"
import { Post } from "@/lib/definitions"
import { useActionState } from "react"

export default function EditPost({ post }: { post: Post }) {
  const initialState: State = { message: null, errors: {} }
  const updatedPostWithId = editPost.bind(null, post.id)
  const [state, formAction] = useActionState(updatedPostWithId, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-y-2 w-[300px] ">
      <input type="text" name="title" placeholder="Title" className="px-2 py-1 rounded-sm bg-white" />
      <textarea name="content" rows={5} placeholder="Content" className="px-2 py-1 rounded-sm bg-white" />
      <button type="submit" className="bg-blue-500 py-2 text-white rounded-sm">
        Edit Post
      </button>
    </form>
  )
}
