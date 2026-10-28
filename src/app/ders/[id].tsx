import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Hocanın föyde verdiği resmi örnek ders kayıtları ve öğretim elemanları
const derslerVerisi = [
  {
    id: "d1",
    name: "Mobil Programlama",
    day: "Salı",
    time: "09.00",
    room: "Lab 2",
    teacher: "Dr. Öğr. Üyesi Ahmet Yılmaz",
  },
  {
    id: "d2",
    name: "JavaScript",
    day: "Çarşamba",
    time: "13.00",
    room: "Lab 1",
    teacher: "Öğr. Gör. Elif Kaya",
  },
  {
    id: "d3",
    name: "Web Tasarımı",
    day: "Perşembe",
    time: "10.00",
    room: "Derslik 3",
    teacher: "Doç. Dr. Murat Demir",
  },
  {
    id: "d4",
    name: "Veritabanı",
    day: "Cuma",
    time: "11.00",
    room: "Lab 4",
    teacher: "Dr. Öğr. Üyesi Seda Aydın",
  },
];

export default function DersDetayEkrani() {
  const router = useRouter();
  // Dinamik rota üzerinden ders ID'sini okuyoruz
  const { id } = useLocalSearchParams();

  // ID değerine göre ilgili dersi veri tablomuzdan çekiyoruz
  const ders = derslerVerisi.find((item) => item.id === id);

  // Föy Kuralı: Hatalı ID denemesinde kontrollü bilgi mesajı gösterin (Çökme Koruması)
  if (!ders) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="school-outline" size={64} color="#e11d48" />
        <Text style={styles.errorTitle}>Ders Kaydı Bulunmadı</Text>
        <Text style={styles.errorText}>
          Aradığınız {id} kodlu ders programda yer almamaktadır.
        </Text>
        <Pressable style={styles.errorButton} onPress={() => router.back()}>
          <Text style={styles.errorButtonText}>◀ Program Listesine Dön</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Föy Kuralı: Geri seçeneği yer alsın */}
      <Pressable style={styles.ustGeriButon} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#0f172a" />
        <Text style={styles.ustGeriButonMetin}>Ders Programı</Text>
      </Pressable>

      <View style={styles.detayKart}>
        <View style={styles.kodKapsayici}>
          <Text style={styles.dersKodu}>{ders.id.toUpperCase()}</Text>
        </View>
        <Text style={styles.dersAdi}>{ders.name}</Text>

        <View style={styles.ayrisimCizgisi} />

        {/* Tüm ders bilgileri listeleniyor */}
        <View style={styles.bilgiAlani}>
          <Ionicons name="calendar-outline" size={18} color="#64748b" />
          <Text style={styles.bilgiMetni}>
            <Text style={styles.kalinEtiket}>Gün:</Text> {ders.day}
          </Text>
        </View>

        <View style={styles.bilgiAlani}>
          <Ionicons name="time-outline" size={18} color="#64748b" />
          <Text style={styles.bilgiMetni}>
            <Text style={styles.kalinEtiket}>Saat:</Text> {ders.time}
          </Text>
        </View>

        <View style={styles.bilgiAlani}>
          <Ionicons name="business-outline" size={18} color="#64748b" />
          <Text style={styles.bilgiMetni}>
            <Text style={styles.kalinEtiket}>Sınıf / Salon:</Text> {ders.room}
          </Text>
        </View>

        <View style={styles.bilgiAlani}>
          <Ionicons name="person-outline" size={18} color="#64748b" />
          <Text style={styles.bilgiMetni}>
            <Text style={styles.kalinEtiket}>Öğretim Elemanı:</Text>{" "}
            {ders.teacher}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Tasarım kararı: Akademik şablon yapısına uygun lacivert/indigo ağırlıklı hiyerarşi
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
    marginLeft: 6,
  },
  detayKart: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  kodKapsayici: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  dersKodu: { color: "#4338ca", fontWeight: "700", fontSize: 12 },
  dersAdi: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 10,
  },
  ayrisimCizgisi: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginVertical: 15,
  },
  bilgiAlani: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  bilgiMetni: { fontSize: 15, color: "#334155" },
  kalinEtiket: { fontWeight: "600", color: "#64748b" },
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
    color: "#e11d48",
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
