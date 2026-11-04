
const etkinlikler = [
  { id: 1, baslik: "Web Atölyesi", tur: "atolye", kontenjan: 30 },
  { id: 2, baslik: "Tanışma Toplantısı", tur: "topluluk", kontenjan: 120 },
  { id: 3, baslik: "YZ Söyleşisi", tur: "soylesi", kontenjan: 200 },
  { id: 4, baslik: "Git Atölyesi", tur: "atolye", kontenjan: 25 }
];

// A5(a) - Atölye başlıkları
console.log("A5(a):", etkinlikler.filter(e => e.tur === "atolye").map(e => e.baslik));

// A5(b) - ID değeri 3 olan etkinlik
console.log("A5(b):", etkinlikler.find(e => e.id === 3));

// A5(c) - Kontenjanı 100'den büyük etkinlik sayısı
console.log("A5(c):", etkinlikler.filter(e => e.kontenjan > 100).length);

// A5(d) - map ve forEach farkı
console.log("map sonucu:", etkinlikler.map(e => e.baslik));
const sonuc = etkinlikler.forEach(e => e.baslik);
console.log("forEach dönüş değeri:", sonuc);
