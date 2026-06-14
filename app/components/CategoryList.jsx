import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { COLORS } from "../styles/colors";

const CATEGORIAS = [
  { id: "todos",          label: "Todos",            emoji: "⭐" },
  { id: "hamburguer",     label: "Hamburguers",      emoji: "🍔" },
  { id: "crepe",          label: "Crepes",            emoji: "🌮" },
  { id: "acompanhamento", label: "Acompanhamentos",   emoji: "🍟" },
  { id: "bebida",         label: "Bebidas",           emoji: "🥤" },
];

export default function CategoryList({ categoria, setCategoria }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {CATEGORIAS.map((item) => {
        const ativo = categoria === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.pill, ativo && styles.pillAtivo]}
            onPress={() => setCategoria(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.pillEmoji}>{item.emoji}</Text>
            <Text style={[styles.pillText, ativo && styles.pillTextAtivo]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  content: {
    paddingRight: 8,
    gap: 8,
    flexDirection: "row",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pillAtivo: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  pillEmoji: {
    fontSize: 14,
  },
  pillText: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: "500",
  },
  pillTextAtivo: {
    color: "#111",
    fontWeight: "700",
  },
});