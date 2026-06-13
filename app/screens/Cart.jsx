import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";

export default function Cart({ usuario, onPedidoConcluido }) {
  const {
    carrinho,
    adicionarAoCarrinho,
    decrementarCarrinho,
    removerDoCarrinho,
    limparCarrinho,
    totalCarrinho,
    qtdItensCarrinho,
  } = useCart();

  const [modalSucesso, setModalSucesso] = useState(false);

  function handleFinalizarPedido() {
    setModalSucesso(true);
  }

  function handleFecharModal() {
    setModalSucesso(false);
    limparCarrinho();
    onPedidoConcluido();
  }

  const primeiroNome = usuario?.nome
    ? usuario.nome.trim().split(" ")[0]
    : null;

  if (carrinho.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <Header
            title="Carrinho"
            subtitle="Seus pedidos"
            showCart={false}
          />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color={COLORS.border} />
          <Text style={styles.emptyTitle}>Carrinho vazio</Text>
          <Text style={styles.emptyText}>
            Adicione itens do cardápio para fazer seu pedido
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header
          title="Carrinho"
          subtitle={`${qtdItensCarrinho} ${qtdItensCarrinho === 1 ? "item" : "itens"}`}
          showCart={false}
        />

        {carrinho.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemNome} numberOfLines={1}>
                {item.nome}
              </Text>
              <TouchableOpacity
                onPress={() => removerDoCarrinho(item.id)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="trash-outline" size={18} color="#FF5252" />
              </TouchableOpacity>
            </View>

            <View style={styles.itemFooter}>
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => decrementarCarrinho(item.id)}
                >
                  <Ionicons name="remove" size={16} color={COLORS.white} />
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantidade}</Text>

                <TouchableOpacity
                  style={[styles.qtyBtn, styles.qtyBtnAdd]}
                  onPress={() => adicionarAoCarrinho(item)}
                >
                  <Ionicons name="add" size={16} color="#111" />
                </TouchableOpacity>
              </View>

              <Text style={styles.itemPreco}>
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.totalCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>
              R$ {totalCarrinho.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Taxa de entrega</Text>
            <Text style={[styles.totalValue, { color: "#4CAF50" }]}>
              Grátis 🎉
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalFinalLabel}>Total</Text>
            <Text style={styles.totalFinalValue}>
              R$ {totalCarrinho.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.finalizarBtn}
          onPress={handleFinalizarPedido}
          activeOpacity={0.85}
        >
          <Ionicons
            name="checkmark-circle"
            size={20}
            color="#111"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.finalizarText}>FINALIZAR PEDIDO</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={modalSucesso}
        transparent
        animationType="fade"
        onRequestClose={handleFecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>Pedido Realizado!</Text>
            <Text style={styles.modalText}>
              Obrigado{primeiroNome ? `, ${primeiroNome}` : ""}!{"\n"}
              Seu pedido está sendo preparado{"\n"}com muito carinho.
            </Text>
            <View style={styles.modalBadge}>
              <Ionicons name="time-outline" size={16} color={COLORS.gold} />
              <Text style={styles.modalBadgeText}>
                Tempo estimado: 20-30 min
              </Text>
            </View>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={handleFecharModal}
            >
              <Text style={styles.modalBtnText}>VOLTAR AO INÍCIO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerWrapper: {
    padding: 20,
    paddingBottom: 0,
  },
  content: {
    padding: 20,
    paddingBottom: 90,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  emptyText: {
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  cartItem: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  itemNome: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  qtyBtn: {
    backgroundColor: COLORS.border,
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnAdd: {
    backgroundColor: COLORS.gold,
  },
  qtyText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
  itemPreco: {
    color: COLORS.gold,
    fontWeight: "bold",
    fontSize: 16,
  },
  totalCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    color: COLORS.gray,
    fontSize: 14,
  },
  totalValue: {
    color: COLORS.white,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 6,
  },
  totalFinalLabel: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
  },
  totalFinalValue: {
    color: COLORS.gold,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
  },
  finalizarBtn: {
    backgroundColor: COLORS.gold,
    paddingVertical: 17,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  finalizarText: {
    color: "#111",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.88)",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    width: "100%",
  },
  modalEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalText: {
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
  },
  modalBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(244, 165, 28, 0.12)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 28,
    gap: 6,
  },
  modalBadgeText: {
    color: COLORS.gold,
    fontWeight: "600",
    fontSize: 13,
  },
  modalBtn: {
    backgroundColor: COLORS.gold,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
  },
  modalBtnText: {
    color: "#111",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});