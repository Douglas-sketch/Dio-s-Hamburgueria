import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";

export default function SearchBar({ busca, setBusca }) {
  return (
    <View style={styles.wrapper}>
      <Ionicons
        name="search"
        size={18}
        color={COLORS.gray}
        style={styles.icon}
      />
      <TextInput
        placeholder="Buscar produto..."
        placeholderTextColor={COLORS.gray}
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      {busca.length > 0 && (
        <TouchableOpacity onPress={() => setBusca("")} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="close-circle" size={18} color={COLORS.gray} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  icon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
    padding: 0,
  },
});