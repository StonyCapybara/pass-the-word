"use client";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function PostForm() {
  return (
    <div className="bg-gray-900 rounded p-4">
      <div className="text-white text-xl font-bold">Save your password</div>
      <form
        className="flex flex-col space-y-2 text-gray-900 p-4 rounded"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const platform = formData.get("platform") as string | null;
          const username = formData.get("username") as string | null;
          const password = formData.get("password") as string | null;
          const email = formData.get("email") as string | null;

          if (
            email &&
            platform &&
            username &&
            password &&
            isValidEmail(email)
          ) {
            await createPost(email, platform, username, password);
          }
          e.currentTarget.reset();
        }}
      >
        <input
          type="text"
          name="platform"
          placeholder="Platform"
          required
          className="bg-gray-800 text-white p-2 rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="bg-gray-800 text-white p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="bg-gray-800 text-white p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="bg-gray-800 text-white p-2 rounded"
        />
        <button type="submit" className="bg-white text-gray-900 p-2 rounded">
          Save
        </button>
      </form>
    </div>
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
