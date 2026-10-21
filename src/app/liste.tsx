import { Ionicons } from "@expo/vector-icons"; // Görev 4: Simgeler için kütüphane
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// 1. ÖRNEK TALEP VERİLERİ
const baslangicTalepleri = [
  {
    id: "TLP-1001",
    baslik: "Bilgisayar açılmıyor",
    kategori: "Bilgisayar",
    birim: "Öğrenci İşleri",
    oncelik: "Yüksek",
    durum: "Açık",
  },
  {
    id: "TLP-1002",
    baslik: "Yazıcı bağlantı sorunu",
    kategori: "Yazıcı",
    birim: "Personel Daire Başkanlığı",
    oncelik: "Orta",
    durum: "İşlemde",
  },
  {
    id: "TLP-1003",
    baslik: "İnternet bağlantısı kesildi",
    kategori: "İnternet",
    birim: "Kütüphane",
    oncelik: "Yüksek",
    durum: "Açık",
  },
  {
    id: "TLP-1004",
    baslik: "Ofis yazılımı hata veriyor",
    kategori: "Yazılım",
    birim: "Muhasebe",
    oncelik: "Düşük",
    durum: "Tamamlandı",
  },
  {
    id: "TLP-1005",
    baslik: "Bilgisayar çok yavaş",
    kategori: "Bilgisayar",
    birim: "Mühendislik Fakültesi",
    oncelik: "Orta",
    durum: "İşlemde",
  },
  {
    id: "TLP-1006",
    baslik: "Yazıcı kağıt sıkıştırıyor",
    kategori: "Yazıcı",
    birim: "Rektörlük",
    oncelik: "Düşük",
    durum: "Tamamlandı",
  },
  {
    id: "TLP-1007",
    baslik: "Kablosuz ağ çalışmıyor",
    kategori: "İnternet",
    birim: "Merkezi Derslikler",
    oncelik: "Yüksek",
    durum: "Açık",
  },
  {
    id: "TLP-1008",
    baslik: "Program lisans sorunu",
    kategori: "Yazılım",
    birim: "Bilgi İşlem",
    oncelik: "Orta",
    durum: "İşlemde",
  },
];

// 2. SABİT SEÇENEKLER (Görev 1: Öncelik filtreleri eklendi)
const durumFiltreleri = ["Tümü", "Açık", "İşlemde", "Tamamlandı"];
const oncelikFiltreleri = ["Tümü", "Düşük", "Orta", "Yüksek"];

// Görev 4: Kategori simge eşleştirme fonksiyonu
const getKategoriSimgesi = (kategori: string): any => {
  if (kategori === "Bilgisayar") return "desktop-outline";
  if (kategori === "Yazıcı") return "print-outline";
  if (kategori === "İnternet") return "wifi-outline";
  return "code-working-outline"; // Yazılım için
};

// 3. RENK YARDIMCI FONKSİYONLARI
const oncelikRengi = (oncelik: string) => {
  if (oncelik === "Yüksek") return "#dc2626";
  if (oncelik === "Orta") return "#d97706";
  return "#16a34a";
};

const durumRengi = (durum: string) => {
  if (durum === "Açık") return "#dc2626";
  if (durum === "İşlemde") return "#2563eb";
  return "#16a34a";
};

// 4. ÖZET KARTI BİLEŞENİ (Görev 4: İkon desteği eklendi)
function OzetKarti({
  baslik,
  sayi,
  renk,
  genislik,
  ikon,
}: {
  baslik: string;
  sayi: number;
  renk: string;
  genislik: number;
  ikon: any;
}) {
  return (
    <View style={[styles.summaryCard, { width: genislik }]}>
      <View style={styles.summaryTopRow}>
        <View style={[styles.summaryIndicator, { backgroundColor: renk }]} />
        <Ionicons name={ikon} size={18} color={renk} />
      </View>
      <Text style={[styles.summaryNumber, { color: renk }]}>{sayi}</Text>
      <Text style={styles.summaryLabel}>{baslik}</Text>
    </View>
  );
}

