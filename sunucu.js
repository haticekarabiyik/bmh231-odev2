
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const sunucu = http.createServer((req, res) => {
  console.log(req.method, req.url);

  const adres = new URL(req.url, `http://localhost:${PORT}`);

  // GET dışındaki yöntemleri engelle
  if (req.method !== "GET") {
    res.writeHead(405, {
      "Content-Type": "text/plain; charset=utf-8",
      "Allow": "GET"
    });
    res.end("Yönteme izin verilmiyor.");
    return;
  }

  // Etkinlik API'si
  if (
    adres.pathname === "/api/etkinlikler" ||
    /^\/api\/etkinlikler\/\d+$/.test(adres.pathname)
  ) {
    const dosyaYolu = path.join(__dirname, "etkinlikler.json");

    fs.readFile(dosyaYolu, "utf8", (hata, veri) => {
      if (hata) {
        res.writeHead(500, {
          "Content-Type": "text/plain; charset=utf-8"
        });
        res.end("Dosya okunamadı.");
        return;
      }

      let etkinlikler;

      try {
        etkinlikler = JSON.parse(veri);
      } catch (hata) {
        res.writeHead(500, {
          "Content-Type": "text/plain; charset=utf-8"
        });
        res.end("JSON verisi okunamadı.");
        return;
      }

      // Tek etkinliği getir
      if (adres.pathname !== "/api/etkinlikler") {
        const id = Number(adres.pathname.split("/")[3]);
        const etkinlik = etkinlikler.find(e => e.id === id);

        if (!etkinlik) {
          res.writeHead(404, {
            "Content-Type": "application/json; charset=utf-8"
          });
          res.end(JSON.stringify({
            hata: "Etkinlik bulunamadı"
          }));
          return;
        }

        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8"
        });
        res.end(JSON.stringify(etkinlik));
        return;
      }

      // Etkinlikleri türe göre filtrele
      const tur = adres.searchParams.get("tur");

      const sonuc = tur
        ? etkinlikler.filter(e => e.tur === tur)
        : etkinlikler;

      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
      });
      res.end(JSON.stringify(sonuc));
    });

    return;
  }

  // Statik dosyalar
  const dosyaAdlari = {
    "/": "index.html",
    "/index.html": "index.html",
    "/stil.css": "stil.css",
    "/betik.js": "betik.js"
  };

  const dosyaAdi = dosyaAdlari[adres.pathname];

  if (!dosyaAdi) {
    res.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.end("Sayfa bulunamadı.");
    return;
  }

  const dosyaYolu = path.join(__dirname, "public", dosyaAdi);

  const icerikTurleri = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
  };

  fs.readFile(dosyaYolu, (hata, veri) => {
    if (hata) {
      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end("Dosya okunamadı.");
      return;
    }

    const uzanti = path.extname(dosyaAdi);

    res.writeHead(200, {
      "Content-Type": icerikTurleri[uzanti] + "; charset=utf-8"
    });

    res.end(veri);
  });
});

sunucu.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
