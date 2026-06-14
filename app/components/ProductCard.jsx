import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";
import { useCart } from "../context/CartContext";

export default function ProductCard({ produto }) {
  const { carrinho, adicionarAoCarrinho, decrementarCarrinho } = useCart();
  const [animating, setAnimating] = useState(false);

  const itemNoCarrinho = carrinho.find((i) => i.id === produto.id);
  const quantidade = itemNoCarrinho?.quantidade || 0;

  function handleAdicionar() {
    adicionarAoCarrinho(produto);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
  }

  return (
    <View style={[styles.card, produto.destaque && styles.cardDestaque]}>
      {produto.destaque && (
        <View style={styles.destaqueTag}>
          <Ionicons name="star" size={10} color="#111" />
          <Text style={styles.destaqueText}>DESTAQUE</Text>
        </View>
      )}

      <View style={styles.body}>
        {/* Imagem do produto */}
        <View style={[styles.imageBox, produto.destaque && styles.imageBoxDestaque]}>
          <Image 
            source={produto.imagem} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Info do produto */}
        <View style={styles.info}>
          <Text style={styles.nome} numberOfLines={1}>
            {produto.nome}
          </Text>
          <Text style={styles.desc} numberOfLines={2}>
            {produto.descricao}
          </Text>

          <View style={styles.footer}>
            <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>

            {quantidade > 0 ? (
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => decrementarCarrinho(produto.id)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="remove" size={14} color={COLORS.white} />
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>{quantidade}</Text>

                <TouchableOpacity
                  style={[styles.qtyBtn, styles.qtyBtnAdd]}
                  onPress={handleAdicionar}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="add" size={14} color="#111" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.addButton, animating && styles.addButtonPressed]}
                onPress={handleAdicionar}
                activeOpacity={0.75}
              >
                <Ionicons name="add" size={18} color="#111" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    marginBottom: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  cardDestaque: {
    borderColor: "rgba(244, 165, 28, 0.35)",
  },
  destaqueTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.gold,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 10,
  },
  destaqueText: {
    color: "#111",
    fontSize: 9,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  imageBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#1E1E20",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    flexShrink: 0,
    overflow: "hidden",
  },
  imageBoxDestaque: {
    backgroundColor: "rgba(244, 165, 28, 0.08)",
    borderColor: "rgba(244, 165, 28, 0.2)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
  },
  nome: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  desc: {
    color: COLORS.gray,
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preco: {
    color: COLORS.gold,
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: COLORS.gold,
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonPressed: {
    backgroundColor: "#c98a15",
    transform: [{ scale: 0.93 }],
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#1E1E20",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnAdd: {
    backgroundColor: COLORS.gold,
  },
  qtyNumber: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 14,
    minWidth: 16,
    textAlign: "center",
  },
});