// 5. TALEP KARTI BİLEŞENİ (Görev 2: Detay Alanı & Görev 4: Kategori Simgesi)
function TalepKarti({
  talep,
  onDurumDegistir,
}: {
  talep: any;
  onDurumDegistir: (id: string) => void;
}) {
  const [detayAcik, setDetayAcik] = useState(false); // Görev 2: useState ile açılır-kapanır yönetim
  const tamamlandi = talep.durum === "Tamamlandı";

  return (
    <Pressable
      style={styles.ticketCard}
      onPress={() => setDetayAcik(!detayAcik)}
    >
      {/* ÜST SATIR */}
      <View style={styles.ticketTop}>
        <Text style={styles.ticketId}>{talep.id}</Text>
        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: oncelikRengi(talep.oncelik) + "18" },
          ]}
        >
          <Text
            style={[
              styles.priorityText,
              { color: oncelikRengi(talep.oncelik) },
            ]}
          >
            {talep.oncelik}
          </Text>
        </View>
      </View>

      {/* ARIZA BAŞLIĞI & SİMGE (Görev 4) */}
      <View style={styles.ticketTitleRow}>
        <Ionicons
          name={getKategoriSimgesi(talep.kategori)}
          size={20}
          color="#475569"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.ticketTitle}>{talep.baslik}</Text>
      </View>

      {/* KATEGORİ VE BİRİM */}
      <Text style={styles.ticketDetail}>
        {talep.kategori} • {talep.birim}
      </Text>

      {/* GÖREV 2: KOŞULLU RENDER EDİLEN DETAY KARTI ALANI */}
      {detayAcik && (
        <View style={styles.detayAlani}>
          <Text style={styles.detayBaslik}>Talep Detay Bilgileri</Text>
          <Text style={styles.detayMetin}>
            <Text style={styles.detayEtiket}>Talep No:</Text> {talep.id}
          </Text>
          <Text style={styles.detayMetin}>
            <Text style={styles.detayEtiket}>Arıza:</Text> {talep.baslik}
          </Text>
          <Text style={styles.detayMetin}>
            <Text style={styles.detayEtiket}>Kategori:</Text> {talep.kategori}
          </Text>
          <Text style={styles.detayMetin}>
            <Text style={styles.detayEtiket}>Birim:</Text> {talep.birim}
          </Text>
          <Text style={styles.detayMetin}>
            <Text style={styles.detayEtiket}>Öncelik:</Text> {talep.oncelik}
          </Text>
          <Text style={styles.detayMetin}>
            <Text style={styles.detayEtiket}>Durum:</Text> {talep.durum}
          </Text>
          <Text style={styles.detayKapatKlavuz}>
            Kapatmak için karta tekrar dokunun.
          </Text>
        </View>
      )}

      {/* ALT SATIR */}
      <View style={styles.ticketBottom}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: durumRengi(talep.durum) + "18" },
          ]}
        >
          <Text style={[styles.statusText, { color: durumRengi(talep.durum) }]}>
            {talep.durum}
          </Text>
        </View>

        {!tamamlandi && (
          <Pressable
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              onDurumDegistir(talep.id);
            }}
          >
            <Text style={styles.actionText}>
              {talep.durum === "Açık" ? "İşleme Al →" : "Tamamla ✓"}
            </Text>
          </Pressable>
        )}

        {tamamlandi && (
          <Text style={styles.completedText}>İşlem tamamlandı</Text>
        )}
      </View>
    </Pressable>
  );
}

