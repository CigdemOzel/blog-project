export const uploadSingleFile = async (file) => {
  const formData = new FormData();
  formData.append("files", file);

  const res = await fetch("http://localhost:1337/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data[0]?.id || null;
};

export const uploadMultipleFiles = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await fetch("http://localhost:1337/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.map((item) => item.id);
};
