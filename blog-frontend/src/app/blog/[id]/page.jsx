import "../../globals.css";
export default async function BlogDetailPage({ params }) {
  const id = params.id;

  const res = await fetch(
    `http://localhost:1337/api/blogposts?filters[documentId][$eq]=${params.id}&populate=*`
  );
  const response = await res.json();

  const post = response.data[0];
  const {
    title,
    description,
    authorName,
    publishDate,
    image,
    content,
    gallery,
  } = post;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6">{title}</h1>

      {image && (
        <img
          src={`http://localhost:1337${image.url}`}
          alt={title}
          className="rounded-lg mb-6 mx-auto"
        />
      )}

      <div className="space-y-4 mb-10">
        {content?.map((block, i) => (
          <p key={i} className="leading-relaxed">
            {block.children.map((child) => child.text).join("")}
          </p>
        ))}
      </div>

      {gallery && gallery.length > 0 && (
        <div className="columns-1 sm:columns-2 gap-4 space-y-4">
          {gallery.map((img, i) => (
            <img
              key={i}
              src={`http://localhost:1337${img.url}`}
              alt={`Galeri görseli ${i + 1}`}
              className="w-full rounded-lg"
            />
          ))}
        </div>
      )}

      <p className="text-bold text-gray-700 text-right mt-10">
        {authorName} - {publishDate}
      </p>
    </main>
  );
}
