import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Burası Hakkımızda Sayfası</Text>

      {/* Butona basıldığında bir önceki sayfaya (yani ana sayfaya) geri dön diyoruz */}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>◀ Ana Sayfaya Geri Dön</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#d32f2f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
