import { type NextRequest } from "next/server";
import { createPost } from "app/db";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const password = searchParams.get("password");
  const platform = searchParams.get("platform");
  const email = searchParams.get("email");
  if (!username || !password || !platform || !email) {
    return new Response("Please fill out all fields", { status: 400 });
  }
  createPost(email, password, platform, username);
  return new Response("Post created", { status: 201 });
}
