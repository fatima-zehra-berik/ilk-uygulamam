import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 4. Adım: Örnek verilerimizi koruyoruz ve durum metinlerini föye göre güncelliyoruz
const baslangicTalepleri = [
  {
    id: "1001",
    baslik: "Bilgisayar açılmıyor",
    kategori: "Bilgisayar",
    birim: "Öğrenci İşleri",
    oncelik: "Yüksek",
    durum: "Bekliyor",
    konum: "A Blok 204",
  },
  {
    id: "1002",
    baslik: "Yazıcı bağlantı sorunu",
    kategori: "Yazıcı",
    birim: "Personel Daire Başkanlığı",
    oncelik: "Orta",
    durum: "İşlemde",
    konum: "B Blok Zemin",
  },
  {
    id: "1003",
    baslik: "İnternet bağlantısı kesildi",
    kategori: "İnternet",
    birim: "Kütüphane",
    oncelik: "Yüksek",
    durum: "Bekliyor",
    konum: "Merkez Kütüphane",
  },
  {
    id: "1004",
    baslik: "Ofis yazılımı hata veriyor",
    kategori: "Yazılım",
    birim: "Muhasebe",
    oncelik: "Düşük",
    durum: "Çözüldü",
    konum: "Rektörlük 105",
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
    konum: "İdari İşler",
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

const filtreler = ["Tümü", "Bekliyor", "İşlemde", "Çözüldü"];

// Föy Şartı: Bekliyor=Turuncu, İşlemde=Mavi, Çözüldü=Yeşil
const durumRengi = (durum: string) => {
  if (durum === "Bekliyor") return "#f97316";
  if (durum === "İşlemde") return "#2563eb";
  return "#16a34a";
};

function TalepKarti({ talep }: { talep: any }) {
  const router = useRouter();

  return (
    // 5. Adım: onPress tetiklendiğinde dinamik rotaya geçiş yapıyoruz (/ariza/[id])
    <Pressable
      style={styles.ticketCard}
      onPress={() => router.push(`/ariza/${talep.id}` as any)}
    >
      <View style={styles.ticketTop}>
        <Text style={styles.ticketId}>#{talep.id}</Text>
        <Text style={styles.ticketLocation} numberOfLines={1}>
          📍 {talep.konum}
        </Text>
      </View>

      <Text style={styles.ticketTitle}>{talep.baslik}</Text>

      <View style={styles.ticketBottom}>
        {/* Föy Şartı: Başlık, Konum ve Durum gösteren StatusBadge */}
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: durumRengi(talep.durum) },
          ]}
        >
          <Text style={styles.statusText}>{talep.durum}</Text>
        </View>
        <Text style={styles.ticketDetailClickHint}>Detay Gör ➔</Text>
      </View>
    </Pressable>
  );
}

export default function TeknikDestekPaneli() {
  const router = useRouter();
  const [aktifFiltre, setAktifFiltre] = useState("Tümü");

  const filtreliTalepler = baslangicTalepleri.filter((item) => {
    if (aktifFiltre === "Tümü") return true;
    return item.durum === aktifFiltre;
  });

  const listeBasligi = (
    <View>
      <Pressable
        style={{ marginTop: 14, marginBottom: 5 }}
        onPress={() => router.back()}
      >
        <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
          ◀ Ana Menüye Dön
        </Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.headerLabel}>BİLGİ İŞLEM DAİRE BAŞKANLIĞI</Text>
        <Text style={styles.title}>Teknik Destek Listesi</Text>
        <Text style={styles.subtitle}>
          Detaylı incelemek istediğiniz arıza kaydına dokunun.
        </Text>
      </View>

      {/* FİLTRELER */}
      <View style={styles.filterContainer}>
        {filtreler.map((filtre) => (
          <Pressable
            key={filtre}
            onPress={() => setAktifFiltre(filtre)}
            style={[
              styles.filterButton,
              aktifFiltre === filtre && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                aktifFiltre === filtre && styles.activeFilterText,
              ]}
            >
              {filtre}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />
      <FlatList
        data={filtreliTalepler}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TalepKarti talep={item} />}
        ListHeaderComponent={listeBasligi}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  listContent: { paddingHorizontal: 20, paddingBottom: 45, flexGrow: 1 },
  header: {
    backgroundColor: "#dbeafe",
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    marginBottom: 18,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1d4ed8",
    letterSpacing: 0.8,
  },
  title: { fontSize: 25, fontWeight: "bold", color: "#0f172a", marginTop: 9 },
  subtitle: { fontSize: 14, color: "#475569", marginTop: 8 },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  activeFilter: { backgroundColor: "#2563eb" },
  filterText: { color: "#475569", fontSize: 13, fontWeight: "600" },
  activeFilterText: { color: "#ffffff" },
  ticketCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 13,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  ticketTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketId: { color: "#64748b", fontSize: 13, fontWeight: "bold" },
  ticketLocation: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "500",
    maxWidth: "60%",
  },
  ticketTitle: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 12,
  },
  ticketBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  statusText: { color: "#ffffff", fontSize: 12, fontWeight: "bold" },
  ticketDetailClickHint: { fontSize: 13, color: "#2563eb", fontWeight: "600" },
});
