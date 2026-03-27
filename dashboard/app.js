// 1. AYARLAR VE VERİLER
const CONFIG = { city: "Antalya", country: "TR" };
const alarmSound = new Audio('https://orangefreesounds.com/wp-content/uploads/2025/08/Short-analog-alarm-clock-sound-effect.mp3');
alarmSound.loop = true;

const HOLIDAYS = [
    { name: "Ramazan Bayramı", date: "2026-03-20T00:00:00" },
    { name: "Ulusal Egemenlik", date: "2026-04-23T00:00:00" },
    { name: "Emek ve Dayanışma", date: "2026-05-01T00:00:00" },
    { name: "Atatürk'ü Anma/Gençlik", date: "2026-05-19T00:00:00" },
    { name: "Kurban Bayramı", date: "2026-05-27T00:00:00" },
    { name: "Demokrasi Günü", date: "2026-07-15T00:00:00" },
    { name: "Zafer Bayramı", date: "2026-08-30T00:00:00" },
    { name: "Cumhuriyet Bayramı", date: "2026-10-29T00:00:00" },
    { name: "DGM", date: "2026-09-04T00:00:00" }
];

// 2. CORE UI KONTROLLERİ
window.showPage = (p) => {
    document.querySelectorAll('.page').forEach(x => x.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
    const targetPage = document.getElementById(p);
    if (targetPage) targetPage.classList.remove('hidden');
    if (event && event.currentTarget) event.currentTarget.classList.add('active');
};

window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');

// 3. ZAMAN VE SAYAÇ SİSTEMİ
function tickCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;

    const diff = target - new Date();
    if (diff < 0) { el.innerText = "Süre Doldu"; return; }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    el.innerText = `${d > 0 ? d + 'g ' : ''}${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateTime() {
    const now = new Date();
    const clockEl = document.getElementById('top-clock');
    const dateEl = document.getElementById('top-date');

    if (clockEl) clockEl.innerText = now.toLocaleTimeString('tr-TR');
    if (dateEl) dateEl.innerText = now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

    tickCounter('yks-timer', new Date("2026-06-13T10:15:00"));
    tickCounter('lgs-timer', new Date("2026-06-14T09:30:00"));

    // Hafta sonu hesabı
    let sat = new Date();
    sat.setDate(sat.getDate() + (6 - sat.getDay() + 7) % 7);
    sat.setHours(0, 0, 0, 0);
    if (now.getDay() == 6 && now.getHours() > 0) sat.setDate(sat.getDate() + 7);
    tickCounter('weekend-timer', sat);

    const nextH = HOLIDAYS.find(h => new Date(h.date) > now);
    if (nextH && document.getElementById('next-holiday-name')) {
        document.getElementById('next-holiday-name').innerText = nextH.name;
        tickCounter('next-holiday-timer', new Date(nextH.date));
    }
}

// 4. API SERVİSLERİ (Ayet, Namaz, Motivasyon)
async function fetchPrayers() {
    try {
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${CONFIG.city}&country=${CONFIG.country}&method=13`);
        const data = await res.json();
        const timings = data.data.timings;
        const now = new Date();
        const pOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        const pTr = { "Fajr": "İmsak", "Dhuhr": "Öğle", "Asr": "İkindi", "Maghrib": "Akşam", "Isha": "Yatsı" };

        for (let p of pOrder) {
            let [h, m] = timings[p].split(':');
            let pTime = new Date();
            pTime.setHours(h, m, 0);
            if (pTime > now) {
                document.getElementById('p-name').innerText = pTr[p];
                const prayerInterval = setInterval(() => {
                    tickCounter('p-timer', pTime);
                    if (new Date() > pTime) clearInterval(prayerInterval);
                }, 1000);
                break;
            }
        }
    } catch (e) { console.error("Namaz API Hatası"); }
}

