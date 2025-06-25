"use client";
import { useRef } from "react";

export default function GalleryUploader({ galleryFiles, setGalleryFiles }) {
  const galleryInputRef = useRef(null);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setGalleryFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemove = (index) => {
    const newFiles = [...galleryFiles];
    newFiles.splice(index, 1);
    setGalleryFiles(newFiles);

    if (newFiles.length === 0 && galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block mb-1 font-medium">Galeri Görselleri:</label>
      <div className="flex items-center gap-2 flex-wrap">
        <label className="bg-blue-700 text-white px-4 py-2 rounded cursor-pointer font-semibold">
          Dosyaları Seç
          <input
            type="file"
            ref={galleryInputRef}
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            className="hidden"
          />
        </label>

        {galleryFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {galleryFiles.map((file, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-0 right-0 text-white bg-red-600 rounded-full px-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
