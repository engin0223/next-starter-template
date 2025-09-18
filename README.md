# 📊 KTÜ Not Hesaplayıcı (İstatistiksel Değerlendirme)

[![Cloudflare'e Dağıtın](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/next-starter-template)

## Projeye Genel Bakış

Bu proje, **Next.js (TypeScript)** ile oluşturulmuş ve **Cloudflare Workers** üzerinde dağıtılan bir **istatistiksel not hesaplayıcıdır**. KTÜ'nün resmi notlandırma yönetmeliklerini uygulayarak, sınav dağılımlarına göre öğrencilerin harf notlarını tahmin etmek için gelişmiş istatistiksel yöntemler kullanır.

Basit hesaplayıcıların aksine, bu uygulama:

* **Vize ve final sınav dağılımlarını** (ortalama, standart sapma) kullanır.
* Sınavlar arasındaki **korelasyon katsayısını (p)** içerir.
* Uygun değerlendirme sistemini dinamik olarak uygular:

* **T-Puanı Yöntemi (Tablo-1)** ≥30 öğrencisi olan sınıflar için.
* **Mutlak Değerlendirmesi (Tablo-3)** küçük sınıflar veya sınıf ortalamaları yüksek olduğunda.
* Fakülteye özgü **asgari final notu gereklilikleri** uygulanır.

Bu projenin iki amacı vardır:

1. **Pratik fayda** – öğrencilerin resmi sonuçlardan önce notlarını tahmin etmelerine yardımcı olmak.
2. **Profesyonel gösterim** – modern bir web uygulama çerçevesi içinde **matematiksel olarak titiz mantık** tasarlama yeteneğimi sergilemek.

⚠️ **Not:** Finansal nedenlerden dolayı özel bir alan adı satın alınmamıştır. Uygulama şu anda ücretsiz Cloudflare Workers URL'si altında barındırılmaktadır.

## Canlı Demo

🔗 [Canlı Dağıtım (Cloudflare Workers)](https://next-starter-template.templates.workers.dev)
*(Mümkün olduğunda ileride özel alan adı eklenecektir.)*

## Özellikler

* 📐 **İstatistiksel Hesaplama:** Ortalama, standart sapma, kovaryans ve ağırlıklı varyans hesaplamaları.
* 🎓 **Harf Notu Tahmini:** KTÜ'nün tüm notlandırma kurallarını destekler.
* 🖥️ **Etkileşimli Arayüz:** React ve Tailwind CSS ile oluşturulmuş duyarlı kullanıcı arayüzü.
* ☁️ **Cloudflare Dağıtımı:** Hafif ve küresel olarak dağıtılmış statik barındırma.
* 🔒 **Öğretim Üyesi Kuralları:** Bölüme özgü minimum final sınavı eşiklerini uygular.

## Teknoloji Yığını

* **Çerçeve:** Next.js (React + TypeScript)
* **Stil:** Tailwind CSS
* **Barındırma:** Cloudflare Workers (statik dağıtım)
* **Araçlar:** npm / yarn / pnpm / bun

## Başlarken

Bağımlılıkları yükleyin:

```bash
npm install
```

Geliştirme sunucusunu çalıştırın:

```bash
npm run dev
```

Ardından [http://localhost:3000](http://localhost:3000) adresini açın.

## Dağıtım

```bash
npm run build && npm run deploy
```

---

## Bu Proje Neden Önemli?

Bu proje şu becerilerimi gösteriyor:

* **Akademik düzenlemeleri** **işlevsel algoritmalara** dönüştürme. * Gerçek dünya web uygulamasında **istatistiksel analiz** uygulayın.
* Modern çerçeveler kullanarak **ölçeklenebilir, profesyonel düzeyde uygulamalar** oluşturun ve dağıtın.

Potansiyel işverenlere teknik, matematiksel ve yazılım mühendisliği becerilerinizi sergilemek için uygun, **portföy kalitesinde bir proje** olarak tasarlanmıştır.
