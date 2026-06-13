import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { COLORS } from "../styles/colors";
import logo from "../assets/logo.png";

export default function Cadastro({ irParaLogin, onCadastro }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");

  function handleCadastrar() {
    if (!nome.trim()) {
      setErro("Por favor, informe seu nome.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErro("Por favor, informe um email válido.");
      return;
    }
    setErro("");
    onCadastro({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={logo} style={styles.logo} />

        <Text style={styles.title}>CRIAR CONTA</Text>
        <Text style={styles.subtitle}>Faça seu cadastro</Text>

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
          placeholderTextColor={COLORS.gray}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Telefone (opcional)"
          value={telefone}
          onChangeText={setTelefone}
          placeholderTextColor={COLORS.gray}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={irParaLogin}>
          <Text style={styles.link}>Já tem conta? Entrar</Text>
        </TouchableOpacity>
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
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
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
  button: {
    backgroundColor: COLORS.gold,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#111",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 1,
  },
  link: {
    color: COLORS.gold,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});