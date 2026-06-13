import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";
import logo from "../assets/logo.png";

export default function Header({
  itensCarrinho,
  title = "Dio's Hamburgueria",
  subtitle = "Feito na Parrilla 🔥",
  showCart = true,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        <Image source={logo} style={styles.logo} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {showCart && (
        <Text style={styles.cart}>🛒 {itensCarrinho ?? 0}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 56,
    height: 56,
    resizeMode: "contain",
    marginRight: 14,
  },

  title: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "bold",
  },

  subtitle: {
    color: COLORS.gray,
    fontSize: 12,
  },

  cart: {
    color: COLORS.white,
    fontSize: 18,
  },
});