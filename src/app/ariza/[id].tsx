import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 4. Adım: Örnek veri kaynağımız (Hocanın istediği doğrulamada kullanılacak)
const arizaVerileri = [
  {
    id: "1001",
    baslik: "Bilgisayar açılmıyor",
    kategori: "Bilgisayar",
    birim: "Öğrenci İşleri",
    oncelik: "Yüksek",
    durum: "Bekliyor",
    konum: "A Blok 204. Ofis",
  },
  {
    id: "1002",
    baslik: "Yazıcı bağlantı sorunu",
    kategori: "Yazıcı",
    birim: "Personel Daire Başkanlığı",
    oncelik: "Orta",
    durum: "İşlemde",
    konum: "B Blok Zemin Kat",
  },
  {
    id: "1003",
    baslik: "İnternet bağlantısı kesildi",
    kategori: "İnternet",
    birim: "Kütüphane",
    oncelik: "Yüksek",
    durum: "Bekliyor",
    konum: "Merkez Kütüphane Kat 1",
  },
  {
    id: "1004",
    baslik: "Ofis yazılımı hata veriyor",
    kategori: "Yazılım",
    birim: "Muhasebe",
    oncelik: "Düşük",
    durum: "Çözüldü",
    konum: "Rektörlük 105. Ofis",
  },
  {
    id: "1005",
    baslik: "Bilgisayar çok yavaş",
    kategori: "Bilgisayar",
    birim: "Mühendislik Fakültesi",
    oncelik: "Orta",
    durum: "İşlemde",
    konum: "C Blok Lab 3",
  },
  {
    id: "1006",
    baslik: "Yazıcı kağıt sıkıştırıyor",
    kategori: "Yazıcı",
    birim: "Rektörlük",
    oncelik: "Düşük",
    durum: "Çözüldü",
    konum: "İdari İşler Odası",
  },
  {
    id: "1007",
    baslik: "Kablosuz ağ çalışmıyor",
    kategori: "İnternet",
    birim: "Merkezi Derslikler",
    oncelik: "Yüksek",
    durum: "Bekliyor",
    konum: "D Blok Amfi 2",
  },
  {
    id: "1008",
    baslik: "Program lisans sorunu",
    kategori: "Yazılım",
    birim: "Bilgi İşlem",
    oncelik: "Orta",
    durum: "İşlemde",
    konum: "Sunucu Odası",
  },
];

export default function ArizaDetayEkrani() {
  const router = useRouter();
  // 6. Adım: useLocalSearchParams ile URL'den gelen dinamik ID'yi okuyoruz
  const { id } = useLocalSearchParams();

  // Gelen ID'ye göre doğru arıza kaydını arıyoruz
  const ariza = arizaVerileri.find((item) => item.id === id);

  // Föy Şartı: Bekliyor = Turuncu, İşlemde = Mavi, Çözüldü = Yeşil StatusBadge
  const getDurumRengi = (durum: string) => {
    if (durum === "Bekliyor") return "#f97316";
    if (durum === "İşlemde") return "#2563eb";
    return "#16a34a"; // Çözüldü
  };

  // Föy Şartı: Olmayan /ariza/999 gibi bir adrese gidildiğinde çökme yerine anlamlı uyarı gösterin
  if (!ariza) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="warning-outline" size={64} color="#dc2626" />
        <Text style={styles.errorTitle}>Arıza Kaydı Bulunamadı!</Text>
        <Text style={styles.errorText}>
          Aradığınız {id} numaralı arıza talebi sistemde mevcut değil.
        </Text>
        <Pressable style={styles.errorButton} onPress={() => router.back()}>
          <Text style={styles.errorButtonText}>◀ Listeye Geri Dön</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />

      <Pressable style={styles.ustGeriButon} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#2563eb" />
        <Text style={styles.ustGeriButonMetin}> Listeye Dön</Text>
      </Pressable>

      <View style={styles.headerArea}>
        <Text style={styles.idEtiket}>ARIZA TALEP NO: #{ariza.id}</Text>
        <Text style={styles.mainTitle}>{ariza.baslik}</Text>
      </View>

      <View style={styles.detayKart}>
        <Text style={styles.detayBaslik}>Talep Ayrıntıları</Text>

        <View style={styles.bilgiSatiri}>
          <Text style={styles.etiket}>Kategori:</Text>
          <Text style={styles.deger}>{ariza.kategori}</Text>
        </View>

        <View style={styles.bilgiSatiri}>
          <Text style={styles.etiket}>Bildiren Birim:</Text>
          <Text style={styles.deger}>{ariza.birim}</Text>
        </View>

        <View style={styles.bilgiSatiri}>
          <Text style={styles.etiket}>Arıza Konumu:</Text>
          <Text style={styles.deger}>{ariza.konum}</Text>
        </View>

        <View style={styles.bilgiSatiri}>
          <Text style={styles.etiket}>Öncelik Seviyesi:</Text>
          <Text style={styles.deger}>{ariza.oncelik}</Text>
        </View>

        <View style={styles.bilgiSatiri}>
          <Text style={styles.etiket}>Güncel Durum:</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getDurumRengi(ariza.durum) },
            ]}
          >
            <Text style={styles.statusText}>{ariza.durum}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9", padding: 20 },
  ustGeriButon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ustGeriButonMetin: { color: "#2563eb", fontWeight: "bold", fontSize: 16 },
  headerArea: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  idEtiket: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748b",
    letterSpacing: 0.5,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginTop: 6,
  },
  detayKart: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  detayBaslik: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 10,
    marginBottom: 15,
  },
  bilgiSatiri: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  etiket: { fontSize: 14, fontWeight: "600", color: "#64748b" },
  deger: { fontSize: 15, fontWeight: "500", color: "#0f172a" },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  statusText: { color: "#ffffff", fontSize: 13, fontWeight: "bold" },
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
    color: "#dc2626",
    marginTop: 15,
  },
  errorText: {
    fontSize: 15,
    color: "#475569",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  errorButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 25,
  },
  errorButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "bold" },
});
