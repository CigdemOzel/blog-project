import Link from "next/link";

export default async function HomePage() {
  const res = await fetch("http://localhost:1337/api/blogposts?populate=*");
  const response = await res.json();

  const blogPosts = response.data;
  return (
    <main className="p-6">
      <h1>Gezi Blogu</h1>
      <div>
        {blogPosts.map((post) => {
          const { id, title, description, image, publishDate, authorName } =
            post;

          return (
            <Link href={`/blog/${post.documentId}`} key={post.id}>
              <div>
                {image && <img src={`http://localhost:1337${image.url}`} />}
                <h2>{title}</h2>
                <p>{description}</p>
                <p>
                  {authorName} - {publishDate}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
