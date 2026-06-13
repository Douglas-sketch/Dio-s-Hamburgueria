import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";
import Header from "../components/Header";

export default function Settings({ usuario, setUsuario, onLogout }) {
  const [notificacoes, setNotificacoes] = useState(true);
  const [tamanhoFonte, setTamanhoFonte] = useState("normal");
  const [mostraModalPerfil, setMostraModalPerfil] = useState(false);
  const [mostraModalContato, setMostraModalContato] = useState(false);
  const [tempUserData, setTempUserData] = useState({ ...(usuario || {}) });

  function handleSalvarPerfil() {
    if (tempUserData.nome?.trim()) {
      setUsuario({ ...tempUserData });
    }
    setMostraModalPerfil(false);
  }

  function handleLogout() {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: onLogout,
        },
      ]
    );
  }

  const SettingItem = ({ icon, label, onPress, rightElement }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <Ionicons
          name={icon}
          size={22}
          color={COLORS.gold}
          style={styles.settingIcon}
        />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title="Configurações"
          subtitle="Personalize sua experiência"
          showCart={false}
        />

        {/* Perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil</Text>

          <View style={styles.userCard}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={56} color={COLORS.gold} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {usuario?.nome || "Usuário"}
              </Text>
              <Text style={styles.userEmail}>
                {usuario?.email || "—"}
              </Text>
              {usuario?.telefone ? (
                <Text style={styles.userPhone}>{usuario.telefone}</Text>
              ) : null}
            </View>
          </View>

          <SettingItem
            icon="create-outline"
            label="Editar Perfil"
            onPress={() => {
              setTempUserData({ ...(usuario || {}) });
              setMostraModalPerfil(true);
            }}
          />
        </View>

        {/* Preferências */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>

          <SettingItem
            icon="notifications-outline"
            label="Notificações"
            rightElement={
              <Switch
                value={notificacoes}
                onValueChange={setNotificacoes}
                trackColor={{ false: COLORS.border, true: COLORS.gold }}
                thumbColor={notificacoes ? "#fff" : COLORS.gray}
              />
            }
          />

          <SettingItem
            icon="text-outline"
            label="Tamanho da Fonte"
            rightElement={
              <View style={styles.fontSizeButtons}>
                {[
                  { id: "pequeno", label: "A", size: 12 },
                  { id: "normal", label: "A", size: 15 },
                  { id: "grande", label: "A", size: 19 },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.fontSizeButton,
                      tamanhoFonte === item.id && styles.fontSizeButtonActive,
                    ]}
                    onPress={() => setTamanhoFonte(item.id)}
                  >
                    <Text
                      style={[
                        styles.fontSizeButtonText,
                        { fontSize: item.size },
                        tamanhoFonte === item.id &&
                          styles.fontSizeButtonTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            }
          />
        </View>

        {/* Sobre o App */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o App</Text>

          <SettingItem
            icon="information-circle-outline"
            label="Versão do App"
            rightElement={<Text style={styles.versionText}>v1.0.0</Text>}
          />

          <SettingItem
            icon="document-text-outline"
            label="Termos de Serviço"
            onPress={() =>
              Alert.alert("Termos de Serviço", "Em breve disponível.")
            }
          />

          <SettingItem
            icon="shield-checkmark-outline"
            label="Política de Privacidade"
            onPress={() =>
              Alert.alert("Política de Privacidade", "Em breve disponível.")
            }
          />
        </View>

        {/* Suporte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suporte</Text>

          <SettingItem
            icon="call-outline"
            label="Entrar em Contato"
            onPress={() => setMostraModalContato(true)}
          />

          <SettingItem
            icon="star-outline"
            label="Avalie nosso App"
            onPress={() =>
              Alert.alert(
                "Obrigado! 🌟",
                "Sua avaliação é muito importante para nós."
              )
            }
          />

          <SettingItem
            icon="bug-outline"
            label="Reportar Problema"
            onPress={() =>
              Alert.alert(
                "Reportar Problema",
                "Envie um email para: suporte@dioshamburgueria.com"
              )
            }
          />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={COLORS.white}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Editar Perfil */}
      <Modal
        visible={mostraModalPerfil}
        transparent
        animationType="slide"
        onRequestClose={() => setMostraModalPerfil(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setMostraModalPerfil(false)}>
                <Ionicons name="close" size={28} color={COLORS.white} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Editar Perfil</Text>
              <TouchableOpacity onPress={handleSalvarPerfil}>
                <Text style={styles.modalSaveButton}>Salvar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              <Text style={styles.formLabel}>Nome Completo</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Digite seu nome"
                placeholderTextColor={COLORS.gray}
                value={tempUserData.nome || ""}
                onChangeText={(t) =>
                  setTempUserData({ ...tempUserData, nome: t })
                }
              />

              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Digite seu email"
                placeholderTextColor={COLORS.gray}
                keyboardType="email-address"
                autoCapitalize="none"
                value={tempUserData.email || ""}
                onChangeText={(t) =>
                  setTempUserData({ ...tempUserData, email: t })
                }
              />

              <Text style={styles.formLabel}>Telefone</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Digite seu telefone"
                placeholderTextColor={COLORS.gray}
                keyboardType="phone-pad"
                value={tempUserData.telefone || ""}
                onChangeText={(t) =>
                  setTempUserData({ ...tempUserData, telefone: t })
                }
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Contato */}
      <Modal
        visible={mostraModalContato}
        transparent
        animationType="slide"
        onRequestClose={() => setMostraModalContato(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setMostraModalContato(false)}>
                <Ionicons name="close" size={28} color={COLORS.white} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Entre em Contato</Text>
              <View style={{ width: 28 }} />
            </View>

            <View style={styles.contactInfo}>
              <ContactItem
                icon="call"
                label="Telefone"
                value="(11) 3000-0000"
              />
              <ContactItem
                icon="mail"
                label="Email"
                value="contato@dioshamburgueria.com"
              />
              <ContactItem
                icon="location"
                label="Endereço"
                value="Rua da Parrilla, 123 — São Paulo, SP"
              />
              <ContactItem
                icon="time"
                label="Horário"
                value="Ter–Dom: 18h às 23h"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <View style={styles.contactItem}>
      <Ionicons
        name={icon}
        size={22}
        color={COLORS.gold}
        style={{ marginRight: 14 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
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
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.gold,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  userCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  avatarContainer: {
    marginRight: 14,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 3,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 12,
    color: COLORS.gray,
  },
  settingItem: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "500",
  },
  fontSizeButtons: {
    flexDirection: "row",
    gap: 6,
  },
  fontSizeButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  fontSizeButtonActive: {
    backgroundColor: COLORS.gold,
  },
  fontSizeButtonText: {
    color: COLORS.gray,
    fontWeight: "bold",
  },
  fontSizeButtonTextActive: {
    color: "#111",
  },
  versionText: {
    color: COLORS.gray,
    fontSize: 13,
  },
  logoutButton: {
    backgroundColor: "#7B0000",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
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
    paddingBottom: 30,
    maxHeight: "85%",
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
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
  modalSaveButton: {
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
    padding: 13,
    fontSize: 14,
  },
  contactInfo: {
    padding: 20,
  },
  contactItem: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  contactLabel: {
    color: COLORS.gray,
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contactValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "500",
  },
});