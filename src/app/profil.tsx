import React from "react";
import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function KimlikKarti() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.kart}>
        {/* 1. Sizin Kendi Fotoğrafınız (Doğrudan src klasöründen çekiliyor) */}
        <Image source={require("../profilim.jpg")} style={styles.profilResmi} />

        {/* 2. Ad-Soyad Bilgisi */}
        <Text style={styles.isimText}>Fatma Zehra Berik</Text>

        {/* 3. Bölüm Bilgisi */}
        <Text style={styles.bolumText}>Yazılım Mühendisliği</Text>

        {/* 4. Konum Bilgisi ve İkon */}
        <View style={styles.konumKonteynir}>
          <Ionicons name="location" size={18} color="#ef4444" />
          <Text style={styles.konumText}>Ankara, Türkiye</Text>
        </View>

        {/* 5. Pressable Butonu */}
        <Pressable
          style={styles.buton}
          onPress={() =>
            Alert.alert("Bilgi", "Tıklama işlemi başarıyla algılandı!")
          }
        >
          <Text style={styles.butonMetni}>Bağlantı Kur 👋</Text>
        </Pressable>

        {/* Ana Menüye Geri Dönüş Linki */}
        <Pressable style={styles.geriButon} onPress={() => router.back()}>
          <Text style={styles.geriButonMetni}>◀ Ana Menüye Dön</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  kart: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: 320,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profilResmi: {
    width: 140,
    height: 140,
    borderRadius: 70, // Tam daire şeklinde yuvarlamak için
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#cbd5e1",
  },
  isimText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  bolumText: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 12,
  },
  konumKonteynir: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 20,
  },
  konumText: {
    fontSize: 14,
    color: "#475569",
  },
  buton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  butonMetni: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  geriButon: {
    marginTop: 20,
  },
  geriButonMetni: {
    color: "#64748b",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
