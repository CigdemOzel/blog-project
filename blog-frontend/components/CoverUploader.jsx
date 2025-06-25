"use client";
import { useRef } from "react";

export default function CoverUploader({ imageFile, setImageFile }) {
  const imageInputRef = useRef(null);

  return (
    <div>
      <label className="block mb-1 font-medium">Kapak Görseli:</label>
      <div className="flex items-center gap-2">
        <label className="bg-blue-700 text-white px-4 py-2 rounded cursor-pointer font-semibold">
          Dosya Seç
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        {imageFile && (
          <div className="flex items-center gap-1 text-sm">
            <span>{imageFile.name}</span>
            <button
              type="button"
              onClick={() => {
                setImageFile(null);
                if (imageInputRef.current) {
                  imageInputRef.current.value = "";
                }
              }}
              className="text-red-500 font-bold hover:text-red-700"
            >
              ❌
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
