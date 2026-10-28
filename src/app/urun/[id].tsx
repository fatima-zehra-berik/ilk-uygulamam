import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// B. Örnek veri sözleşmesi (Hocanın istedikleri + En az 3 ürün daha eklenmiş hali)
const products = [
  {
    id: "p1",
    name: "Kablosuz Fare",
    price: 450,
    category: "Aksesuar",
    stock: 8,
    description: "Bluetooth bağlantılı ergonomik fare",
  },
  {
    id: "p2",
    name: "Mekanik Klavye",
    price: 1800,
    category: "Aksesuar",
    stock: 0,
    description: "Mekanik tuşlu oyuncu klavyesi",
  },
  {
    id: "p3",
    name: "Oyuncu Kulaklığı",
    price: 1200,
    category: "Ses",
    stock: 5,
    description: "7.1 sanal çevresel ses destekli mikrofonlu kulaklık",
  },
  {
    id: "p4",
    name: '27" Oyuncu Monitörü',
    price: 5500,
    category: "Ekran",
    stock: 3,
    description: "144Hz 1ms IPS panel oyuncu monitörü",
  },
  {
    id: "p5",
    name: "HD Web Kamerası",
    price: 750,
    category: "Kamera",
    stock: 0,
    description: "1080p 30fps yayıncı web kamerası",
  },
];

export default function UrunDetayEkrani() {
  const router = useRouter();
  // C. Görevler: [id].jsx ekranında useLocalSearchParams kullanın
  const { id } = useLocalSearchParams();

  // URL'den gelen ID'ye göre ürünü buluyoruz
  const urun = products.find((item) => item.id === id);

  // C. Görevler: Ürün bulunmadığında hata ekranı gösterin
  if (!urun) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <Text style={styles.errorTitle}>Ürün Bulunamadı!</Text>
        <Text style={styles.errorText}>
          Aradığınız {id} kodlu ürün katalogda mevcut değil.
        </Text>
        <Pressable style={styles.errorButton} onPress={() => router.back()}>
          <Text style={styles.errorButtonText}>◀ Kataloğa Geri Dön</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  // C. Görevler: Stok 0 ise "Stokta yok", diğer durumda "Stokta" yazdırın
  const stokMevcut = urun.stock > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Geri gezinme işlevi */}
      <Pressable style={styles.ustGeriButon} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={20} color="#0f172a" />
        <Text style={styles.ustGeriButonMetin}>Kataloğa Dön</Text>
      </Pressable>

      <View style={styles.detayKart}>
        <Text style={styles.kategoriText}>{urun.category.toUpperCase()}</Text>
        <Text style={styles.urunAdi}>{urun.name}</Text>
        <Text style={styles.urunFiyat}>{urun.price} TL</Text>

        <Text style={styles.aciklamaBaslik}>Ürün Açıklaması</Text>
        <Text style={styles.aciklamaMetin}>{urun.description}</Text>

        {/* Stok Durumu Göstergesi */}
        <View style={styles.stokAlani}>
          <Text style={styles.stokEtiket}>Stok Durumu:</Text>
          <View
            style={[
              styles.stokBadge,
              { backgroundColor: stokMevcut ? "#dcfce7" : "#fee2e2" },
            ]}
          >
            <Text
              style={[
                styles.stokText,
                { color: stokMevcut ? "#166534" : "#991b1b" },
              ]}
            >
              {stokMevcut ? `Stokta (${urun.stock} Adet)` : "Stokta Yok ❌"}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Kendi tasarım kararlarımız (Modern Soft minimalist yerleşim ve net tipografi)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 20 },
  ustGeriButon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ustGeriButonMetin: {
    color: "#0f172a",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 4,
  },
  detayKart: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 20,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  kategoriText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6366f1",
    letterSpacing: 1,
  },
  urunAdi: { fontSize: 24, fontWeight: "bold", color: "#0f172a", marginTop: 8 },
  urunFiyat: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 12,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  aciklamaBaslik: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
    marginTop: 24,
    marginBottom: 6,
  },
  aciklamaMetin: { fontSize: 15, color: "#334155", lineHeight: 22 },
  stokAlani: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 16,
  },
  stokEtiket: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginRight: 10,
  },
  stokBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  stokText: { fontSize: 13, fontWeight: "700" },
  errorContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ef4444",
    marginTop: 16,
  },
  errorText: {
    fontSize: 15,
    color: "#475569",
    textAlign: "center",
    marginTop: 8,
  },
  errorButton: {
    backgroundColor: "#0f172a",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 24,
  },
  errorButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "bold" },
});
