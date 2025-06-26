📝 Blog Platformu – Next.js & Strapi CMS
Merhaba! Bu proje, kullanıcıların blog gönderileri oluşturabildiği ve okuyabildiği bir içerik platformudur. Strapi ile içerik yönetimi, Next.js (App Router) ile frontend ve Tailwind CSS ile modern responsive tasarım bir araya getirilmiştir.

🚀 Kullanılan Teknolojiler
Next.js (App Router)

Tailwind CSS

Strapi CMS (Render üzerinde barındırıldı)

Cloud upload / Media management (Strapi upload API)

Responsive Design

Form Validasyonu ve Toast Bildirimleri

Fotoğraf sıkıştırma (browser-image-compression)

📸 Özellikler
Blog gönderisi oluşturma (başlık, açıklama, içerik, tarih, yazar adı, kapak ve galeri görseli)

SSR ile anasayfada blogları listeleme

Dinamik detay sayfası

Galeri desteği

Gönderim sonrası yönlendirme ve kullanıcı geri bildirimi

Yeni yazılan gönderinin en üstte çıkması

Görsel sıkıştırma ile daha hızlı yükleme

📂 Strapi Yapılandırması
Strapi'de aşağıdaki içerik tipi oluşturulmuştur:

Collection Type: blogpost
title: string (zorunlu)

description: text

content: rich text

publishDate: date

authorName: string

image: media (single)

gallery: media (multiple)

documentId: UID (otomatik eşleştirme için)

Public Role izinleri aktif hale getirilmiştir:
✔️ blogpost: find, findOne, create
✔️ upload: upload

🌐 Canlı Demo
🔗 [Projeyi Görüntüle](https://blog-project-bice-iota.vercel.app/)
