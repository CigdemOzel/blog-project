export const metadata = {
  title: "Gezi Blog Sayfası",
  description: "Dünyanın dört bir yanından gezi notları",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
