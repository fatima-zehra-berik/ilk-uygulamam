import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mobil Programlama Lab - Fatma Zehra Berik</Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/about")}
      >
        <Text style={styles.buttonText}>Hakkımızda Sayfasına Git ➔</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.profilButton]}
        onPress={() => router.push("/profil")}
      >
        <Text style={styles.buttonText}>Profil Kartı Föyünü Aç 📑</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.destekButton]}
        onPress={() => router.push("/destek")}
      >
        <Text style={styles.buttonText}>Teknik Destek Föyü 🛠️</Text>
      </TouchableOpacity>

      {/* 2. ÖDEV: GELİŞMİŞ LİSTE PANELİ BUTONU */}
      <TouchableOpacity
        style={[styles.button, styles.listeButton]}
        onPress={() => router.push("/liste" as any)}
      >
        <Text style={styles.buttonText}>Gelişmiş Destek Paneli 📊</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 15,
  },
  text: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#000" },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 260,
    alignItems: "center",
  },
  profilButton: { backgroundColor: "#2ed573" },
  destekButton: { backgroundColor: "#6c5ce7" },
  listeButton: { backgroundColor: "#e67e22" }, // Turuncu buton stili
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
