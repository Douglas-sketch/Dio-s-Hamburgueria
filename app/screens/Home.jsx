import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import { COLORS } from "../styles/colors";
import { products } from "../data/products";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PromoBanner from "../components/PromoBanner";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] =
    useState("todos");

  const [carrinho, setCarrinho] =
    useState([]);

  function adicionarAoCarrinho(produto) {
    setCarrinho([...carrinho, produto]);
  }

  const produtosFiltrados =
    products.filter((produto) => {
      const nomeValido =
        produto.nome
          .toLowerCase()
          .includes(busca.toLowerCase());

      const categoriaValida =
        categoria === "todos" ||
        produto.categoria === categoria;

      return (
        nomeValido && categoriaValida
      );
    });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <Header
          itensCarrinho={carrinho.length}
        />

        <SearchBar
          busca={busca}
          setBusca={setBusca}
        />

        <PromoBanner />

        <CategoryList
          categoria={categoria}
          setCategoria={setCategoria}
        />

        {produtosFiltrados.map(
          (produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
              adicionarAoCarrinho={
                adicionarAoCarrinho
              }
            />
          )
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
});