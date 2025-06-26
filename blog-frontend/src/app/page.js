"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function HomePage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogposts`
        );
        const response = await res.json();

        const cleanedData = (response.data || []).filter(
          (post) =>
            post &&
            typeof post === "object" &&
            typeof post.title === "string" &&
            post.title.trim().length > 0
        );

        setBlogPosts(cleanedData);
      } catch (err) {
        console.error("Veri alınırken hata oluştu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="p-6">Yükleniyor...</p>;

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-1 gap-y-10">
        {blogPosts.map((post, i) => {
          const {
            id = i,
            title = "Başlık yok",
            description = "",
            image = null,
            publishDate = "Tarih yok",
            authorName = "Anonim",
            documentId = "",
          } = post;
          console.log("image verisi:", image);

          return (
            <div key={id} className="max-w-lg mx-auto">
              <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/blog/${documentId}`}>
                  <div className="rounded-t-lg">
                    {image && (
                      <img
                        className="rounded-lg"
                        src={
                          typeof image === "string"
                            ? image
                            : `https://strapi-blog-backend-5jzw.onrender.com${image?.url}`
                        }
                        alt={title}
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
