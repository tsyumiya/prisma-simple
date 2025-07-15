"use client"

import { createPost, State } from "@/actions/actions"
import { useActionState } from "react"

export default function CreatePost() {
  const initialState: State = { message: null, errors: {} }
  const [state, formAction] = useActionState(createPost, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-y-2 w-[300px] ">
      <input type="text" name="title" placeholder="Title" className="px-2 py-1 rounded-sm bg-white" />
      <textarea name="content" rows={5} placeholder="Content" className="px-2 py-1 rounded-sm bg-white" />
      <button type="submit" className="bg-blue-500 py-2 text-white rounded-sm">
        Create Post
      </button>
    </form>
  )
}
