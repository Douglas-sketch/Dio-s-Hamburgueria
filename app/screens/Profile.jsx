import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";
import Header from "../components/Header";

function getIniciais(nome) {
  if (!nome) return "?";
  const partes = nome.trim().split(" ").filter(Boolean);
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export default function Profile({ usuario, setUsuario }) {
  const [mostraModal, setMostraModal] = useState(false);
  const [tempData, setTempData] = useState({ ...(usuario || {}) });

  async function selecionarAvatar() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permissão negada",
        "Precisamos de permissão para acessar suas fotos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets?.[0]?.uri;
      if (selectedImageUri) {
        setUsuario({ ...usuario, avatar: selectedImageUri });
        setTempData((prev) => ({ ...prev, avatar: selectedImageUri }));
      }
    }
  }

  function abrirEdicao() {
    setTempData({ ...(usuario || {}) });
    setMostraModal(true);
  }

  function handleSalvar() {
    if (tempData.nome?.trim()) {
      setUsuario({ ...tempData });
    }
    setMostraModal(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header title="Meu Perfil" subtitle="Seus dados" showCart={false} />

        <View style={styles.avatarSection}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={selecionarAvatar}
            activeOpacity={0.75}
          >
            {usuario?.avatar ? (
              <Image source={{ uri: usuario.avatar }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>
                {getIniciais(usuario?.nome)}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.editAvatarBtn} onPress={abrirEdicao}>
            <Ionicons name="pencil" size={13} color="#111" />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>{usuario?.nome || "Usuário"}</Text>
        <Text style={styles.userEmail}>{usuario?.email || ""}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>INFORMAÇÕES</Text>
          <View style={styles.infoCard}>
            <InfoRow
              icon="person-outline"
              label="Nome"
              value={usuario?.nome || "—"}
            />
            <View style={styles.divider} />
            <InfoRow
              icon="mail-outline"
              label="Email"
              value={usuario?.email || "—"}
            />
            <View style={styles.divider} />
            <InfoRow
              icon="call-outline"
              label="Telefone"
              value={usuario?.telefone || "Não informado"}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MEUS PEDIDOS</Text>
          <View style={styles.emptyCard}>
            <Ionicons name="receipt-outline" size={36} color={COLORS.border} />
            <Text style={styles.emptyText}>Nenhum pedido ainda</Text>
            <Text style={styles.emptySubText}>
              Faça seu primeiro pedido!
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editBtn} onPress={abrirEdicao}>
          <Ionicons
            name="create-outline"
            size={18}
            color="#111"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.editBtnText}>EDITAR PERFIL</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={mostraModal}
        transparent
        animationType="slide"
        onRequestClose={() => setMostraModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setMostraModal(false)}>
                <Ionicons name="close" size={28} color={COLORS.white} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Editar Perfil</Text>
              <TouchableOpacity onPress={handleSalvar}>
                <Text style={styles.modalSave}>Salvar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              <Text style={styles.formLabel}>Nome Completo</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Digite seu nome"
                placeholderTextColor={COLORS.gray}
                value={tempData?.nome || ""}
                onChangeText={(t) =>
                  setTempData((prev) => ({ ...prev, nome: t }))
                }
              />

              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Digite seu email"
                placeholderTextColor={COLORS.gray}
                keyboardType="email-address"
                autoCapitalize="none"
                value={tempData?.email || ""}
                onChangeText={(t) =>
                  setTempData((prev) => ({ ...prev, email: t }))
                }
              />

              <Text style={styles.formLabel}>Telefone</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Digite seu telefone"
                placeholderTextColor={COLORS.gray}
                keyboardType="phone-pad"
                value={tempData?.telefone || ""}
                onChangeText={(t) =>
                  setTempData((prev) => ({ ...prev, telefone: t }))
                }
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name={icon}
        size={20}
        color={COLORS.gold}
        style={styles.infoIcon}
      />
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
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
    alignItems: "center",
  },
  avatarSection: {
    position: "relative",
    marginTop: 10,
    marginBottom: 14,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.gold,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarText: {
    color: "#111",
    fontSize: 32,
    fontWeight: "bold",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.gold,
    borderRadius: 12,
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  userName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    color: COLORS.gray,
    fontSize: 14,
    marginBottom: 28,
  },
  section: {
    width: "100%",
    marginBottom: 22,
  },
  sectionLabel: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  infoIcon: {
    marginRight: 14,
  },
  infoLabel: {
    color: COLORS.gray,
    fontSize: 11,
    marginBottom: 2,
  },
  infoValue: {
    color: COLORS.white,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },
  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 30,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.white,
    fontWeight: "600",
    marginTop: 10,
  },
  emptySubText: {
    color: COLORS.gray,
    fontSize: 13,
    marginTop: 4,
  },
  editBtn: {
    backgroundColor: COLORS.gold,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  editBtnText: {
    color: "#111",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.82)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  modalSave: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: "bold",
  },
  modalForm: {
    padding: 20,
  },
  formLabel: {
    color: COLORS.gray,
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 14,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  formInput: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    color: COLORS.white,
    padding: 14,
    fontSize: 14,
  },
});