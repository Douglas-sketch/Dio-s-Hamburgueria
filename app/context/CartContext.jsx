import React, { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarAoCarrinho(produto) {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function decrementarCarrinho(produtoId) {
    setCarrinho((prev) => {
      const item = prev.find((i) => i.id === produtoId);
      if (!item) return prev;
      if (item.quantidade === 1) {
        return prev.filter((i) => i.id !== produtoId);
      }
      return prev.map((i) =>
        i.id === produtoId ? { ...i, quantidade: i.quantidade - 1 } : i
      );
    });
  }

  function removerDoCarrinho(produtoId) {
    setCarrinho((prev) => prev.filter((i) => i.id !== produtoId));
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  const totalCarrinho = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const qtdItensCarrinho = carrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        decrementarCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        totalCarrinho,
        qtdItensCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}