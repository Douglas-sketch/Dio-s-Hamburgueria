import { TextInput, StyleSheet } from "react-native";
import { COLORS } from "../styles/colors";

export default function SearchBar({
  busca,
  setBusca,
}) {
  return (
    <TextInput
      placeholder="Buscar produto..."
      placeholderTextColor={COLORS.gray}
      value={busca}
      onChangeText={setBusca}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.white,
    borderRadius: 14,
    padding: 15,
    marginBottom: 20,
  },
});