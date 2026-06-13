import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { COLORS } from "../styles/colors";

export default function CategoryList({
  categoria,
  setCategoria,
}) {
  const categorias = [
    "todos",
    "hamburguer",
    "crepe",
    "bebida",
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {categorias.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.button,
            categoria === item &&
              styles.active,
          ]}
          onPress={() => setCategoria(item)}
        >
          <Text style={styles.text}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  button: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  active: {
    backgroundColor: COLORS.gold,
  },

  text: {
    color: COLORS.white,
  },
});