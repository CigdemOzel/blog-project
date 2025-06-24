"use client";
import { useState } from "react";

export default function BlogYazPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    publishDate: "",
    authorName: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageId = null;
      if (imageFile) {
        const imageForm = new FormData();
        imageForm.append("files", imageFile);

        const res = await fetch("http://localhost:1337/api/upload", {
          method: "POST",
          body: imageForm,
        });
        const imageUploadRes = await res.json();
        imageId = imageUploadRes[0].id;
      }

      let galleryIds = [];
      if (galleryFiles.length > 0) {
        const galleryForm = new FormData();
        galleryFiles.forEach((file) => galleryForm.append("files", file));

        const res = await fetch("http://localhost:1337/api/upload", {
          method: "POST",
          body: galleryForm,
        });
        const galleryUploadRes = await res.json();
        galleryIds = galleryUploadRes.map((item) => item.id);
      }

      const blogRes = await fetch("http://localhost:1337/api/blogposts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            ...form,
            image: imageId,
            gallery: galleryIds,
          },
        }),
      });

      const result = await blogRes.json();
      console.log("Blog eklendi:", result);
      if (blogRes.ok) {
        alert("Blog başarıyla eklendi!");
      } else {
        console.error("Strapi Hatası:", result);
        alert("Bir hata oluştu.");
      }
    } catch (err) {
      console.error("Yükleme Hatası:", err);
      alert("Bir hata oluştu!");
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Yeni Blog Yaz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Başlık"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Açıklama"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content"
          placeholder="İçerik"
          value={form.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={5}
        />
        <input
          type="date"
          name="publishDate"
          value={form.publishDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="authorName"
          placeholder="Yazar adı"
          value={form.authorName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div>
          <label className="block mb-1 font-medium">Kapak Görseli:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Galeri Görselleri:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
          />
        </div>
        <button
          type="submit"
          className="bg-orange-800 text-white px-4 py-2 rounded hover:bg-amber-400 font-bold"
        >
          Gönder
        </button>
      </form>
    </main>
  );
}