// 6. ANA YÖNETİM PANELİ
function TeknikDestekPaneli() {
  const router = useRouter();
  const [talepler, setTalepler] = useState(baslangicTalepleri);
  const [aktifDurumFiltre, setAktifDurumFiltre] = useState("Tümü");
  const [aktifOncelikFiltre, setAktifOncelikFiltre] = useState("Tümü"); // Görev 1
  const { width } = useWindowDimensions();

  const sutunSayisi = width >= 600 ? 4 : 2;
  const kartGenisligi = (width - 40 - (sutunSayisi - 1) * 10) / sutunSayisi;

  // SAYAÇLAR
  const toplam = talepler.length;
  const acik = talepler.filter((item) => item.durum === "Açık").length;
  const islemde = talepler.filter((item) => item.durum === "İşlemde").length;
  const tamamlanan = talepler.filter(
    (item) => item.durum === "Tamamlandı",
  ).length;

  // GÖREV 1: ÇİFT FİLTRELEME MANTIĞI VE SAYAÇ GÜNCELLEMESİ
  const filtreliTalepler = talepler.filter((item) => {
    const durumUygun =
      aktifDurumFiltre === "Tümü" || item.durum === aktifDurumFiltre;
    const oncelikUygun =
      aktifOncelikFiltre === "Tümü" || item.oncelik === aktifOncelikFiltre;
    return durumUygun && oncelikUygun;
  });

  // GÖREV 3: ÖNCELİĞE GÖRE SIRALAMA (SORT) - ORİJİNAL DİZİYİ BOZMADAN KOPYASI ÜZERİNDEN
  const siraliTalepler = [...filtreliTalepler].sort((a, b) => {
    const oncelikDegerleri: { [key: string]: number } = {
      Yüksek: 3,
      Orta: 2,
      Düşük: 1,
    };
    return oncelikDegerleri[b.oncelik] - oncelikDegerleri[a.oncelik];
  });

  const durumDegistir = (id: string) => {
    setTalepler((oncekiTalepler) =>
      oncekiTalepler.map((item) => {
        if (item.id !== id) return item;
        let yeniDurum = item.durum;
        if (item.durum === "Açık") yeniDurum = "İşlemde";
        else if (item.durum === "İşlemde") yeniDurum = "Tamamlandı";
        return { ...item, durum: yeniDurum };
      }),
    );
  };

  const listeBasligi = (
    <View>
      <Pressable style={styles.ustGeriButon} onPress={() => router.back()}>
        <Text style={styles.ustGeriButonMetin}>◀ Ana Menüye Dön</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.headerLabel}>BİLGİ İŞLEM DAİRE BAŞKANLIĞI</Text>
        <Text style={styles.title}>Teknik Destek Paneli</Text>
        <Text style={styles.subtitle}>Destek taleplerini buradan yönetin.</Text>
      </View>

      {/* GÖREV 4: SİMGELİ ÖZET KARTLARI */}
      <View style={styles.summaryGrid}>
        <OzetKarti
          baslik="Toplam Talep"
          sayi={toplam}
          renk="#2563eb"
          genislik={kartGenisligi}
          ikon="analytics-outline"
        />
        <OzetKarti
          baslik="Açık Talep"
          sayi={acik}
          renk="#dc2626"
          genislik={kartGenisligi}
          ikon="alert-circle-outline"
        />
        <OzetKarti
          baslik="İşlemde"
          sayi={islemde}
          renk="#d97706"
          genislik={kartGenisligi}
          ikon="cog-outline"
        />
        <OzetKarti
          baslik="Tamamlanan"
          sayi={tamamlanan}
          renk="#16a34a"
          genislik={kartGenisligi}
          ikon="checkmark-done-circle-outline"
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Destek Talepleri</Text>
        <Text style={styles.sectionCount}>
          {siraliTalepler.length} kayıt listelendi
        </Text>
      </View>

      {/* FİLTRE BÖLÜMÜ BAŞLIKLARI VE GÖREV 4 GÖRÜNÜRLÜK ARTIRMA */}
      <Text style={styles.filtreGrupEtiket}>Durumuna Göre Filtrele:</Text>
      <View style={styles.filterContainer}>
        {durumFiltreleri.map((filtre) => (
          <Pressable
            key={filtre}
            onPress={() => setAktifDurumFiltre(filtre)}
            style={[
              styles.filterButton,
              aktifDurumFiltre === filtre && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                aktifDurumFiltre === filtre && styles.activeFilterText,
              ]}
            >
              {filtre}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* GÖREV 1: ÖNCELİK FİLTRE BUTONLARI GRUBU */}
      <Text style={styles.filtreGrupEtiket}>
        Öncelik Seviyesine Göre Filtrele:
      </Text>
      <View style={styles.filterContainer}>
        {oncelikFiltreleri.map((filtre) => (
          <Pressable
            key={filtre}
            style={[
              styles.filterButton,
              styles.oncelikFiltreButon,
              aktifOncelikFiltre === filtre && {
                backgroundColor: "#475569",
                borderColor: "#475569",
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                aktifOncelikFiltre === filtre && styles.activeFilterText,
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
        data={siraliTalepler} // Görev 3: Sıralanmış ve çift filtrelenmiş veri kaynağı
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TalepKarti talep={item} onDurumDegistir={durumDegistir} />
        )}
        ListHeaderComponent={listeBasligi}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Kayıt bulunamadı</Text>
            <Text style={styles.emptyText}>
              Seçilen kriterlere uygun aktif destek talebi yok.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <TeknikDestekPaneli />
    </SafeAreaProvider>
  );
}

// 12. GELİŞTİRİLMİŞ STİLLER (Görev 4: Görsel hiyerarşi ve taşma korumaları)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  listContent: { paddingHorizontal: 20, paddingBottom: 45, flexGrow: 1 },
  ustGeriButon: { marginTop: 14, marginBottom: 5 },
  ustGeriButonMetin: { color: "#2563eb", fontWeight: "bold", fontSize: 14 },
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
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 13,
    padding: 14,
    minHeight: 100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  summaryTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  summaryIndicator: { width: 20, height: 4, borderRadius: 2 },
  summaryNumber: { fontSize: 26, fontWeight: "bold" },
  summaryLabel: { color: "#64748b", fontSize: 12, marginTop: 3 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 19, fontWeight: "bold", color: "#0f172a" },
  sectionCount: { fontSize: 13, color: "#64748b", fontWeight: "500" },
  filtreGrupEtiket: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginTop: 10,
  },
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
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  oncelikFiltreButon: { backgroundColor: "#f8fafc" },
  activeFilter: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
  filterText: { color: "#475569", fontSize: 13, fontWeight: "600" },
  activeFilterText: { color: "#ffffff" },
  ticketCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 13,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  ticketTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  ticketId: { color: "#64748b", fontSize: 12, fontWeight: "500" },
  priorityBadge: {
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priorityText: { fontSize: 12, fontWeight: "bold" },
  ticketTitleRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  ticketTitle: { color: "#0f172a", fontSize: 16, fontWeight: "bold", flex: 1 },
  ticketDetail: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 6,
    paddingLeft: 26,
  },
  ticketBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    gap: 10,
    paddingLeft: 26,
  },
  statusBadge: { paddingHorizontal: 11, paddingVertical: 6, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: "bold" },
  actionButton: {
    backgroundColor: "#dbeafe",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionText: { color: "#1d4ed8", fontSize: 12, fontWeight: "bold" },
  completedText: { fontSize: 12, color: "#16a34a", fontWeight: "600" },
  detayAlani: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    marginLeft: 26,
  },
  detayBaslik: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 4,
  },
  detayMetin: { fontSize: 13, color: "#334155", marginTop: 3 },
  detayEtiket: { fontWeight: "700", color: "#475569" },
  detayKapatKlavuz: {
    fontSize: 11,
    color: "#94a3b8",
    fontStyle: "italic",
    marginTop: 8,
    textAlign: "right",
  },
  emptyContainer: {
    alignItems: "center",
    padding: 30,
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 12,
  },
  emptyTitle: { fontSize: 17, fontWeight: "bold", color: "#334155" },
  emptyText: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 8,
    textAlign: "center",
  },
});
