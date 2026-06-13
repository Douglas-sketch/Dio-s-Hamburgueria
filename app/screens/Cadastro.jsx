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

export default function Cadastro({
  irParaLogin,
  cadastrar,
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={logo} style={styles.logo} />

        <Text style={styles.title}>
          CRIAR CONTA
        </Text>

        <Text style={styles.subtitle}>
          Faça seu cadastro
        </Text>

        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor={COLORS.gray}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={COLORS.gray}
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          placeholderTextColor={COLORS.gray}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={cadastrar}
        >
          <Text style={styles.buttonText}>
            CADASTRAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={irParaLogin}
        >
          <Text style={styles.link}>
            Já tem conta? Entrar
          </Text>
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
    marginBottom: 30,
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
  },

  link: {
    color: COLORS.gold,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});