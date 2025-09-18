# 📊 KTÜ Not Hesaplayıcı (İstatistiksel Değerlendirme)

[![Cloudflare'e Dağıtım](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kullanıcı-adınız/ktu-not-hesaplayıcısı)

## Projeye Genel Bakış

Bu proje, **Next.js + TypeScript** ile geliştirilmiş ve **Cloudflare Workers** üzerinde dağıtılmış bir **istatistiksel not hesaplayıcıdır**.
Karadeniz Teknik Üniversitesi (KTÜ) notlandırma yönetmeliklerini kodlar ve sınıf sınav dağılımlarından öğrenci harf notlarını tahmin etmek için gelişmiş istatistiksel yöntemler kullanır.

Uygulama:

* Vize ve final sınav özet istatistiklerini (ortalama, standart sapma) kabul eder
* Vize ve final arasındaki korelasyon katsayısı $p$'yi kabul eder
* Ağırlıklı ders notunu (HBN) ve dağılımını hesaplar
* KTÜ değerlendirme kurallarını (T-puanı yöntemi, mutlak yöntem, fakülteye özgü final eşikleri) uygular

> **Not:** Finansal nedenlerden dolayı özel bir alan adı satın alınmamıştır; uygulama şu anda ücretsiz Cloudflare Workers URL'si altında barındırılmaktadır. Uygun olduğunda özel bir alan adı eklenecektir.

---

## Matematiksel türetme (HBN ortalaması ve varyansı)

Bu bölüm, uygulamada kullanılan matematiksel formülleri tam olarak belgelemekte ve bunların eşleştirilmiş değişkenler için temel varyans özdeşliklerinden nasıl türetildiklerini göstermektedir.

### Notasyon

- X, vize notu rastgele değişkeni (sınıf dağılımı) olsun.

Ortalama: μ_X, standart sapma: σ_X, varyans: Var(X) = σ_X².
- Y, final notu rastgele değişkeni (sınıf dağılımı) olsun.
Ortalama: μ_Y, standart sapma: σ_Y, varyans: Var(Y) = σ_Y².
- p, X ve Y arasındaki Pearson korelasyon katsayısı olsun: p = corr(X,Y), burada p ∈ [-1,1].
- Cov(X,Y), X ve Y arasındaki kovaryansı göstersin.
- Bu uygulamada ders notunun ağırlıkları sabittir: ara sınav için w₁ ve final için w₂. Varsayılan olarak w₁ = w₂ = 0,5'tir.

### Ağırlıklı ders puanı (HBN)

Öğrencinin (ve sınıfın) HBN'sini ağırlıklı toplam olarak tanımlayın:

H = w₁ * X + w₂ * Y

#### HBN'nin ortalaması

Beklentinin doğrusallığına göre:

μ_H = E[H] = w₁ * μ_X + w₂ * μ_Y

#### HBN'nin varyansı — türetme

İki rastgele değişkenin toplamı için varyans özdeşliğiyle başlayın:

Var(X + Y) = Var(X) + Var(Y) + 2 * Cov(X,Y)

H = w₁ * X + w₂ * Y ağırlıklı toplam için:

Var(H) = w₁² * Var(X) + w₂² * Var(Y) + 2 * w₁ * w₂ * Cov(X,Y)

İfade korelasyon katsayısı p kullanılarak kovaryans:

Cov(X,Y) = p * σ_X * σ_Y

Varyans ifadesine yerine koyun:

Var(H) = w₁² * σ_X² + w₂² * σ_Y² + 2 * w₁ * w₂ * p * σ_X * σ_Y

Son olarak, HBN standart sapması:

σ_H = sqrt(Var(H))

---

## Özellikler

* 📐 **İstatistiksel Hesaplama:** Korelasyon kullanılarak tam HBN ortalaması ve varyans hesaplaması.
* 🎓 **Harf Notu Tahmini:** Sınıf büyüklüğüne göre T-puan sistemi veya mutlak notlandırma yöntemi.
* 🖥️ **Etkileşimli Kullanıcı Arayüzü:** React ve Tailwind CSS ile uyumlu arayüz. * ☁️ **Cloudflare Dağıtımı:** Küresel erişim için hafif statik barındırma.
* 🔒 **Fakülte Kuralları:** Bölüm başına yapılandırılabilir minimum son eşikler.

---

## Teknoloji Yığını

* Next.js (React + TypeScript)
* Tailwind CSS
* Cloudflare Workers (statik dağıtım)
* npm / yarn / pnpm / bun uyumlu

---

## Başlarken

```bash
git clone https://github.com/kullanıcı-adınız/ktu-grade-calculator
cd ktu-grade-calculator
npm install
npm run dev
# open http://localhost:3000
```

---

## Dağıtım

```bash
npm run build && npm run deploy
```

---

## Bu proje neden özgeçmişe uygun?

* **Resmi akademik kuralları** sağlam bir algoritmaya dönüştürmeyi gösterir
* **İstatistiksel akıl yürütme, TypeScript mimarisi, kullanıcı arayüzü tasarımı ve bulut dağıtımında** yetkinlik gösterir
* Alan mantığı arasında net ayrım (istatistikler) ve sunum (Next.js kullanıcı arayüzü) — üretim kalitesinde kodlama uygulamaları
