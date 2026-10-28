# LCA VIEW — gerçek Forex ve XAU/USD verisi

Bu değişiklik mevcut ana sayfayı değiştirmez. İlk gerçek-veri doğrulama ekranı `/view/`; kullanıcının özgün, kapsamlı tasarımı ve araçları `/lca-view.html` yolundadır.

## Vercel kurulumu
1. Bu GitHub deposunu Vercel'de proje olarak içe aktarın.
2. Vercel → Project → Settings → Environment Variables bölümüne gidin.
3. `TWELVEDATA_API_KEY` adında bir değişken oluşturun ve Twelve Data'dan oluşturduğunuz yenilenmiş API anahtarını değerine girin. Anahtarı HTML'ye veya GitHub'a yazmayın.
4. Değişkeni Preview ve Production ortamlarına ekleyin, ardından yeni deployment başlatın.
5. Önizleme URL'sinde `/lca-view.html` sayfasını açarak özgün tasarımın canlı veri sürümünü test edin. `/view/` temel test ekranı olarak ayrı kalır.

## Dosyalar
- `lca-view.html`: kullanıcının orijinal kapsamlı HTML tasarımı, özel grafik çizimleri, göstergeler ve Replay arayüzü korunarak Twelve Data gerçek OHLC mumlarına bağlandı; sentetik mum/tick üretimi kapalı.
- `view/index.html`: sade temel gerçek-veri doğrulama sayfası; sanal veri fallback'i yok.
- `api/status.js`: anahtarın mevcut olup olmadığını anahtarı ifşa etmeden bildirir.
- `api/connect.js` ve `api/time_series.js`: Twelve Data'ya sunucu tarafından istek yapar.
- `lib/twelve.js`: sembol, zaman dilimi ve anahtar yönetimi.

## Sınırlamalar
- GitHub Pages, `api/*.js` dosyalarını sunucu fonksiyonu olarak çalıştırmaz. API için Vercel deployment gerekir.
- Özgün tasarımdaki mumlar beş dakikada bir REST isteğiyle yenilenir; bu sürüm tick-by-tick WebSocket akışı sağlamaz.
- Twelve Data hesabının seçilen sembol ve aralık için erişim izni ve yeterli kotası olmalıdır.
- Bu koruma API anahtarını tarayıcıdan saklar. HTML'ye gönderilen istemci JavaScript'i gizlemez; özel göstergelerin formüllerini gizlemek için ayrıca backend'e taşımak gerekir.
- Genel yayından önce API endpoint'lerine erişim kontrolü/rate limit eklenmesi ve sağlayıcı kullanım koşullarının kontrol edilmesi önerilir.