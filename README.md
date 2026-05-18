# Playwright Test Automation

Sebuah proyek otomatisasi pengujian end-to-end menggunakan Playwright untuk memverifikasi fungsionalitas aplikasi web, termasuk autentikasi, belanja, dan checkout.

## Key Features

- Otomatisasi login dan pendaftaran pengguna
- Pengujian alur belanja ke keranjang dan checkout
- Dukungan environment dengan dan tanpa autentikasi
- Laporan hasil tes otomatis menggunakan Playwright

## Tech Stack

- Node.js
- Playwright
- TypeScript
- npm

## Prerequisites & Setup

1. Pastikan Node.js sudah terinstall.
2. Buka terminal di folder proyek.
3. Jalankan:

```bash
npm install
```

4. Jika menggunakan file konfigurasi lokal atau kredensial, simpan file tersebut di luar repositori atau pastikan sudah ditambahkan ke `.gitignore`.

## Cara Menjalankan Tes (Running Tests)

Jalankan semua tes:

```bash
npm test
```

Jalankan tes tanpa autentikasi:

```bash
npm run test:auth
```

Jalankan tes dengan autentikasi:

```bash
npm run test:loggedin
```

Jalankan tes dalam mode headed (terlihat):

```bash
npm run test:headed
```

Tampilkan laporan Playwright:

```bash
npm run test:report
```

Jika diperlukan, jalankan sesi khusus:

```bash
npm run session
```
