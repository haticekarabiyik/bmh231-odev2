
let etkinlikler = [];

const liste = document.getElementById("etkinlik-listesi");
async function etkinlikleriGetir() {
  try {
    liste.textContent = "Yükleniyor...";
    const cevap = await fetch("/api/etkinlikler");

    if (!cevap.ok) {
      throw new Error("Etkinlikler alınamadı.");
    }

    etkinlikler = await cevap.json();
    filtreleriUygula();

  } catch (hata) {
  console.error("Veri çekme hatası:", hata);
  liste.textContent = "Etkinlikler yüklenemedi. Lütfen tekrar deneyin.";
}
}




let aktifTur = "tumu";

function etkinlikleriGoster(filtrelenenEtkinlikler = etkinlikler) {
  liste.innerHTML = "";

  if (filtrelenenEtkinlikler.length === 0) {
    const mesaj = document.createElement("p");
    mesaj.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    liste.append(mesaj);
    return;
  }

  filtrelenenEtkinlikler.forEach(etkinlik => {
    const kart = document.createElement("article");
    kart.className = "etkinlik-karti";

    const baslik = document.createElement("h3");
    baslik.textContent = etkinlik.baslik;

    const tur = document.createElement("p");
    tur.textContent = "Tür: " + etkinlik.tur;

    const tarih = document.createElement("p");

const [yil, ay, gun] = etkinlik.tarih.split("-");

const tarihNesnesi = new Date(
  Number(yil),
  Number(ay) - 1,
  Number(gun)
);

tarih.textContent =
  "Tarih: " + tarihNesnesi.toLocaleDateString("tr-TR");
    const yer = document.createElement("p");
    yer.textContent = "Yer: " + etkinlik.yer;

    const kontenjan = document.createElement("p");
    kontenjan.textContent = "Kontenjan: " + etkinlik.kontenjan;

    kart.append(baslik, tur, tarih, yer, kontenjan);
    liste.append(kart);
  });
}

const arama = document.getElementById("arama");

function filtreleriUygula() {
  const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");

  const sonuc = etkinlikler.filter(etkinlik => {
    const turUygun =
      aktifTur === "tumu" || etkinlik.tur === aktifTur;

    const aramaUygun = etkinlik.baslik
      .toLocaleLowerCase("tr-TR")
      .includes(aranan);

    return turUygun && aramaUygun;
  });

  etkinlikleriGoster(sonuc);
}

const turler = {
  "Tümü": "tumu",
  "Atölye": "atolye",
  "Söyleşi": "soylesi",
  "Topluluk": "topluluk"
};

document.querySelectorAll(".filtreler button").forEach(buton => {
  buton.addEventListener("click", () => {
    aktifTur = turler[buton.textContent.trim()];

    document.querySelectorAll(".filtreler button").forEach(b => {
      b.classList.remove("aktif");
    });

    buton.classList.add("aktif");
    filtreleriUygula();
  });
});


arama.addEventListener("input", filtreleriUygula);

etkinlikleriGetir();

const form = document.getElementById("oneri-formu");
const mesaj = document.getElementById("form-mesaji");


form.addEventListener("submit", function(event) {
  event.preventDefault();

  const baslik = document.getElementById("baslik").value.trim();
  const tarih = document.getElementById("tarih").value;
  const epostaAlani = document.getElementById("eposta");
  const eposta = epostaAlani.value.trim();

  if (baslik === "" || tarih === "" || eposta === "") {
    mesaj.textContent = "Lütfen tüm alanları doldurunuz.";
    mesaj.className = "hata";
  
    return;
  }
if (baslik.length < 5) {
    mesaj.className = "hata";
  mesaj.textContent =
    "Etkinlik adı en az 5 karakter olmalıdır.";
  return;
}
  const bugun = new Date().toLocaleDateString("sv-SE");

  if (tarih < bugun) {
    mesaj.textContent = "Geçmiş bir tarih seçemezsiniz.";
    mesaj.className = "hata";
    return;
  }

  if (!epostaAlani.checkValidity()) {
    mesaj.textContent = "Geçerli bir e-posta adresi giriniz.";
    mesaj.className = "hata";
    return;
  }

  mesaj.textContent = "Etkinlik öneriniz başarıyla alındı.";
  mesaj.className = "basarili";
  form.reset();
});
