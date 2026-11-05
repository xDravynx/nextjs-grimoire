'use server';

import { client } from "@/sanity/client";
import { revalidatePath } from "next/cache";

// Server-side client configured with your write token
const writeClient = client.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false, // Must be false for mutations/writes
});

export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;

  if (!title) {
    throw new Error("Title is required");
  }

  // Generate a clean slug from the title
  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  try {
    await writeClient.create({
      _type: "post",
      title,
      slug: {
        _type: "slug",
        current: slug,
      },
      excerpt,
      publishedAt: new Date().toISOString(),
    });

    // Revalidate the home page so the new post appears immediately
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to create post:", error);
    throw new Error("Failed to create post in Sanity.");
  }
}

export async function deletePostAction(formData: FormData) {
  const postId = formData.get("postId") as string;

  if (!postId) {
    throw new Error("Post ID is required");
  }

  try {
    await writeClient.delete(postId);
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw new Error("Failed to delete post from Sanity.");
  }
}