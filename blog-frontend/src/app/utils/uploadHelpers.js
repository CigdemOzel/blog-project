import imageCompression from "browser-image-compression";

const compressImage = async (file) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Görsel sıkıştırılamadı, orijinali kullanılacak:", error);
    return file;
  }
};

export const uploadSingleFile = async (file) => {
  const compressedFile = await compressImage(file);

  const formData = new FormData();
  formData.append("files", compressedFile);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data[0]?.id || null;
};

export const uploadMultipleFiles = async (files) => {
  const formData = new FormData();

  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  for (const file of files) {
    console.log("Orijinal boyut:", file.size);
    const compressed = await imageCompression(file, options);
    console.log("Sıkıştırılmış boyut:", compressed.size);
    formData.append("files", compressed);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.map((item) => item.id);
};
