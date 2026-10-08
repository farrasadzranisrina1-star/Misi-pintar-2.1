import { Level, MaterialCard } from '../types/game';

export const GAME_LEVELS: Level[] = [
  {
    id: 1,
    number: 1,
    title: 'Kenali dan Temukan',
    subtitle: 'Mengenal bilangan prima, pohon faktor, dan faktorisasi prima dasar!',
    badgeName: 'Penjelajah Prima',
    badgeIcon: '🏅',
    badgeDescription: 'Diberikan kepada siswa cerdas yang menguasai konsep dasar bilangan & faktor prima!',
    colorTheme: {
      primary: 'bg-emerald-500 hover:bg-emerald-600',
      border: 'border-emerald-500',
      bg: 'bg-emerald-50',
      light: 'bg-emerald-100 text-emerald-800',
    },
    questions: [
      {
        id: 101,
        title: 'Mengenal Urutan Bilangan Prima',
        instruction: 'Seret angka bilangan prima di kiri ke pertanyaan yang tepat di kanan!',
        contextNarrative: 'Ingat: Bilangan prima hanya bisa dibagi oleh angka 1 dan dirinya sendiri (2, 3, 5, 7, 11, ...).',
        items: [
          { id: 'prima_5', label: '5', icon: '🔢' },
          { id: 'prima_2', label: '2', icon: '🔢' },
          { id: 'prima_7', label: '7', icon: '🔢' },
        ],
        targets: [
          { id: 'target_101_a', label: 'Bilangan prima terkecil (dan satu-satunya yang genap)', category: 'prima_2', icon: '✨' },
          { id: 'target_101_b', label: 'Bilangan prima yang terletak di antara 3 dan 6', category: 'prima_5', icon: '🌟' },
          { id: 'target_101_c', label: 'Bilangan prima yang terletak di antara 6 dan 10', category: 'prima_7', icon: '🎯' },
        ],
        correctMatches: {
          target_101_a: 'prima_2',
          target_101_b: 'prima_5',
          target_101_c: 'prima_7',
        },
        explanation:
          'Urutan bilangan prima dari yang paling kecil adalah 2, 3, 5, 7, 11:\n• Bilangan prima paling kecil dan genap = 2\n• Bilangan prima di antara 3 dan 6 = 5\n• Bilangan prima di antara 6 dan 10 = 7',
      },
      {
        id: 102,
        title: 'Berlatih Membagi pada Pohon Faktor',
        instruction: 'Hitunglah hasil pembagian bilangan di kanan lalu tarik jawaban yang sesuai!',
        contextNarrative: 'Saat membuat pohon faktor, kita membagi angka dengan bilangan prima 2.',
        items: [
          { id: 'bagi_5', label: '5', icon: '🍃' },
          { id: 'bagi_3', label: '3', icon: '🍃' },
          { id: 'bagi_7', label: '7', icon: '🍃' },
        ],
        targets: [
          { id: 'target_102_a', label: 'Hasil pembagian dari 6 ÷ 2', category: 'bagi_3', icon: '🌳' },
          { id: 'target_102_b', label: 'Hasil pembagian dari 10 ÷ 2', category: 'bagi_5', icon: '🌳' },
          { id: 'target_102_c', label: 'Hasil pembagian dari 14 ÷ 2', category: 'bagi_7', icon: '🌳' },
        ],
        correctMatches: {
          target_102_a: 'bagi_3',
          target_102_b: 'bagi_5',
          target_102_c: 'bagi_7',
        },
        explanation:
          'Cara menghitung cabang pohon faktor:\n• 6 dibagi 2 hasilnya = 3\n• 10 dibagi 2 hasilnya = 5\n• 14 dibagi 2 hasilnya = 7',
      },
      {
        id: 103,
        title: 'Perkalian Faktor Prima Sederhana',
        instruction: 'Pasangkan setiap angka di kanan dengan perkalian faktor primanya!',
        contextNarrative: 'Kalikan angka-angka prima pada kartu di kiri untuk menemukan hasilnya.',
        items: [
          { id: 'fakt_10', label: '2 × 5', icon: '✏️' },
          { id: 'fakt_6', label: '2 × 3', icon: '✏️' },
          { id: 'fakt_15', label: '3 × 5', icon: '✏️' },
        ],
        targets: [
          { id: 'target_103_a', label: 'Faktorisasi prima dari bilangan 6', category: 'fakt_6', icon: '📘' },
          { id: 'target_103_b', label: 'Faktorisasi prima dari bilangan 10', category: 'fakt_10', icon: '📗' },
          { id: 'target_103_c', label: 'Faktorisasi prima dari bilangan 15', category: 'fakt_15', icon: '📙' },
        ],
        correctMatches: {
          target_103_a: 'fakt_6',
          target_103_b: 'fakt_10',
          target_103_c: 'fakt_15',
        },
        explanation:
          'Kita cukup mengalikan bilangan primanya:\n• Bilangan 6 = 2 × 3\n• Bilangan 10 = 2 × 5\n• Bilangan 15 = 3 × 5',
      },
      {
        id: 104,
        title: 'Menghitung Bilangan Berpangkat Dua',
        instruction: 'Hitunglah hasil dari bilangan berpangkat dua di sebelah kanan!',
        contextNarrative: 'Ingat: Pangkat 2 artinya angka tersebut dikalikan dengan dirinya sendiri.',
        items: [
          { id: 'pangkat_9', label: '9', icon: '⭐' },
          { id: 'pangkat_4', label: '4', icon: '⭐' },
          { id: 'pangkat_25', label: '25', icon: '⭐' },
        ],
        targets: [
          { id: 'target_104_a', label: 'Hasil dari 2² (yaitu 2 × 2)', category: 'pangkat_4', icon: '🧮' },
          { id: 'target_104_b', label: 'Hasil dari 3² (yaitu 3 × 3)', category: 'pangkat_9', icon: '🧮' },
          { id: 'target_104_c', label: 'Hasil dari 5² (yaitu 5 × 5)', category: 'pangkat_25', icon: '🧮' },
        ],
        correctMatches: {
          target_104_a: 'pangkat_4',
          target_104_b: 'pangkat_9',
          target_104_c: 'pangkat_25',
        },
        explanation:
          'Cara menghitung pangkat dua:\n• 2² artinya 2 × 2 = 4\n• 3² artinya 3 × 3 = 9\n• 5² artinya 5 × 5 = 25',
      },
      {
        id: 105,
        title: 'Faktorisasi Prima Berpangkat',
        instruction: 'Pasangkan bilangan di kanan dengan bentuk faktorisasi primanya!',
        contextNarrative: 'Petunjuk: Ingat bahwa 2² = 4, lalu kalikan dengan angka di sebelahnya.',
        items: [
          { id: 'fp_12', label: '2² × 3', icon: '📐' },
          { id: 'fp_8', label: '2³', icon: '📐' },
          { id: 'fp_20', label: '2² × 5', icon: '📐' },
        ],
        targets: [
          { id: 'target_105_a', label: 'Faktorisasi prima dari bilangan 8', category: 'fp_8', icon: '🎯' },
          { id: 'target_105_b', label: 'Faktorisasi prima dari bilangan 12', category: 'fp_12', icon: '🎯' },
          { id: 'target_105_c', label: 'Faktorisasi prima dari bilangan 20', category: 'fp_20', icon: '🎯' },
        ],
        correctMatches: {
          target_105_a: 'fp_8',
          target_105_b: 'fp_12',
          target_105_c: 'fp_20',
        },
        explanation:
          'Cara menghitung nilai faktorisasi prima:\n• Bilangan 8 = 2 × 2 × 2 = 2³\n• Bilangan 12 = 4 × 3 = 2² × 3\n• Bilangan 20 = 4 × 5 = 2² × 5',
      },
    ],
  },
  {
    id: 2,
    number: 2,
    title: 'Ayo Pecahkan!',
    subtitle: 'Menghitung nilai FPB dan KPK dengan angka yang mudah!',
    badgeName: 'Pakar KPK & FPB',
    badgeIcon: '🏅',
    badgeDescription: 'Diberikan kepada siswa yang mahir menghitung nilai FPB dan KPK dengan faktor prima!',
    colorTheme: {
      primary: 'bg-amber-500 hover:bg-amber-600',
      border: 'border-amber-500',
      bg: 'bg-amber-50',
      light: 'bg-amber-100 text-amber-800',
    },
    questions: [
      {
        id: 201,
        title: 'Mencari Faktor Prima yang Sama',
        instruction: 'Temukan angka prima yang SAMA-SAMA bisa membagi kedua bilangan di kanan!',
        contextNarrative: 'Langkah awal mencari FPB adalah menemukan faktor prima yang sama.',
        items: [
          { id: 'sama_3', label: '3', icon: '🔍' },
          { id: 'sama_2', label: '2', icon: '🔍' },
          { id: 'sama_5', label: '5', icon: '🔍' },
        ],
        targets: [
          { id: 'target_201_a', label: 'Faktor prima yang sama dari 4 dan 6', category: 'sama_2', icon: '🛡️' },
          { id: 'target_201_b', label: 'Faktor prima yang sama dari 6 dan 9', category: 'sama_3', icon: '🛡️' },
          { id: 'target_201_c', label: 'Faktor prima yang sama dari 10 dan 15', category: 'sama_5', icon: '🛡️' },
        ],
        correctMatches: {
          target_201_a: 'sama_2',
          target_201_b: 'sama_3',
          target_201_c: 'sama_5',
        },
        explanation:
          'Cara mencari faktor prima yang sama:\n• 4 dan 6 sama-sama habis dibagi bilangan prima 2.\n• 6 dan 9 sama-sama habis dibagi bilangan prima 3.\n• 10 dan 15 sama-sama habis dibagi bilangan prima 5.',
      },
      {
        id: 202,
        title: 'Menghitung FPB Sederhana (Bagian 1)',
        instruction: 'Hitunglah nilai FPB dari pasangan bilangan di sebelah kanan!',
        contextNarrative: 'Cara cepat FPB: Cari faktor prima yang SAMA dengan pangkat TERKECIL.',
        items: [
          { id: 'fpb_4', label: '4', icon: '🛡️' },
          { id: 'fpb_2', label: '2', icon: '🛡️' },
          { id: 'fpb_6', label: '6', icon: '🛡️' },
        ],
        targets: [
          { id: 'target_202_a', label: 'Nilai FPB dari 2 dan 6', category: 'fpb_2', icon: '📘' },
          { id: 'target_202_b', label: 'Nilai FPB dari 4 dan 8', category: 'fpb_4', icon: '📗' },
          { id: 'target_202_c', label: 'Nilai FPB dari 6 dan 12', category: 'fpb_6', icon: '📙' },
        ],
        correctMatches: {
          target_202_a: 'fpb_2',
          target_202_b: 'fpb_4',
          target_202_c: 'fpb_6',
        },
        explanation:
          'Hasil perhitungan FPB:\n• FPB dari 2 dan 6 = 2 (karena 2 dan 6 sama-sama habis dibagi 2)\n• FPB dari 4 (2²) dan 8 (2³) = 2² = 4\n• FPB dari 6 (2×3) dan 12 (2²×3) = 2 × 3 = 6',
      },
      {
        id: 203,
        title: 'Menghitung FPB Sederhana (Bagian 2)',
        instruction: 'Hitunglah nilai FPB dari setiap pasangan bilangan berikut!',
        contextNarrative: 'Ambil faktor prima yang sama-sama dimiliki kedua bilangan.',
        items: [
          { id: 'fpb_5', label: '5', icon: '🎯' },
          { id: 'fpb_3', label: '3', icon: '🎯' },
          { id: 'fpb_10', label: '10', icon: '🎯' },
        ],
        targets: [
          { id: 'target_203_a', label: 'Nilai FPB dari 9 dan 12', category: 'fpb_3', icon: '✨' },
          { id: 'target_203_b', label: 'Nilai FPB dari 10 dan 15', category: 'fpb_5', icon: '✨' },
          { id: 'target_203_c', label: 'Nilai FPB dari 10 dan 20', category: 'fpb_10', icon: '✨' },
        ],
        correctMatches: {
          target_203_a: 'fpb_3',
          target_203_b: 'fpb_5',
          target_203_c: 'fpb_10',
        },
        explanation:
          'Hasil perhitungan FPB:\n• 9 (3²) dan 12 (2²×3) → Faktor yang sama adalah 3, maka FPB = 3.\n• 10 (2×5) dan 15 (3×5) → Faktor yang sama adalah 5, maka FPB = 5.\n• 10 (2×5) dan 20 (2²×5) → Faktor yang sama adalah 2 × 5 = 10.',
      },
      {
        id: 204,
        title: 'Menghitung KPK Sederhana (Bagian 1)',
        instruction: 'Hitunglah nilai KPK dari pasangan bilangan prima di sebelah kanan!',
        contextNarrative: 'Cara cepat KPK: Kalikan SEMUA faktor prima yang ada.',
        items: [
          { id: 'kpk_10', label: '10', icon: '🚀' },
          { id: 'kpk_6', label: '6', icon: '🚀' },
          { id: 'kpk_15', label: '15', icon: '🚀' },
        ],
        targets: [
          { id: 'target_204_a', label: 'Nilai KPK dari 2 dan 3', category: 'kpk_6', icon: '🌟' },
          { id: 'target_204_b', label: 'Nilai KPK dari 2 dan 5', category: 'kpk_10', icon: '🌟' },
          { id: 'target_204_c', label: 'Nilai KPK dari 3 dan 5', category: 'kpk_15', icon: '🌟' },
        ],
        correctMatches: {
          target_204_a: 'kpk_6',
          target_204_b: 'kpk_10',
          target_204_c: 'kpk_15',
        },
        explanation:
          'Karena kedua angkanya sudah bilangan prima, mencari KPK cukup dikalikan langsung:\n• KPK dari 2 dan 3 = 2 × 3 = 6\n• KPK dari 2 dan 5 = 2 × 5 = 10\n• KPK dari 3 dan 5 = 3 × 5 = 15',
      },
      {
        id: 205,
        title: 'Menghitung KPK Sederhana (Bagian 2)',
        instruction: 'Hitunglah nilai KPK dari setiap pasangan bilangan berikut!',
        contextNarrative: 'Kalikan semua faktor prima, dan jika ada yang sama pilih pangkat TERBESAR.',
        items: [
          { id: 'kpk_12', label: '12', icon: '🏆' },
          { id: 'kpk_8', label: '8', icon: '🏆' },
          { id: 'kpk_20', label: '20', icon: '🏆' },
        ],
        targets: [
          { id: 'target_205_a', label: 'Nilai KPK dari 2 dan 8', category: 'kpk_8', icon: '📈' },
          { id: 'target_205_b', label: 'Nilai KPK dari 4 dan 6', category: 'kpk_12', icon: '📈' },
          { id: 'target_205_c', label: 'Nilai KPK dari 4 dan 10', category: 'kpk_20', icon: '📈' },
        ],
        correctMatches: {
          target_205_a: 'kpk_8',
          target_205_b: 'kpk_12',
          target_205_c: 'kpk_20',
        },
        explanation:
          'Hasil perhitungan KPK:\n• KPK dari 2 dan 8 (2³) → Ambil pangkat terbesar yaitu 2³ = 8.\n• KPK dari 4 (2²) dan 6 (2×3) → 2² × 3 = 4 × 3 = 12.\n• KPK dari 4 (2²) dan 10 (2×5) → 2² × 5 = 4 × 5 = 20.',
      },
    ],
  },
  {
    id: 3,
    number: 3,
    title: 'Misi Tantangan',
    subtitle: 'Tahap Puncak: Pecahkan soal cerita sehari-hari menggunakan FPB dan KPK!',
    badgeName: 'Juara Misi Pintar',
    badgeIcon: '🏆',
    badgeDescription: 'Piala kehormatan tertinggi bagi siswa SD yang menaklukkan seluruh soal cerita KPK & FPB!',
    colorTheme: {
      primary: 'bg-indigo-600 hover:bg-indigo-700',
      border: 'border-indigo-600',
      bg: 'bg-indigo-50',
      light: 'bg-indigo-100 text-indigo-900',
    },
    questions: [
      {
        id: 301,
        title: 'Misi Membagi Kue & Buah Sama Banyak (FPB)',
        instruction: 'Hitunglah berapa wadah paling banyak yang dibutuhkan pada setiap cerita!',
        contextNarrative: 'Tips: Soal membagi barang sama banyak diselesaikan dengan mencari nilai FPB.',
        items: [
          { id: 'wadah_3', label: '3', icon: '🎁' },
          { id: 'wadah_2', label: '2', icon: '🎁' },
          { id: 'wadah_5', label: '5', icon: '🎁' },
        ],
        targets: [
          { id: 'target_301_a', label: 'Membagi 4 apel dan 6 jeruk sama banyak ke dalam piring', category: 'wadah_2', icon: '🍎' },
          { id: 'target_301_b', label: 'Membagi 6 kue dan 9 permen sama banyak ke dalam kotak', category: 'wadah_3', icon: '🍬' },
          { id: 'target_301_c', label: 'Membagi 10 pensil dan 15 buku sama banyak ke dalam tas', category: 'wadah_5', icon: '🎒' },
        ],
        correctMatches: {
          target_301_a: 'wadah_2',
          target_301_b: 'wadah_3',
          target_301_c: 'wadah_5',
        },
        explanation:
          'Kita mencari FPB dari kedua angka pada cerita:\n• 4 apel dan 6 jeruk → FPB dari 4 dan 6 adalah 2.\n• 6 kue dan 9 permen → FPB dari 6 dan 9 adalah 3.\n• 10 pensil dan 15 buku → FPB dari 10 dan 15 adalah 5.',
      },
      {
        id: 302,
        title: 'Misi Lampu Hias Menyala Bersamaan (KPK)',
        instruction: 'Hitunglah setiap berapa detik kedua lampu akan menyala bersamaan lagi!',
        contextNarrative: 'Tips: Soal kejadian berulang bersamaan diselesaikan dengan mencari nilai KPK.',
        items: [
          { id: 'detik_12', label: '12', icon: '⏱️' },
          { id: 'detik_6', label: '6', icon: '⏱️' },
          { id: 'detik_15', label: '15', icon: '⏱️' },
        ],
        targets: [
          { id: 'target_302_a', label: 'Lampu merah tiap 2 detik dan lampu biru tiap 3 detik', category: 'detik_6', icon: '🚦' },
          { id: 'target_302_b', label: 'Lampu kuning tiap 3 detik dan lampu hijau tiap 4 detik', category: 'detik_12', icon: '🚦' },
          { id: 'target_302_c', label: 'Lampu taman tiap 3 detik dan lampu teras tiap 5 detik', category: 'detik_15', icon: '🚦' },
        ],
        correctMatches: {
          target_302_a: 'detik_6',
          target_302_b: 'detik_12',
          target_302_c: 'detik_15',
        },
        explanation:
          'Kita mencari KPK dari waktu kedua lampu:\n• 2 detik dan 3 detik → KPK dari 2 dan 3 adalah 6.\n• 3 detik dan 4 detik → KPK dari 3 dan 4 adalah 12.\n• 3 detik dan 5 detik → KPK dari 3 dan 5 adalah 15.',
      },
      {
        id: 303,
        title: 'Misi Jadwal Olahraga Bersama (KPK)',
        instruction: 'Hitung setiap berapa hari sekali kedua sahabat akan berolahraga bersama lagi!',
        contextNarrative: 'Carilah nilai KPK dari jadwal hari kedua anak pada setiap cerita.',
        items: [
          { id: 'hari_10', label: '10', icon: '📅' },
          { id: 'hari_8', label: '8', icon: '📅' },
          { id: 'hari_12', label: '12', icon: '📅' },
        ],
        targets: [
          { id: 'target_303_a', label: 'Andi lari tiap 2 hari dan Budi lari tiap 8 hari', category: 'hari_8', icon: '🏃' },
          { id: 'target_303_b', label: 'Siti renang tiap 2 hari dan Lani renang tiap 5 hari', category: 'hari_10', icon: '🏊' },
          { id: 'target_303_c', label: 'Edo senam tiap 4 hari dan Beni senam tiap 6 hari', category: 'hari_12', icon: '🤸' },
        ],
        correctMatches: {
          target_303_a: 'hari_8',
          target_303_b: 'hari_10',
          target_303_c: 'hari_12',
        },
        explanation:
          'Kita menghitung nilai KPK dari jadwal mereka:\n• 2 hari dan 8 hari → KPK dari 2 dan 8 adalah 8.\n• 2 hari dan 5 hari → KPK dari 2 dan 5 adalah 10.\n• 4 hari dan 6 hari → KPK dari 4 dan 6 adalah 12.',
      },
      {
        id: 304,
        title: 'Misi Memotong Pita Sama Panjang (FPB)',
        instruction: 'Hitung ukuran potongan paling panjang (cm) agar kedua pita terbagi sama rata!',
        contextNarrative: 'Memotong dua benda menjadi ukuran sama panjang terbesar menggunakan FPB.',
        items: [
          { id: 'pita_6', label: '6', icon: '✂️' },
          { id: 'pita_4', label: '4', icon: '✂️' },
          { id: 'pita_8', label: '8', icon: '✂️' },
        ],
        targets: [
          { id: 'target_304_a', label: 'Pita merah 4 cm dan pita biru 12 cm dipotong sama panjang', category: 'pita_4', icon: '🎀' },
          { id: 'target_304_b', label: 'Pita kuning 6 cm dan pita hijau 18 cm dipotong sama panjang', category: 'pita_6', icon: '🎀' },
          { id: 'target_304_c', label: 'Tali pramuka 8 cm dan tali rafia 16 cm dipotong sama panjang', category: 'pita_8', icon: '🧶' },
        ],
        correctMatches: {
          target_304_a: 'pita_4',
          target_304_b: 'pita_6',
          target_304_c: 'pita_8',
        },
        explanation:
          'Kita mencari nilai FPB dari panjang kedua pita:\n• 4 cm dan 12 cm → FPB dari 4 dan 12 adalah 4.\n• 6 cm dan 18 cm → FPB dari 6 dan 18 adalah 6.\n• 8 cm dan 16 cm → FPB dari 8 dan 16 adalah 8.',
      },
      {
        id: 305,
        title: 'Tantangan Puncak: FPB & KPK Kehidupan Nyata',
        instruction: 'Hitung hasil akhir dari ketiga soal cerita di sebelah kanan!',
        contextNarrative: 'Ingat: Membagi sama banyak = cari FPB. Kejadian bersama lagi = cari KPK.',
        items: [
          { id: 'mix_9', label: '9', icon: '🏆' },
          { id: 'mix_4', label: '4', icon: '🏆' },
          { id: 'mix_14', label: '14', icon: '🏆' },
        ],
        targets: [
          { id: 'target_305_a', label: 'Banyak piring untuk membagi 8 kue dan 12 permen sama rata', category: 'mix_4', icon: '🍽️' },
          { id: 'target_305_b', label: 'Menit ke berapa lonceng 3 menit dan 9 menit berbunyi bersama', category: 'mix_9', icon: '🔔' },
          { id: 'target_305_c', label: 'Hari ke berapa Riko (tiap 2 hari) dan Dafa (tiap 7 hari) les bersama', category: 'mix_14', icon: '📚' },
        ],
        correctMatches: {
          target_305_a: 'mix_4',
          target_305_b: 'mix_9',
          target_305_c: 'mix_14',
        },
        explanation:
          'Mari kita hitung satu per satu:\n• Membagi 8 kue dan 12 permen (FPB dari 8 dan 12) = 4.\n• Lonceng tiap 3 menit dan 9 menit (KPK dari 3 dan 9) = 9.\n• Les tiap 2 hari dan 7 hari (KPK dari 2 dan 7) = 14.',
      },
    ],
  },
];

