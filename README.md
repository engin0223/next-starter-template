# 📊 KTÜ Not Hesaplayıcı (İstatistiksel Değerlendirme)

[![Cloudflare'e Dağıtım](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kullanıcı-adınız/ktu-not-hesaplayıcısı)

## Projeye Genel Bakış

Bu proje, **Next.js + TypeScript** ile geliştirilmiş ve **Cloudflare Workers** üzerinde dağıtılmış bir **istatistiksel not hesaplayıcıdır**.
Karadeniz Teknik Üniversitesi (KTÜ) tarzı notlandırma kurallarını kodlar ve sınıf sınav dağılımlarından öğrenci harf notlarını tahmin etmek için istatistiksel yöntemler kullanır.

Uygulama:
- ara sınav ve final sınavı özet istatistiklerini (ortalama, standart sapma) kabul eder,
- ara sınav ve final sınavı arasındaki korelasyon katsayısı `p`'yi kabul eder,
- ağırlıklı ders notunu (HBN) ve dağılımını hesaplar,
- KTÜ değerlendirme kurallarını (T-puanı yöntemi, mutlak yöntem ve fakülte final eşikleri) uygular.

> **Not:** Finansal nedenlerden dolayı özel bir alan adı satın alınmamıştır; uygulama şu anda ücretsiz Cloudflare Workers URL'sinde barındırılmaktadır. Uygun olduğunda özel bir alan adı eklenecektir.

---

## Matematiksel türetme (HBN ortalaması ve varyansı)

Bu bölüm, uygulamada kullanılan matematiksel formülleri belgelemekte ve bunların eşleştirilmiş değişkenler için temel varyans özdeşliklerinden nasıl türetildiklerini göstermektedir.

### Gösterim

- \(X\) ara sınav notu rastgele değişkeni (sınıf dağılımı) olsun.
Ortalama: \(\mu_X\), standart sapma: \(\sigma_X\), varyans: \(\operatorname{Var}(X)=\sigma_X^2\).
- \(Y\)'nin son puan rastgele değişkeni (sınıf dağılımı) olduğunu varsayalım.
Ortalama: \(\mu_Y\), standart sapma: \(\sigma_Y\), varyans: \(\operatorname{Var}(Y)=\sigma_Y^2\).
- \(p\)'nin \(X\) ve \(Y\) arasındaki Pearson korelasyon katsayısı olduğunu varsayalım: \(p = \operatorname{corr}(X,Y)\), burada \(p\in[-1,1]\).
- \(\operatorname{Cov}(X,Y)\)'nin \(X\) ve \(Y\) arasındaki kovaryansı gösterdiğini varsayalım. - Bu uygulamada ders notunun ağırlıkları sabittir: ara sınav için \(w_1\) ve final için \(w_2\). Varsayılan olarak \(w_1 = w_2 = 0,5\).

### Ağırlıklı ders notu (HBN)

Öğrencinin (ve sınıfın) HBN'sini ağırlıklı toplam olarak tanımlayın:
\[
H = w_1 X + w_2 Y .
\]

#### HBN Ortalaması
Beklentinin doğrusallığına göre:
\[
\mu_H = \mathbb{E}[H] = w_1 \mu_X + w_2 \mu_Y.
\]

#### HBN'nin Varyansı — türetme

İki rastgele değişkenin toplamı için varyans özdeşliğiyle başlayalım:
\[
\operatorname{Var}(X+Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X,Y).
\]

Ağırlıklı bir toplam için \(H = w_1 X + w_2 Y\), aynı özdeşliği sabitlerle uygulayalım:
\[
\begin{aligned}
\operatorname{Var}(H)
&= \operatorname{Var}(w_1 X + w_2 Y) \\
&= w_1^2 \operatorname{Var}(X) + w_2^2 \operatorname{Var}(Y) + 2 w_1 w_2 \operatorname{Cov}(X,Y).
\end{aligned}
\]

Kovaryansı, korelasyon katsayısı \(p\) kullanarak ifade ediyoruz:
\[
\operatorname{Cov}(X,Y) = p\,\sigma_X\,\sigma_Y.
\]

HBN varyansını elde etmek için varyans ifadesine yerine koyalım:
\[
\boxed{\;
\operatorname{Var}(H) = w_1^2 \sigma_X^2 \;+\; w_2^2 \sigma_Y^2 \;+\; 2 w_1 w_2 p \,\sigma_X \sigma_Y\;
}
\]

Son olarak, HBN standart sapması şu şekildedir:
\[
\sigma_H = \sqrt{\operatorname{Var}(H)}.
\]

Bunlar, bir öğrencinin HBN'sini T puanına veya mutlak nota dönüştürmeden önce sınıf HBN ortalamasını ve standart sapmasını hesaplamak için uygulamada kullanılan tam formüllerdir.

### Pratikte Kovaryans ve Korelasyon

- \(p\) bilinmiyorsa (belirtilmediyse), tipik bir çözüm \(p=0\) (bağımsızlık) olduğunu varsaymak veya mevcut olduğunda ham sınıf verilerinden tahmin etmektir.
- \(p\) işareti \(\operatorname{Var}(H)\'yi etkiler: pozitif korelasyon, ağırlıklı toplamın varyansını artırırken, negatif korelasyon azaltır.

### T-puanı hesaplaması (dereceli ölçekleme için)

T-puanı sistemi uygulandığında (genellikle \(n \ge 30\)), bir öğrencinin HBN'si aşağıdaki gibi T-puanına dönüştürülür:
\[
T = 50 + 10 \cdot \frac{H_{\text{öğrenci}} - \mu_H}{\sigma_H},
\]
Burada \(\mu_H\) ve \(\sigma_H\) yukarıda hesaplanan sınıf HBN ortalaması ve standart sapmadır. Hesaplanan \(T\) daha sonra KTÜ'nün T-puanı tabloları kullanılarak bir harf notuna eşlenir.

---

## Özellikler (özet)

- İlişkili eşleştirilmiş sınavlar için kesin varyans özdeşliği kullanılarak resmileştirilmiş istatistiksel hesaplama.
- T-puanının KTÜ harf notlarına dönüştürülmesi ve eşlenmesi.
- Fakülte final sınavı asgari uygulaması (yapılandırılabilir eşikler). - Duyarlı kullanıcı arayüzü (React + Tailwind) ve güvenli, sürdürülebilir kod için TypeScript.
- Cloudflare Workers'da (ücretsiz sürüm) statik bir uygulama olarak dağıtıldı.

## Teknoloji yığını

- Next.js (React + TypeScript)
- Tailwind CSS
- Cloudflare Workers (statik dağıtım)
- npm / yarn / pnpm / bun uyumlu

## Başlarken

```bash
git clone https://github.com/kullanıcı-adınız/ktu-grade-calculator
cd ktu-grade-calculator
npm install
npm run dev
# open http://localhost:3000
