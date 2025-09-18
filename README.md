# 📊 KTÜ Not Hesaplayıcı (İstatistiksel Değerlendirme)

[![Cloudflare'e Dağıtım](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kullanıcı-adınız/ktu-not-hesaplayıcısı)

## Projeye Genel Bakış

Bu proje, **Next.js + TypeScript** ile geliştirilmiş ve **Cloudflare Workers** üzerinde dağıtılmış bir **istatistiksel not hesaplayıcıdır**.
Karadeniz Teknik Üniversitesi (KTÜ) notlandırma yönetmeliklerini kodlar ve sınıf sınav dağılımlarından öğrenci harf notlarını tahmin etmek için gelişmiş istatistiksel yöntemler kullanır.

Uygulama:

* Vize ve final sınav özet istatistiklerini (ortalama, standart sapma) kabul eder
* Vize ve final arasındaki korelasyon katsayısı $p$’yi kabul eder
* Ağırlıklı ders notunu (HBN) ve dağılımını hesaplar
* KTÜ değerlendirme kurallarını uygular (T-puanı yöntemi, mutlak yöntem, fakülteye özgü final eşikleri)

> **Not:** Finansal nedenlerden dolayı özel bir alan adı satın alınmamıştır; uygulama şu anda ücretsiz Cloudflare Workers URL’si altında barındırılmaktadır. Uygun olduğunda özel bir alan adı eklenecektir.

---

## Matematiksel Türetme (HBN Ortalaması ve Varyansı)

Bu bölüm, uygulamada kullanılan matematiksel formülleri adım adım açıklar ve HBN (Harfli Başarı Notu) hesaplamasının temelini gösterir.

### Notasyon

* $X$ : Vize notu rastgele değişkeni (sınıf dağılımı)
  Ortalama: $\mu_X$, Standart sapma: $\sigma_X$, Varyans: $\mathrm{Var}(X) = \sigma_X^2$
* $Y$ : Final notu rastgele değişkeni (sınıf dağılımı)
  Ortalama: $\mu_Y$, Standart sapma: $\sigma_Y$, Varyans: $\mathrm{Var}(Y) = \sigma_Y^2$
* $p$ : $X$ ve $Y$ arasındaki Pearson korelasyon katsayısı, $p \in [-1,1]$
  Kovaryans: $\mathrm{Cov}(X,Y)$
* Ders ağırlıkları: $w_1$ (vize), $w_2$ (final). Varsayılan: $w_1 = w_2 = 0.5$

---

### 1️⃣ Ağırlıklı Ders Puanı (HBN)

Öğrencinin ağırlıklı notu:

$$
H = w_1 X + w_2 Y
$$

---

### 2️⃣ HBN Ortalaması

Doğrusal beklenti özelliğini kullanarak:

$$
\begin{align}
\mu_H &= \mathbb{E}[H] \\
       &= \mathbb{E}[w_1 X + w_2 Y] \\
       &= w_1 \mu_X + w_2 \mu_Y
\end{align}
$$

> Yani HBN’nin beklenen değeri, vize ve finalin ağırlıklı ortalamasıdır.

---

### 3️⃣ HBN Varyansı

İki rastgele değişkenin toplamı için varyans özdeşliği:

$$
\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) + 2 \, \mathrm{Cov}(X,Y)
$$

Ağırlıklı toplam için:

$$
\mathrm{Var}(H) = w_1^2 \, \mathrm{Var}(X) + w_2^2 \, \mathrm{Var}(Y) + 2 w_1 w_2 \, \mathrm{Cov}(X,Y)
$$

Kovaryansı korelasyon katsayısı ile ifade edersek:

$$
\mathrm{Cov}(X,Y) = p \, \sigma_X \sigma_Y
$$

Son formül:

$$
\mathrm{Var}(H) = w_1^2 \sigma_X^2 + w_2^2 \sigma_Y^2 + 2 w_1 w_2 p \, \sigma_X \sigma_Y
$$

HBN standart sapması:

$$
\sigma_H = \sqrt{\mathrm{Var}(H)}
$$

> Bu formül, hem öğrencinin hem de sınıfın HBN dağılımını doğru şekilde tahmin eder.

---

## Özellikler

* 📐 **İstatistiksel Hesaplama:** Korelasyon kullanılarak tam HBN ortalaması ve varyans hesaplaması
* 🎓 **Harf Notu Tahmini:** Sınıf büyüklüğüne göre T-puan sistemi veya mutlak notlandırma yöntemi
* 🖥️ **Etkileşimli Kullanıcı Arayüzü:** React ve Tailwind CSS ile uyumlu
* ☁️ **Cloudflare Dağıtımı:** Küresel erişim için hafif statik barındırma
* 🔒 **Fakülte Kuralları:** Bölüm başına yapılandırılabilir minimum son eşikler

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
* Alan mantığı (istatistikler) ve sunum (Next.js kullanıcı arayüzü) arasındaki net ayrım — üretim kalitesinde kodlama uygulamaları