window.newQuote = async () => {
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    if (!textEl) return;

    textEl.style.opacity = 0;
    authorEl.style.opacity = 0;

    try {
        // 1. Kendi GitHub sayfandaki JSON dosyasını çekiyoruz
        const response = await fetch('https://y-0736.github.io/dashboard/quotes.json');
        if (!response.ok) throw new Error("JSON yüklenemedi");

        const quotes = await response.json();

        // 2. Rastgele bir söz seçiyoruz
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        // ÖNEMLİ: Dosyandaki anahtarlar "quote" ve "author" olduğu için bunları kullanıyoruz
        const englishText = randomQuote.quote;
        const authorName = randomQuote.author;

        // 3. MyMemory ile Çeviri Yapıyoruz (en -> tr)
        const transRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishText)}&langpair=en|tr`);
        const transData = await transRes.json();

        // Çevrilmiş metni alıyoruz
        const turkishText = transData.responseData.translatedText;

        // 4. Ekrana Yazdırıyoruz
        textEl.innerText = turkishText;
        authorEl.innerText = `— ${authorName}`;

    } catch (e) {
        console.error("Hata:", e);
        // Hata durumunda (internet yoksa veya API limitine takılırsan) yedek söz
        textEl.innerText = "Başarı, her gün tekrarlanan küçük çabaların toplamıdır.";
        authorEl.innerText = "— Robert Collier";
    }

    //Yumuşak geçişle metni göster
    setTimeout(() => {
        textEl.style.opacity = 1;
        if (typeof updateModalPreview === "function") updateModalPreview();
        authorEl.style.opacity = 0.7;
        if (typeof updateModalPreview === "function") updateModalPreview();
    }, 300);
};

async function fetchDailyAyah() {
    try {
        const randomAyah = Math.floor(Math.random() * 6236) + 1;
        const [arRes, trRes] = await Promise.all([
            fetch(`https://api.alquran.cloud/v1/ayah/${randomAyah}`),
            fetch(`https://api.alquran.cloud/v1/ayah/${randomAyah}/tr.diyanet`)
        ]);
        const arData = await arRes.json();
        const trData = await trRes.json();

        document.getElementById('quran-arabic').innerText = arData.data.text;
        document.getElementById('quran-tr').innerText = trData.data.text;
        document.getElementById('quran-info').innerText = `${arData.data.surah.englishName} ${arData.data.numberInSurah}`;
    } catch (e) { console.error("Ayet Hatası"); }
}

// 5. TASARIM STÜDYOSU (MODAL & PAYLAŞIM)
window.shareOnInstagram = () => {
    document.getElementById('share-modal').style.display = 'flex';
    updateModalPreview();
};

window.closeShareModal = () => document.getElementById('share-modal').style.display = 'none';

window.handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = function () {
            const previewBox = document.getElementById('modal-preview-box');

            // Sabit bir genişlik belirleyelim (örneğin 350px)
            const fixedWidth = 350;
            // Resmin oranını hesapla (Genişlik / Yükseklik)
            const ratio = this.width / this.height;

            // Kutunun boyutlarını resme göre ayarla
            previewBox.style.width = fixedWidth + "px";
            previewBox.style.height = (fixedWidth / ratio) + "px";

            // Arka plan ayarları
            previewBox.style.backgroundImage = `url(${e.target.result})`;
            previewBox.style.backgroundSize = "contain"; // Resmi kesmeden kutuya sığdırır
            previewBox.style.backgroundRepeat = "no-repeat";
            previewBox.style.backgroundPosition = "center";
            previewBox.style.border = "none";

            // Oranı sakla ki diğer güncellemelerde bozulmasın
            previewBox.dataset.currentRatio = ratio;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};
window.updateModalPreview = () => {
    const previewBox = document.getElementById('modal-preview-box');
    const bodyEl = document.getElementById('modal-quote-body');
    const authorEl = document.getElementById('modal-quote-author');
    const uploadContainer = document.getElementById('upload-container');
    const input = document.getElementById('m-font-size');
    let value = parseInt(input.value);

    // Eğer değer sayı değilse veya 16'dan küçükse
    if (isNaN(value) || value < 16) {
        // İstersen burada hemen 16'ya eşitleyebilirsin:
        input.value = 16;
    }

    // Değer 40'tan büyükse üst sınırı da koruyalım
    if (value > 40) {
        input.value = 40;
    }

    // Önizleme güncelleme kodların buraya...
    console.log("Şu anki font boyutu:", value);

    if (!previewBox || !bodyEl) return;

    // Formdan güncel değerleri al
    const bgType = document.getElementById('m-bg-type').value;
    const vAlign = document.getElementById('m-text-align-v').value; // top, center, bottom
    const fontSize = document.getElementById('m-font-size').value;
    const fontFamily = document.getElementById('m-font-family').value;
    const fontColor = document.getElementById('m-font-color').value;

    // Metin içeriklerini güncelle
    bodyEl.innerText = document.getElementById('quote-text').innerText;
    authorEl.innerText = document.getElementById('quote-author').innerText;

    // Stil uygulamaları
    bodyEl.style.fontFamily = fontFamily;
    bodyEl.style.color = fontColor;
    bodyEl.style.fontSize = fontSize + "px";

    authorEl.style.fontFamily = fontFamily;
    authorEl.style.color = fontColor;
    authorEl.style.fontSize = (fontSize * 0.7) + "px";

    // Dikey Hizalama Mantığı (Eski çalışan yapın)
    previewBox.style.display = "flex";
    previewBox.style.flexDirection = "column";

    previewBox.style.justifyContent = vAlign;
    if (uploadContainer) uploadContainer.style.display = (bgType === "img") ? "block" : "none";


    // Arka Plan Kontrolleri
    if (bgType !== "img") {
        previewBox.style.width = "300px";
        previewBox.style.height = "auto";
        previewBox.style.minHeight = "200px";
        previewBox.style.backgroundImage = "none";

        if (bgType === "transparent") {
            previewBox.style.background = "transparent";
            previewBox.style.border = "2px dashed #ccc";
        } else if (bgType === "white") {
            previewBox.style.background = "#EEEEEE";
            previewBox.style.border = "none";
        } else if (bgType === "dark") {
            previewBox.style.background = "#222831";
            previewBox.style.border = "none";
        }
    } else {
        // FOTOĞRAF MODU
        previewBox.style.border = "none";
        previewBox.style.width = "auto";
        previewBox.style.padding = "25px 50px";

        // Eğer bir fotoğraf yüklendiyse, handleImageUpload'ın verdiği boyutları koru.
        // Eğer yüklenmediyse varsayılan bir gradyan ve boyut ver:
        if (!previewBox.style.backgroundImage || previewBox.style.backgroundImage === "none") {
            previewBox.style.height = "450px";
            previewBox.style.background = "linear-gradient(135deg, #00b4db, #0083b0)";
        }
    }

};

