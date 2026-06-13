import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { COLORS } from "../styles/colors";

const TABS = [
  { id: "home", label: "Início", icon: "home" },
  { id: "cart", label: "Carrinho", icon: "cart" },
  { id: "profile", label: "Perfil", icon: "person" },
  { id: "settings", label: "Config", icon: "settings" },
];

export default function Footer({ telaAtual, setTelaAtual }) {
  const { qtdItensCarrinho } = useCart();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const ativo = telaAtual === tab.id;
        const isCart = tab.id === "cart";
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => setTelaAtual(tab.id)}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <Ionicons
                name={ativo ? tab.icon : `${tab.icon}-outline`}
                size={24}
                color={ativo ? COLORS.gold : COLORS.gray}
              />
              {isCart && qtdItensCarrinho > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {qtdItensCarrinho > 9 ? "9+" : qtdItensCarrinho}
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, ativo && styles.labelAtivo]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
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
    paddingVertical: 8,
    paddingHorizontal: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: COLORS.gold,
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#111",
    fontSize: 9,
    fontWeight: "bold",
  },
  label: {
    color: COLORS.gray,
    fontSize: 10,
    marginTop: 3,
  },
  labelAtivo: {
    color: COLORS.gold,
    fontWeight: "600",
  },
});