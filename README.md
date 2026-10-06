# Undangan Pernikahan Digital — M. Arshiel, A.ma & Liza Afriani

Undangan pernikahan digital bergaya editorial premium, dibangun dengan React, TypeScript, dan Tailwind CSS.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka URL yang muncul di terminal (biasanya `http://localhost:5173`).

## Mengganti data undangan

Edit satu file saja: `src/data/weddingData.ts`

Di sana Anda bisa mengubah:
- Nama pasangan & orang tua
- Tanggal & waktu acara
- Venue & alamat
- URL / embed Google Maps
- Foto galeri
- Rekening hadiah pernikahan
- URL musik latar
- Teks sambutan, kisah, konfirmasi kehadiran, dll.

## Musik

Ganti `music.src` di `weddingData.ts` dengan file lokal, misalnya:

1. Letakkan file di `public/music/wedding.mp3`
2. Set `src: '/music/wedding.mp3'`

Musik mulai setelah tamu menekan **Buka Undangan**.

## Build produksi

```bash
npm run build
npm run preview
```