export const LEARNING_MATERIALS: MaterialCard[] = [
  {
    id: 'mat_1',
    title: 'Bilangan Prima',
    category: 'Halaman 1 • Mengenal Angka Spesial',
    icon: '🔢',
    summary: 'Bilangan prima adalah bilangan lebih dari 1 yang HANYA bisa dibagi habis oleh angka 1 dan bilangan itu sendiri.',
    keyPoints: [
      'Daftar Bilangan Prima awal yang wajib kamu ingat: 2, 3, 5, 7, 11, 13, 17, 19.',
      'Angka 2 adalah bilangan prima paling kecil sekaligus satu-satunya yang genap!',
      'Contoh Bukan Prima: Angka 6 (karena selain dibagi 1 dan 6, bisa juga dibagi 2 dan 3).',
    ],
    funFact: 'Angka 1 bukan bilangan prima karena hanya punya satu pembagi saja!',
  },
  {
    id: 'mat_2',
    title: 'Pohon Faktor & Faktorisasi Prima',
    category: 'Halaman 2 • Mengurai Bilangan',
    icon: '🌳',
    summary: 'Pohon faktor adalah cara membagi suatu bilangan dengan bilangan prima terkecil (2, 3, 5...) sampai ujungnya menjadi bilangan prima.',
    keyPoints: [
      'Contoh membuat Pohon Faktor 12: Bagi 12 dengan 2 → hasilnya 6. Lalu bagi 6 dengan 2 → hasilnya 3 (sudah prima!).',
      'Kumpulkan semua daun primanya: 12 = 2 × 2 × 3.',
      'Karena angka 2 ada dua kali, kita tulis menjadi pangkat: 12 = 2² × 3.',
    ],
    funFact: 'Pohon faktor selalu dimulai dengan mencoba membagi dengan angka prima paling kecil yaitu 2!',
  },
  {
    id: 'mat_3',
    title: 'Cara Mudah Mencari FPB',
    category: 'Halaman 3 • Faktor Persekutuan Terbesar',
    icon: '🛡️',
    summary: 'FPB berguna untuk membagi benda sama rata. Rumus kuncinya: Pilih faktor prima yang SAMA dengan pangkat TERKECIL!',
    keyPoints: [
      'Contoh: Cari FPB dari 4 dan 6.',
      'Faktorisasi prima: 4 = 2² dan 6 = 2 × 3.',
      'Faktor prima yang SAMA di keduanya hanya angka 2 (angka 3 tidak ikut karena tidak ada di 4).',
      'Pilih pangkat terkecil antara 2² dan 2, yaitu 2. Jadi FPB dari 4 dan 6 adalah 2!',
    ],
    funFact: 'Ingat singkatan FPB: Pilih yang SAMA, ambil yang KECIL!',
  },
  {
    id: 'mat_4',
    title: 'Cara Mudah Mencari KPK',
    category: 'Halaman 4 • Kelipatan Persekutuan Terkecil',
    icon: '🚀',
    summary: 'KPK berguna untuk mencari waktu bersama. Rumus kuncinya: Kalikan SEMUA faktor prima, jika sama pilih pangkat TERBESAR!',
    keyPoints: [
      'Contoh: Cari KPK dari 4 dan 6.',
      'Faktorisasi prima: 4 = 2² dan 6 = 2 × 3.',
      'Kumpulkan SEMUA faktor prima (angka 2 dan angka 3 semuanya diajak!).',
      'Untuk angka 2, pilih pangkat terbesar yaitu 2². Maka KPK = 2² × 3 = 4 × 3 = 12!',
    ],
    funFact: 'Ingat singkatan KPK: Ajak SEMUA faktor, ambil pangkat yang BESAR!',
  },
];
