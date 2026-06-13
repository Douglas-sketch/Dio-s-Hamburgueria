import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { COLORS } from "../styles/colors";

export default function ProductCard({
  produto,
  adicionarAoCarrinho,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>
        {produto.nome}
      </Text>

      <Text style={styles.desc}>
        {produto.descricao}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.preco}>
          R$ {produto.preco.toFixed(2)}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            adicionarAoCarrinho(produto)
          }
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
  },

  nome: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },

  desc: {
    color: COLORS.gray,
    marginTop: 5,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
  },

  preco: {
    color: COLORS.gold,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: COLORS.gold,
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});