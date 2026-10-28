import { Ionicons } from "@expo/vector-icons";
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

const derslerVerisi = [
  {
    id: "d1",
    name: "Mobil Programlama",
    day: "Salı",
    time: "09.00",
    room: "Lab 2",
  },
  {
    id: "d2",
    name: "JavaScript",
    day: "Çarşamba",
    time: "13.00",
    room: "Lab 1",
  },
  {
    id: "d3",
    name: "Web Tasarımı",
    day: "Perşembe",
    time: "10.00",
    room: "Derslik 3",
  },
  { id: "d4", name: "Veritabanı", day: "Cuma", time: "11.00", room: "Lab 4" },
];

const gunFiltreleri = ["Tümü", "Salı", "Çarşamba", "Perşembe", "Cuma"];

// Föy Kuralı: CourseCard bileşeni kullanın (Props üzerinden tek ders alır)
function CourseCard({ ders }: { ders: any }) {
  const router = useRouter();

  return (
    // Föy Kuralı: Kart seçildiğinde dinamik ders detay ekranına yönlendirin (/ders/[id])
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/ders/${ders.id}` as any)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardId}>{ders.id.toUpperCase()}</Text>
        <View style={styles.roomBadge}>
          <Text style={styles.roomText}>📍 {ders.room}</Text>
        </View>
      </View>

      <Text style={styles.cardName}>{ders.name}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.zamanKutusu}>
          <Ionicons name="calendar-outline" size={14} color="#4f46e5" />
          <Text style={styles.zamanMetni}>
            {ders.day} • {ders.time}
          </Text>
        </View>
        <Text style={styles.detayYazi}>İncele ➔</Text>
      </View>
    </Pressable>
  );
}

export default function DersProgramiEkrani() {
  const router = useRouter();
  // Föy Kuralı: Ana sayfada gün veya ders filtresi bulunması tercih edilir
  const [seciliGun, setSeciliGun] = useState("Tümü");

  const filtreliDersler = derslerVerisi.filter((item) => {
    if (seciliGun === "Tümü") return true;
    return item.day === seciliGun;
  });

  const listeBasligi = (
    <View>
      <Pressable style={styles.ustGeriButon} onPress={() => router.back()}>
        <Text style={styles.ustGeriButonMetin}>◀ Ana Menüye Dön</Text>
      </Pressable>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Öğrenci Bilgi Sistemi</Text>
        <Text style={styles.headerSubtitle}>Haftalık Ders Programı</Text>
      </View>

      {/* Gün Filtreleri */}
      <Text style={styles.filtreEtiket}>Gün Seçimi:</Text>
      <View style={styles.filterContainer}>
        {gunFiltreleri.map((gun) => (
          <Pressable
            key={gun}
            onPress={() => setSeciliGun(gun)}
            style={[
              styles.filterButton,
              seciliGun === gun && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                seciliGun === gun && styles.activeFilterText,
              ]}
            >
              {gun}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <FlatList
        data={filtreliDersler}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard ders={item} />}
        ListHeaderComponent={listeBasligi}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  ustGeriButon: { marginTop: 14, marginBottom: 10 },
  ustGeriButonMetin: { color: "#4f46e5", fontWeight: "bold", fontSize: 14 },
  headerBox: {
    backgroundColor: "#e0e7ff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1e1b4b" },
  headerSubtitle: { fontSize: 14, color: "#4338ca", marginTop: 4 },
  filtreEtiket: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
    marginTop: 5,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeFilter: { backgroundColor: "#4f46e5" },
  filterText: { color: "#475569", fontSize: 12, fontWeight: "600" },
  activeFilterText: { color: "#ffffff" },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardId: { fontSize: 12, fontWeight: "700", color: "#4f46e5" },
  roomBadge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roomText: { fontSize: 11, fontWeight: "600", color: "#475569" },
  cardName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 8,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  zamanKutusu: { flexDirection: "row", alignItems: "center", gap: 4 },
  zamanMetni: { fontSize: 12, color: "#4f46e5", fontWeight: "600" },
  detayYazi: { fontSize: 13, color: "#4f46e5", fontWeight: "600" },
});
