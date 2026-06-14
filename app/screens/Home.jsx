import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";
import { products } from "../data/products";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PromoBanner from "../components/PromoBanner";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todos");

  const produtosFiltrados = products.filter((produto) => {
    const nomeValido = produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase());
    const categoriaValida =
      categoria === "todos" || produto.categoria === categoria;
    return nomeValido && categoriaValida;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header />
        <SearchBar busca={busca} setBusca={setBusca} />
        {!busca && <PromoBanner />}
        <CategoryList categoria={categoria} setCategoria={setCategoria} />

        {produtosFiltrados.length === 0 ? (
          <View style={styles.emptySearch}>
            <Ionicons name="search-outline" size={48} color={COLORS.border} />
            <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
            <Text style={styles.emptyText}>Tente buscar por outro nome</Text>
          </View>
        ) : (
          produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 90,
  },
  emptySearch: {
    alignItems: "center",
    paddingVertical: 50,
    gap: 10,
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 13,
  },
});