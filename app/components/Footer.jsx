import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import { COLORS } from "../styles/colors";

export default function Footer({
  telaAtual,
  setTelaAtual,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          setTelaAtual("home")
        }
      >
        <Ionicons
          name="home"
          size={28}
          color={
            telaAtual === "home"
              ? COLORS.gold
              : COLORS.gray
          }
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setTelaAtual("menu")
        }
      >
        <Ionicons
          name="restaurant"
          size={28}
          color={
            telaAtual === "menu"
              ? COLORS.gold
              : COLORS.gray
          }
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setTelaAtual("cart")
        }
      >
        <Ionicons
          name="cart"
          size={28}
          color={
            telaAtual === "cart"
              ? COLORS.gold
              : COLORS.gray
          }
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setTelaAtual("profile")
        }
      >
        <Ionicons
          name="person"
          size={28}
          color={
            telaAtual === "profile"
              ? COLORS.gold
              : COLORS.gray
          }
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setTelaAtual("settings")
        }
      >
        <Ionicons
          name="settings"
          size={28}
          color={
            telaAtual === "settings"
              ? COLORS.gold
              : COLORS.gray
          }
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
});