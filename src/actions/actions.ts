"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required")
})

export type State = {
  errors?: {
    title?: string[]
    content?: string[]
  }
  message: string | null
}

const CreatePost = FormSchema.omit({ id: true })
const EditPost = FormSchema.omit({ id: true })

export async function createPost(prevState: State | undefined, formData: FormData) {
  const validatedFields = CreatePost.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields. Failed to create post."
    }
  }

  const { title, content } = validatedFields.data
  const slug = title.replace(/\s+/g, "-").toLowerCase()

  try {
    await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        content: content,
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
          connect: {
            email: "alice@prisma.io"
          }
        }
      }
    })
  } catch (error) {
    return {
      message: "Database error. Failed to create post."
    }
  }

  revalidatePath("/posts")
}

export async function editPost(id: string, prevState: State | undefined, formData: FormData) {
  const validatedFields = EditPost.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields. Failed to update post."
    }
  }

  const { title, content } = validatedFields.data
  const slug = title.replace(/\s+/g, "-").toLowerCase()

  await prisma.post.update({
    where: { id },
    data: {
      title: title,
      slug: slug,
      content: content
    }
  })

  revalidatePath("/posts")
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: { id }
  })

  revalidatePath("/posts")
}
