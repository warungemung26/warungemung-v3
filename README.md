# warungemung-v3
# Warung Emung v3.2 — 3D Interaktif

Versi 3.2 dari Warung Emung:
- Karakter 3D low-poly “Mbak Neng” di kanan
- Menu interaktif, TTS lembut, bubble chat
- Notifikasi kotak kayu pojok kanan bawah saat klik menu
- Mobile friendly, siap deploy GitHub Pages

## Cara Deploy
1. Clone repo
2. Pastikan `assets/models/neng.glb` dan `assets/images/neng-fallback.png` ada
3. Push ke GitHub → aktifkan GitHub Pages
4. Web siap digunakan

## Struktur
- `index.html` → halaman utama
- `css/` → style + toast
- `js/` → logic menu, TTS, avatar 3D
- `data/` → menu.json
- `assets/` → model 3D, fallback image, sounds
