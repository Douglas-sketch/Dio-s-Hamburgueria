import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Login from "./screens/Login";
import Cadastro from "./screens/Cadastro";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { COLORS } from "./styles/colors";

export default function App() {
  const [tela, setTela] = useState("login");

  // Não mostrar Footer em telas de autenticação
  const mostraFooter = tela !== "login" && tela !== "cadastro";

  return (
    <View style={styles.appContainer}>
      {tela === "login" && (
        <Login
          irParaCadastro={() => setTela("cadastro")}
          entrar={() => setTela("home")}
        />
      )}

      {tela === "cadastro" && (
        <Cadastro
          irParaLogin={() => setTela("login")}
          cadastrar={() => setTela("home")}
        />
      )}

      {tela === "home" && (
        <Home />
      )}

      {tela === "menu" && (
        <View style={styles.placeholder}>
          <Home />
        </View>
      )}

      {tela === "profile" && (
        <View style={styles.placeholder}>
          <Header
            title="Perfil"
            subtitle="Informações do usuário"
            showCart={false}
          />
          <View style={styles.centerContent}>
            <View style={styles.placeholderText}>
              <Text style={styles.text}>Perfil do Usuário</Text>
            </View>
          </View>
        </View>
      )}

      {tela === "settings" && (
        <Settings />
      )}

      {tela === "cart" && (
        <View style={styles.placeholder}>
          <Header
            title="Carrinho"
            subtitle="Seus pedidos"
            showCart={false}
          />
          <View style={styles.centerContent}>
            <View style={styles.placeholderText}>
              <Text style={styles.text}>Carrinho de Compras</Text>
            </View>
          </View>
        </View>
      )}

      {mostraFooter && (
        <Footer
          telaAtual={tela}
          setTelaAtual={setTela}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: "relative",
  },
  placeholder: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 70,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 10,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});