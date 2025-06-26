import imageCompression from "browser-image-compression";

const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
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
  const compressedFiles = await Promise.all(
    files.map((file) => compressImage(file))
  );

  const formData = new FormData();
  compressedFiles.forEach((file) => formData.append("files", file));

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.map((item) => item.id);
};
