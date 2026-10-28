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
        <Text style={styles.buttonText}>Teknik Destek Formu 🛠️</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.listeButton]}
        onPress={() => router.push("/liste")}
      >
        <Text style={styles.buttonText}>Arıza Takip Navigasyonu 📊</Text>
      </TouchableOpacity>

      {/* UYGULAMA 2 BUTONLARI */}

      <TouchableOpacity
        style={[styles.button, styles.katalogButton]}
        onPress={() => router.push("/katalog" as any)}
      >
        <Text style={styles.buttonText}>Mini Ürün Kataloğu 🛍️</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.hataButton]}
        onPress={() => router.push("/urun/p999" as any)}
      >
        <Text style={styles.buttonText}>Katalog Hata Testi (p999) 🚨</Text>
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
    gap: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 270,
    alignItems: "center",
  },
  profilButton: { backgroundColor: "#2ed573" },
  destekButton: { backgroundColor: "#6c5ce7" },
  listeButton: { backgroundColor: "#e67e22" },
  katalogButton: { backgroundColor: "#6366f1" }, // İndigo mavi katalog rengi
  hataButton: { backgroundColor: "#dc2626" },
  buttonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});
