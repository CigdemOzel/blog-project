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
    <main>
      <h1>{title}</h1>
      {image && <img src={`http://localhost:1337${image.url}`} />}
      <p>{description}</p>
      {content?.map((block, i) => (
        <p key={i}>{block.children.map((child) => child.text).join("")}</p>
      ))}
      {gallery && gallery.length > 0 && (
        <div>
          {gallery.map((img, i) => (
            <img key={i} src={`http://localhost:1337${img.url}`} />
          ))}
        </div>
      )}
      <p>
        {authorName} - {publishDate}
      </p>
    </main>
  );
}
