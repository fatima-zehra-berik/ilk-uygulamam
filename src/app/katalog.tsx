import { useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const products = [
  {
    id: "p1",
    name: "Kablosuz Fare",
    price: 450,
    category: "Aksesuar",
    stock: 8,
  },
  {
    id: "p2",
    name: "Mekanik Klavye",
    price: 1800,
    category: "Aksesuar",
    stock: 0,
  },
  {
    id: "p3",
    name: "Oyuncu Kulaklığı",
    price: 1200,
    category: "Ses",
    stock: 5,
  },
  {
    id: "p4",
    name: '27" Oyuncu Monitörü',
    price: 5500,
    category: "Ekran",
    stock: 3,
  },
  {
    id: "p5",
    name: "HD Web Kamerası",
    price: 750,
    category: "Kamera",
    stock: 0,
  },
];

// C. Görevler: ProductCard bileşeni tanımlayın; props üzerinden tek ürün alsın.
function ProductCard({ item }: { item: any }) {
  const router = useRouter();
  const stoktaVar = item.stock > 0;

  return (
    // C. Görevler: Ürüne basınca router.push ile /urun/<id> ekranını açın.
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/urun/${item.id}` as any)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <View
          style={[
            styles.miniStokBadge,
            { backgroundColor: stoktaVar ? "#dcfce7" : "#fee2e2" },
          ]}
        >
          <Text
            style={[
              styles.miniStokText,
              { color: stoktaVar ? "#166534" : "#991b1b" },
            ]}
          >
            {stoktaVar ? "Stokta" : "Tükendi"}
          </Text>
        </View>
      </View>

      <Text style={styles.cardName}>{item.name}</Text>

      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>{item.price} TL</Text>
        <Text style={styles.incelenmeHint}>İncele ➔</Text>
      </View>
    </Pressable>
  );
}

export default function UrunKataloguEkrani() {
  const router = useRouter();

  const baslikBileseni = (
    <View>
      <Pressable style={styles.ustGeriButon} onPress={() => router.back()}>
        <Text style={styles.ustGeriButonMetin}>◀ Ana Menüye Dön</Text>
      </Pressable>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>Teknoloji Mağazası</Text>
        <Text style={styles.headerSubtitle}>Mini Ürün Kataloğu</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      {/* C. Görevler: Ürün listesinde FlatList kullanın. */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        ListHeaderComponent={baslikBileseni}
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
  ustGeriButonMetin: { color: "#6366f1", fontWeight: "bold", fontSize: 14 },
  headerBox: {
    backgroundColor: "#eef2f6",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#0f172a" },
  headerSubtitle: { fontSize: 14, color: "#475569", marginTop: 4 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
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
  cardCategory: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6366f1",
    textTransform: "uppercase",
  },
  miniStokBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  miniStokText: { fontSize: 10, fontWeight: "bold" },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    marginTop: 8,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: { fontSize: 16, fontWeight: "700", color: "#0f172a" },
  incelenmeHint: { fontSize: 13, color: "#6366f1", fontWeight: "600" },
});
