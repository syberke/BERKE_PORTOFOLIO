# Mengganti Foto Orang & Spider-Man

Kedua gambar di hero sudah terpisah dari kode animasi. **Tidak perlu mengedit komponen React**.

1. Simpan foto orang kamu di `public/images/`. Gunakan PNG atau WebP transparan (tanpa background), portrait dengan framing kepala sampai badan.
2. Simpan gambar kostum Spider-Man di folder yang sama. Pilih gambar dengan pose, crop, dan rasio yang mirip supaya nanobot berpindah secara mulus.
3. Buka `app/portfolio-media.js` dan ganti `person` dan `spider` dengan nama file masing-masing (contoh `/images/aku.webp` dan `/images/spider.webp`).
4. Jalankan `npm run dev`. Section **About** otomatis memakai gambar `person` yang sama.

**File bawaan:** `creative-portrait.svg` adalah ilustrasi karakter, `spider-suit.svg` adalah suit SVG. Keduanya bisa diganti dengan PNG/WebP/JPG/JPEG; untuk tampilan paling bagus, gunakan transparansi dan komposisi serupa. Tidak perlu mengubah CSS mask atau kode nanobot.

## Cursor dan scroll

- Cursor adalah titik bulat glowing dengan cincin spring-follow, **bukan kepala Spider-Man**.
- Nanobot aktif **hanya dalam radius kecil dekat cursor** dan menghilang saat keluar.
- Animasi reveal di About/Project/Skill/Journey/Contact hanya berjalan saat masuk viewport pertama kali, kemudian konten tetap terlihat meskipun kamu berhenti atau scroll balik.
- Transisi hero keluar tetap mengikuti progres scroll secara halus; tidak mengubah perilaku section di bawahnya.

## QA

Uji pointer, touch, keyboard, reduced motion, serta light/dark mode. Jalankan `npm ci && npm run lint && npm run build` di environment dengan dependensi Next.js tersedia.
