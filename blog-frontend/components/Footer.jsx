export default function Footer() {
  return (
    <footer id="iletisim" className="bg-gray-950 text-white py-10 mt-10">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-start gap-16">
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-2">Gezdik Gördük Yazdık</h3>
          <p className="text-sm">
            Dünyanın dört bir yanından anılar, hikayeler ve keşifler.
          </p>
        </div>

        <div className="text-left">
          <h3 className="text-lg font-semibold mb-2">İletişim</h3>
          <ul className="text-sm space-y-1">
            <li>📧 cigdemozel@example.com</li>
            <li>📸 @gezencigdem</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs mt-10 text-gray-300">
        © 2025 Çiğdem Özel. Tüm hakları saklıdır.
      </p>
    </footer>
  );
}
