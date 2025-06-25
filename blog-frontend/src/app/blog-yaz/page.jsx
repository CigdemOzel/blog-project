"use client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadSingleFile, uploadMultipleFiles } from "../utils/uploadHelpers";
import CoverUploader from "../../../components/CoverUploader";
import GalleryUploader from "../../../components/GalleryUploader";

export default function BlogYazPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    publishDate: "",
    authorName: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    authorName: "",
  });

  const imageInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const validateField = (name, value) => {
    if (["title", "content", "authorName"].includes(name) && value.length < 3) {
      return "Lütfen en az 3 karakter giriniz";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validateField(name, value);
    if (errorMessage) {
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageId = null;
      if (imageFile) {
        imageId = await uploadSingleFile(imageFile);
      }

      let galleryIds = [];
      if (galleryFiles.length > 0) {
        galleryIds = await uploadMultipleFiles(galleryFiles);
      }

      const payload = {
        ...form,
      };
      if (!form.publishDate) {
        delete payload.publishDate;
      }
      if (imageId) payload.image = imageId;
      if (galleryIds.length > 0) payload.gallery = galleryIds;

      console.log("Gönderilen veri:", payload);

      const blogRes = await fetch("http://localhost:1337/api/blogposts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload }),
      });

      const result = await blogRes.json();

      if (blogRes.ok) {
        toast.success("Blog başarıyla eklendi!");
        router.push("/");
      } else {
        toast.error("Blog eklenirken bir hata oluştu!");
      }
    } catch (err) {
      toast.error("Sunucuya bağlanılamadı!");
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Yeni Blog Yaz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Başlık*"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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
          placeholder="İçerik*"
          value={form.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={5}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content}</p>
        )}
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
          placeholder="Yazar adı*"
          value={form.authorName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.authorName && (
          <p className="text-red-500 text-sm">{errors.authorName}</p>
        )}

        <CoverUploader imageFile={imageFile} setImageFile={setImageFile} />

        <GalleryUploader
          galleryFiles={galleryFiles}
          setGalleryFiles={setGalleryFiles}
        />

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
