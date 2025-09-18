# 📊 KTÜ Harf Notu Hesaplayıcı (İstatistiksel)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/ktu-grade-calculator)

<!-- dash-content-start -->

Bu proje, [Next.js](https://nextjs.org/) kullanılarak geliştirilmiş **istatistiksel bir harf notu hesaplayıcıdır**.  
Vize ve final istatistiklerini (ortalama, standart sapma, korelasyon katsayısı) girerek öğrencinin **tahmini harf notunu** hesaplamaya yardımcı olur.  

Uygulama, KTÜ’nün resmi yönetmeliklerine uygun olacak şekilde:
- **Mutlak Değerlendirme Sistemi (Tablo-3)**  
- **T-Skoru Sistemi (Tablo-1)**  

kriterlerini desteklemektedir.  

⚠️ **Not:** Bu hesaplayıcı yalnızca **tahmini sonuçlar** verir. Resmi sonuçlar için öğrenci otomasyon sistemine bakılmalıdır.

<!-- dash-content-end -->

## 🚀 Özellikler

- Vize ve final istatistiklerinin girilmesi (ortalama, standart sapma)  
- Korelasyon katsayısı (`p`) desteği  
- Fakülteye göre final barajı (45 / 50 / 60)  
- Öğrenci sayısına göre **mutlak** veya **istatistiksel (T-Skoru)** değerlendirme  
- Anlık hesaplama ve detaylı istatistik çıktısı:
  - HBN ortalaması ve standart sapması  
  - Kişisel HBN değeri  
  - T-Skoru (uygunsa)  
- Sonuçların renkli kartlar ile görselleştirilmesi  

## 🔧 Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için:  

```bash
git clone https://github.com/your-username/ktu-grade-calculator
cd ktu-grade-calculator
npm install
npm run dev
