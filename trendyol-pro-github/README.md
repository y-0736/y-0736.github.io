# Trendyol Pro — GitHub + Supabase

## Kurulum
1. Supabase Dashboard > SQL Editor bölümünde `supabase.sql` dosyasını çalıştırın.
2. Authentication > Providers > Email girişinin açık olduğundan emin olun.
3. `index.html` içindeki `SUPABASE_URL` ve `SUPABASE_ANON_KEY` değerlerini kendi projenizle eşleştirin.
4. Klasörü GitHub'a yükleyin ve GitHub Pages'i açın.

## Düzeltilen sorunlar
- Yanlış `supabaseClient.createClient(...)` kullanımı düzeltildi.
- Gerçek SELECT / INSERT / UPDATE / DELETE işlemleri eklendi.
- Ürün verisinin kaynağı `localStorage` yerine Supabase oldu.
- Supabase Auth ile kullanıcı oturumu eklendi.
- RLS ile kullanıcı yalnızca kendi ürünlerini okuyup değiştirebiliyor.
- JSON içe aktarma doğrudan Supabase'e yazıyor.
- Satıcı linki artık SKU yerine `surl` alanını kullanıyor.
- URL doğrulaması ve hata bildirimleri eklendi.
- GitHub Pages gibi statik hosting ile çalışacak yapı korunuyor.

## Güvenlik
Frontend'e kesinlikle `service_role` veya başka secret key koymayın.
