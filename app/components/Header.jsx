import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";

export default function Header({
  title = "Dio's Hamburgueria",
  subtitle = "Feito na Parrilla 🔥",
  showCart = true,
}) {
  const { qtdItensCarrinho } = useCart();

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
        <View style={styles.cartWrapper}>
          <Text style={styles.cart}>🛒</Text>
          {qtdItensCarrinho > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {qtdItensCarrinho > 9 ? "9+" : qtdItensCarrinho}
              </Text>
            </View>
          )}
        </View>
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
    width: 52,
    height: 52,
    resizeMode: "contain",
    marginRight: 12,
  },
  title: {
    color: COLORS.gold,
    fontSize: 17,
    fontWeight: "bold",
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 1,
  },
  cartWrapper: {
    position: "relative",
  },
  cart: {
    fontSize: 26,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#111",
    fontSize: 10,
    fontWeight: "bold",
  },
});