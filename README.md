Cerita Tentang Website ini dan segala strugglenya hehe

# **PROBLEM MISI 1 & 2 AND SOLVE **
## Main Promblem #1 
Aku ga masuk leaderboard misi 1, dan ketika aku analisis kesalahan aku, aku nemuin beberapa kesalahan, diantaranya:
1. Di misi pertama, website aku pakai js untuk bagian "kumpulan doa" padahal di ketentuannya cuman boleh pakai html dan css. 
2. Website aku detail dan interaktif dan sebenernya ga masalah, tapi.. kodenya tembus 1000+ line di dalam 1 file css. dan itu yang bikin ga rapih meskipun udah dipisahin pakai notes. 
3. js ga punya notes per sectionnya, bikin bingung juri ataupun audies yang mau liat kodenya. 
4. misi 1 dan 2 dijadiin 1 file yang sama. 
5. Tombol X di modal doa ga bisa di klik

## Solving #1 
1. hilangkan kode js untuk fitur doa, ganti ke css (walaupun harus ganti layout) 
2. breakdown keseluruhan kodenya jadi component - component file yang kecil sesuai fiturnya, nanti tinggal di satuin di file homepage. 
3. pisahin js untuk setiap misi 
4. karena ini konsepnya landing page, pisahin setiap component/section setiap misi, misal: misi 1 - header, kumpulan doa, doa model, dst. dan taro file landing page dibagian luar project structure (biar ga masuk ke folder misi apa apa) dan nanti tinggal panggil elemennya
5. Masalahnya: file doa.js load sebelum HTML modal (#modalClose) ada di DOM, jadi IIFE nya dapat null dan listener tidak ke bind. Jadi, ganti bagian `document.addEventListener('click', ...)`

+ Buat README.md untuk kaish cetatan aku di challange ini, dari problem hingga solvingnya

*Tapi solvingnya ga segampang itu, aku nemuin beberapa masalah lagi.*
1. Karena dari awal semua kodenya aku jadiin 1, jadi agak susah buat modularisasiinnya menjadi part part kecil. Dan jadinya aku harus debugging masalah yang keliatannya sepela tapi lumayan makan waktu, contohnya: pas section css pindah dari file universal ke modular ida ga mau responsive. dan akhirnya dia bisa setelah aku setting ulang ukuran responsivenya
2. Fitur kayak card kadang ga ke load karena crash sama server 
3. Button hitung dzikir tidak berfungsi karena script dijalankan sebelum component zikir dimuat ke DOM, karena sistem menggunakan modular component + dynamic load.
#### ⚠️ Akibatnya:
```document.querySelectorAll('.zikir-card')```
mengembalikan empty NodeList →
event listener tidak pernah terpasang.

#### 💊 Solusinya:
Membungkus seluruh logic dzikir dalam function:
```window.initZikirSection = function() { ... }```
Dan memanggilnya setelah component selesai dimuat:
`loadComponent(...).then(() => {
  initZikirSection();
})`

walaupun pusing karena harus pisahin filenya satu - satu, tapi aku seneng jadinya gampang untuk di maintance dan ga pusing kalo mislanya ada debug. :D 

# **PROBLEM MISI 3 AND SOLVE **
## Main Promblem #1 
1. Hasil Zakat yang harus dibayarkan ga akurat
2. wrapper buat select zakat ga bisa switch color, karena ngikutin settingan theme. 
3. Language Todo-List List ga aktif, karena state nya numpuk di todo.js dan script js (global)

## How i solve
1. Gernyata ada kesalahan di rumusnya (typo) yang harusnya pakai tanda * untuk bagi harga emas dengan 85 malah pakai ^ (sampe mau juling mata, gara gara nyari errornya) & ga boleh pakai titik.
2. akhirnya di akalin nambahin inline css di html nya
3. Masukin semua data language ke global js. biar arahnya jelas dan testruktur. jadi sekarang website cuma punya 1 source i18n. dan hapus lang di local js todo dan ganti T() biar baca dari i18n global aja.

todo.js sekarang cuma "consume" text dari:
i18n[currentLang].todo

#### 🤔 Why?:
kenapa gini?
biar:
- language switch global langsung affect semua page
- code ga double i18n system
- maintain lebih gampang

kalau mau nambah settingan lang baru:
tinggal edit di global.js bagian lang.

jangan bikin LANG baru di internal lagi
nanti jadi duplicate system lagi