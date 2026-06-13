import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { CartProvider } from "./context/CartContext";
import Login from "./screens/Login";
import Cadastro from "./screens/Cadastro";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import Footer from "./components/Footer";
import { COLORS } from "./styles/colors";

export default function App() {
  const [tela, setTela] = useState("login");
  const [usuario, setUsuario] = useState(null);

  const mostraFooter = tela !== "login" && tela !== "cadastro";

  function handleLogin(dados) {
    setUsuario(dados);
    setTela("home");
  }

  function handleCadastro(dados) {
    setUsuario(dados);
    setTela("home");
  }

  function handleLogout() {
    setUsuario(null);
    setTela("login");
  }

  return (
    <CartProvider>
      <View style={styles.appContainer}>
        {tela === "login" && (
          <Login
            irParaCadastro={() => setTela("cadastro")}
            onLogin={handleLogin}
          />
        )}

        {tela === "cadastro" && (
          <Cadastro
            irParaLogin={() => setTela("login")}
            onCadastro={handleCadastro}
          />
        )}

        {tela === "home" && <Home />}

        {tela === "cart" && (
          <Cart
            usuario={usuario}
            onPedidoConcluido={() => setTela("home")}
          />
        )}

        {tela === "profile" && (
          <Profile usuario={usuario} setUsuario={setUsuario} />
        )}

        {tela === "settings" && (
          <Settings
            usuario={usuario}
            setUsuario={setUsuario}
            onLogout={handleLogout}
          />
        )}

        {mostraFooter && (
          <Footer telaAtual={tela} setTelaAtual={setTela} />
        )}
      </View>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: "relative",
  },
});