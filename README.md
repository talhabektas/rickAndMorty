# Rick and Morty Karakter Keşif Uygulaması

Bu proje, [Rick and Morty API](https://rickandmortyapi.com/) verilerini kullanarak karakterleri keşfetmek için oluşturulmuş modern bir React uygulamasıdır. Kullanıcıların karakterleri filtrelemesine, sayfalar arasında gezinmesine ve seçilen karakterlerin detaylarını görmesine olanak tanır.

Bu proje, bir frontend değerlendirme görevi kapsamında geliştirilmiştir.

## ✨ Özellikler

-   **Karakter Listeleme**: API'den gelen 250'den fazla karakteri temiz ve düzenli bir tabloda listeler.
-   **Detaylı Görünüm**: Tablodaki herhangi bir karaktere tıklandığında, sayfa otomatik olarak aşağı kayarak o karaktere ait detaylı bilgileri (göründüğü bölümler, son konumu vb.) gösterir.
-   **Çoklu Filtreleme**: Karakterleri isme, duruma (Alive, Dead, unknown) ve türe göre aynı anda filtreleme imkanı.
-   **Dinamik Sayfalandırma**: Karakter listesi arasında kolayca gezinmek için "Önceki" ve "Sonraki" butonları.
-   **Sayfa Boyutu Ayarı**: Kullanıcıların sayfa başına kaç karakter (10, 20, 50) görmek istediklerini seçebilmeleri.
-   **Hata Yönetimi**: API'den veri alınamadığında veya filtre sonucunda veri bulunamadığında kullanıcıya anlamlı mesajlar gösterilir.

## 🚀 Canlı Demo

Uygulamanın canlı demosu **GitHub Pages** üzerinde yayınlanmaktadır. Aşağıdaki linkten erişebilirsiniz:

**[https://talhabektas.github.io/rick-and-morty-app/](https://talhabektas.github.io/rick-and-morty-app/)**



## 🛠️ Kurulum ve Yerel Ortamda Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1.  **Projeyi klonlayın:**
    ```bash
    git clone https://github.com/talhabektas/rick-and-morty-app.git
    ```

2.  **Proje dizinine gidin:**
    ```bash
    cd rick-and-morty-app
    ```

3.  **Gerekli paketleri yükleyin:**
    ```bash
    npm install
    ```

4.  **Geliştirme sunucusunu başlatın:**
    ```bash
    npm start
    ```
    Uygulama, tarayıcınızda `http://localhost:3000` adresinde otomatik olarak açılacaktır.

