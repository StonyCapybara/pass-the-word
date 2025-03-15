// import { auth, signOut } from "app/auth";
import { getAllPosts } from "../db";
import PostForm from "app/components/postForm";
// import localFont from "next/font/local";

// const titleFont = localFont({
//   src: "../public/fonts/QuineCoco.otf",
//   variable: "--font-cfont",
// });

export default async function SavePassword() {
  // let session = await auth();

  const posts = await getAllPosts();
  //   console.log(posts);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <nav className="w-full border-b-2 border-gray-800 flex justify-between items-center p-4">
        <div></div>
        <div className="text-center w-fit m-auto">
          <h1 className={`text-2xl`}>Pass-The-Word</h1>
        </div>
        {/* <div>
          <SignOut />
        </div> */}
      </nav>
      <div className="w-[350px] mx-auto my-4">
        <PostForm />
      </div>
      <h1 className="text-2xl font-bold text-center">
        Look at all the passwords (for fun)
      </h1>
      <div className="w-[694px] mx-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col space-y-2 bg-gray-800 text-white p-4 rounded-lg shadow-md w-xl mx-auto my-4"
          >
            <div className="flex justify-between items-center py-2">
              <h2 className="text-lg font-semibold w-1/3">{post.platform}</h2>
              <span className="text-sm text-gray-400 w-2/3 text-right">
                {post.email && post.email.length > 30 ? (
                  <span title={post.email}>
                    {post.email.substring(0, 30)}...
                  </span>
                ) : (
                  post.email
                )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm w-1/3">Username:</p>
              <p className="text-sm font-medium w-2/3 text-right">
                {post.username}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm w-1/3">Password:</p>
              <p className="text-sm font-medium w-2/3 text-right">
                {post.password}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// function SignOut() {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         // await signOut();
//       }}
//     >
//       <button type="submit">Sign out</button>
//     </form>
//   );
// }
