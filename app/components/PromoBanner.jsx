import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";
import { useCart } from "../context/CartContext";

const COMBO_SEMANA = {
  id: 99,
  nome: "Combo da Semana 🔥",
  descricao: "Smash + Batata + Refri",
  preco: 29.9,
  categoria: "combo",
};

export default function PromoBanner() {
  const { adicionarAoCarrinho } = useCart();
  const [adicionado, setAdicionado] = useState(false);

  function handlePedir() {
    adicionarAoCarrinho(COMBO_SEMANA);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  }

  return (
    <View style={styles.banner}>
      <View style={styles.row}>
        <View style={styles.textBlock}>
          <Text style={styles.label}>OFERTA DA SEMANA</Text>
          <Text style={styles.title}>🔥 Combo Smash</Text>
          <Text style={styles.desc}>Smash Burger + Batata Frita + Refri</Text>
          <Text style={styles.price}>R$ 29,90</Text>
          <Text style={styles.economy}>Economize R$ 10,00</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, adicionado && styles.buttonSuccess]}
        onPress={handlePedir}
        activeOpacity={0.85}
      >
        {adicionado ? (
          <>
            <Ionicons name="checkmark" size={16} color="#111" style={{ marginRight: 6 }} />
            <Text style={styles.buttonText}>Adicionado!</Text>
          </>
        ) : (
          <Text style={styles.buttonText}>Pedir Agora</Text>
        )}
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
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  row: {
    flexDirection: "row",
    marginBottom: 14,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  desc: {
    color: COLORS.gray,
    fontSize: 13,
    marginBottom: 8,
  },
  price: {
    color: COLORS.gold,
    fontSize: 22,
    fontWeight: "bold",
  },
  economy: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  button: {
    backgroundColor: COLORS.gold,
    padding: 13,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSuccess: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#111",
    fontSize: 14,
  },
});