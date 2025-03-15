"use client";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function PostForm() {
  return (
    <form
      className="flex flex-col space-y-2 bg-black text-gray-900 p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const platform = formData.get("platform") as string | null;
        const username = formData.get("username") as string | null;
        const password = formData.get("password") as string | null;
        const email = formData.get("email") as string | null;

        if (email && platform && username && password && isValidEmail(email)) {
          await createPost(email, platform, username, password);
        }
        e.currentTarget.reset();
      }}
    >
      <input type="text" name="platform" placeholder="Platform" required />
      <input type="text" name="username" placeholder="Username" required />
      <input type="email" name="email" placeholder="email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit" className="bg-white text-gray-900">
        Save
      </button>
    </form>
  );
}
async function createPost(
  email: string,
  platform: string,
  username: string,
  password: string
) {
  const queryParams = new URLSearchParams({
    email,
    platform,
    username,
    password,
  }).toString();

  const response = await fetch(`/api/create-post?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}