window.downloadFinalImage = () => {
    const previewBox = document.getElementById('modal-preview-box');
    html2canvas(previewBox, { scale: 3, backgroundColor: null }).then(canvas => {
        const link = document.createElement('a');
        link.download = `odak26-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
};

let pMin = 25, pSec = 0, pInt = null;

window.togglePomo = () => {
    const btn = document.getElementById('pomo-btn');
    const display = document.getElementById('pomo-display');

    if (pInt) {
        clearInterval(pInt);
        pInt = null;
        btn.innerText = "BAŞLAT";
        // Eğer kullanıcı manuel durdurursa sesi de sustur
        alarmSound.pause();
        alarmSound.currentTime = 0;
    } else {
        pInt = setInterval(() => {
            if (pSec === 0) {
                if (pMin === 0) {
                    clearInterval(pInt);
                    pInt = null;

                    // Sesi başlat (Döngü sayesinde hiç bitmeyecek)
                    alarmSound.play().catch(e => console.log("Ses çalma hatası:", e));

                    btn.innerText = "BAŞLAT";
                    display.innerText = "00:00";

                    // KOD BURADA DURUR: Kullanıcı 'Tamam' diyene kadar alt satıra geçmez
                    alert("Seans bitti! Mola zamanı. 🚀");

                    // KULLANICI TAMAM'A BASTI: Şimdi sesi susturuyoruz
                    alarmSound.pause();
                    alarmSound.currentTime = 0;

                    pMin = 25; pSec = 0;
                    return;
                }
                pMin--;
                pSec = 59;
            } else {
                pSec--;
            }
            display.innerText = `${pMin.toString().padStart(2, '0')}:${pSec.toString().padStart(2, '0')}`;
        }, 1000);
        btn.innerText = "DURDUR";
    }
};
function buildCal() {
    const grid = document.getElementById('main-cal');
    if (!grid) return;
    const now = new Date();
    document.getElementById('mounth').innerText = now.toLocaleString('tr-TR', { month: 'long' });

    for (let i = 1; i <= 31; i++) {
        const d = document.createElement('div');
        d.className = `cal-day ${i === now.getDate() ? 'today' : ''}`;
        d.innerText = i;
        d.onclick = () => {
            document.querySelectorAll('.cal-day').forEach(x => x.classList.remove('selected'));
            d.classList.add('selected');
            document.getElementById('custom-goal').style.display = 'block';
            if (window.customInterval) clearInterval(window.customInterval);
            window.customInterval = setInterval(() => tickCounter('custom-timer', new Date(2026, now.getMonth(), i)), 1000);
        };
        grid.appendChild(d);
    }
}

// 7. INITIALIZATION (BAŞLATMA)
document.addEventListener('DOMContentLoaded', () => {
    const nt = document.getElementById('notepad');
    if (nt) {
        nt.value = localStorage.getItem('aura_notes') || "";
        nt.addEventListener('input', () => localStorage.setItem('aura_notes', nt.value));
    }

    setInterval(updateTime, 1000);
    fetchPrayers();
    fetchDailyAyah();
    buildCal();
    newQuote();
});