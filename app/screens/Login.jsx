import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { COLORS } from "../styles/colors";
import logo from "../assets/logo.png";

export default function Login({ irParaCadastro, onLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  function handleEntrar() {
    if (!nome.trim()) {
      setErro("Por favor, informe seu nome.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErro("Por favor, informe um email válido.");
      return;
    }
    setErro("");
    onLogin({ nome: nome.trim(), email: email.trim(), telefone: "" });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={logo} style={styles.logo} />

        <Text style={styles.title}>FEITO NA PARRILLA</Text>
        <Text style={styles.subtitle}>100% ARTESANAL</Text>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TextInput
          placeholder="Nome completo"
          value={nome}
          onChangeText={(t) => {
            setNome(t);
            setErro("");
          }}
          placeholderTextColor={COLORS.gray}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            setErro("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={COLORS.gray}
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleEntrar}>
          <Text style={styles.loginButtonText}>ENTRAR</Text>
        </TouchableOpacity>

        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>OU</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() =>
            Alert.alert("Em breve!", "Login com Google disponível em breve.")
          }
        >
          <Text style={styles.googleButtonText}>ENTRAR COM GOOGLE</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem conta?</Text>
          <TouchableOpacity onPress={irParaCadastro}>
            <Text style={styles.registerLink}>Cadastre-se aqui!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  logo: {
    width: 350,
    height: 120,
    alignSelf: "center",
    marginBottom: 15,
    resizeMode: "contain",
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.gold,
    textAlign: "center",
    marginBottom: 20,
  },
  erro: {
    color: "#FF5252",
    textAlign: "center",
    marginBottom: 12,
    fontSize: 13,
    backgroundColor: "rgba(255,82,82,0.1)",
    padding: 10,
    borderRadius: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loginButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#111",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 1,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  separatorText: {
    color: COLORS.gray,
    marginHorizontal: 15,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: "#4285F4",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  googleButtonText: {
    color: "#4285F4",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  registerContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  registerText: {
    color: COLORS.gray,
  },
  registerLink: {
    color: COLORS.gold,
    marginTop: 5,
    fontWeight: "bold",
  },
});