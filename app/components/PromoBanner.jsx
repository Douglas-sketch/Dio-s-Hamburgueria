import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { COLORS } from "../styles/colors";

export default function PromoBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>
        🔥 Combo da Semana
      </Text>

      <Text style={styles.text}>
        Smash + Batata + Refri
      </Text>

      <Text style={styles.price}>
        R$ 29,90
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Pedir Agora
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  title: {
    color: COLORS.gold,
    fontSize: 22,
    fontWeight: "bold",
  },

  text: {
    color: COLORS.white,
    marginTop: 8,
  },

  price: {
    color: COLORS.gold,
    fontWeight: "bold",
    marginTop: 10,
  },

  button: {
    backgroundColor: COLORS.gold,
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: "flex-start",
  },

  buttonText: {
    fontWeight: "bold",
  },
});