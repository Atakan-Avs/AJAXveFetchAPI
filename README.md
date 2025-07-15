# AJAX ve Fetch API Uygulaması

Bu proje, JSONPlaceholder API kullanarak AJAX ve Fetch API ile asenkron veri işlemlerini gösteren bir web uygulamasıdır.

## 🚀 Özellikler

- **GET İşlemi**: JSONPlaceholder API'den postları listeleme
- **POST İşlemi**: Yeni post ekleme (form ile kullanıcıdan veri alma)
- **DELETE İşlemi**: Post silme
- **Modern UI**: Responsive ve kullanıcı dostu arayüz
- **Hata Yönetimi**: Kapsamlı hata yakalama ve kullanıcı bildirimleri
- **Loading States**: Yükleme durumları için görsel geri bildirim

## 📁 Dosya Yapısı

```
AJAXveFetchAPI/
├── index.html      # Ana HTML dosyası
├── style.css       # CSS stilleri
├── script.js       # JavaScript kodu (Fetch API)
└── README.md       # Bu dosya
```

## 🛠️ Kullanım

1. **Dosyaları İndirin**: Tüm dosyaları aynı klasöre kaydedin
2. **Tarayıcıda Açın**: `index.html` dosyasını web tarayıcınızda açın
3. **Kullanmaya Başlayın**: Uygulama otomatik olarak postları yükleyecektir

## 🔧 API İşlemleri

### GET - Postları Listeleme
```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => displayPosts(posts));
```

### POST - Yeni Post Ekleme
```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Yeni Ürün',
    body: 'Ürün içeriği',
    userId: 1
  })
});
```

### DELETE - Post Silme
```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE'
});
```

## 🎯 Öğrenme Hedefleri

Bu uygulama ile şunları öğrenebilirsiniz:

- **Fetch API**: Modern JavaScript ile HTTP istekleri
- **AJAX**: Asenkron veri alma ve gönderme
- **DOM Manipulation**: JavaScript ile HTML elementlerini değiştirme
- **Event Handling**: Kullanıcı etkileşimlerini yakalama
- **Error Handling**: Hata durumlarını yönetme
- **Form Handling**: Form verilerini işleme

## 🎨 Özellikler

- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Modern UI**: Gradient arka plan ve gölge efektleri
- **Animasyonlar**: Smooth geçişler ve hover efektleri
- **Loading Spinner**: Veri yüklenirken görsel geri bildirim
- **Success/Error Messages**: İşlem sonuçları için bildirimler
- **XSS Koruması**: HTML escape fonksiyonu ile güvenlik

## 🔍 Konsol Komutları

Tarayıcının geliştirici konsolunda şu fonksiyonları kullanabilirsiniz:

- `fetchPosts()` - Fetch API ile ürünleri getir
- `fetchPostsWithAJAX()` - XMLHttpRequest ile ürünleri getir
- `deletePost(id)` - Belirtilen ID'li ürünü sil

## 📚 Teknolojiler

- **HTML5**: Semantik markup
- **CSS3**: Flexbox, Grid, Animasyonlar
- **JavaScript ES6+**: Async/await, Fetch API, Arrow functions
- **JSONPlaceholder API**: Test verisi için ücretsiz API

## 🚀 Geliştirme

Bu projeyi geliştirmek için:

1. Yeni özellikler ekleyebilirsiniz (PUT işlemi, arama, filtreleme)
2. Farklı API'ler kullanabilirsiniz
3. LocalStorage ile veri saklama ekleyebilirsiniz
4. Daha gelişmiş UI/UX özellikleri ekleyebilirsiniz

## 📝 Not

JSONPlaceholder API test amaçlıdır ve gerçek veri değişiklikleri yapmaz. POST ve DELETE işlemleri simüle edilir.

---

**Geliştirici**: AJAX ve Fetch API Öğrenme Projesi
**API**: https://jsonplaceholder.typicode.com/ 