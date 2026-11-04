# bmh231-odev2
BMH231 Web Programlama - Kampüs Etkinlik Panosu

## Proje Hakkında

Bu proje, BMH231 Web Programlama dersi kapsamında hazırlanan Kampüs Etkinlik Panosu uygulamasıdır.

## Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript
- Node.js
- JSON
- Git ve GitHub

## Projeyi Çalıştırma

1. Proje klasörünü VS Code ile açın.
2. Terminalde `node sunucu.js` komutunu çalıştırın.
3. Tarayıcıdan `http://localhost:3000` adresine gidin.

## Özellikler

- Kampüs etkinliklerini listeleme
- Etkinlik türüne göre filtreleme
- Etkinlik adına göre arama
- Etkinlik öneri formu ve doğrulama
- Fetch API ile JSON verilerini alma
- HTTP sunucusu ve etkinlik API uç noktaları

## API Adresleri

- `GET /api/etkinlikler`
- `GET /api/etkinlikler?tur=atolye`
- `GET /api/etkinlikler/3`

## Proje Yapısı

- `sunucu.js`: HTTP sunucusu ve API işlemleri
- `etkinlikler.json`: Etkinlik verileri
- `public/index.html`: Sayfa yapısı
- `public/stil.css`: Sayfa tasarımı
- `public/betik.js`: Etkinlik listeleme, filtreleme ve form işlemleri