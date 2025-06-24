import Link from "next/link";
import "./globals.css";

export default async function HomePage() {
  const res = await fetch("http://localhost:1337/api/blogposts?populate=*");
  const response = await res.json();

  const blogPosts = response.data;

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-1 gap-y-10">
        {blogPosts.map((post) => {
          const { id, title, description, image, publishDate, authorName } =
            post;

          return (
            <div className="max-w-lg mx-auto ">
              <div className="bg-white shadow-md border items-start border-gray-200 rounded-lg max-w-sm mb-5 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/blog/${post.documentId}`} key={post.id}>
                  <div className="rounded-t-lg ">
                    {image && (
                      <img
                        className="rounded-lg"
                        src={`http://localhost:1337${image.url}`}
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                      {title}
                    </h2>
                    <p className="font-normal text-gray-700 mb-3">
                      {description}
                    </p>
                    <div className="flex justify-between items-center text-gray-700 text-sm mt-4">
                      <p className="font-medium">{authorName}</p>
                      <p className="font-medium">{publishDate}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
