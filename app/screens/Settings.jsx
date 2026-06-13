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
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";
import Header from "../components/Header";

export default function Settings() {
    const [notificacoes, setNotificacoes] = useState(true);
    const [tema, setTema] = useState("dark");
    const [tamanhoFonte, setTamanhoFonte] = useState("normal");
    const [mostraModalPerfil, setMostraModalPerfil] = useState(false);
    const [mostraModalContato, setMostraModalContato] = useState(false);
    const [userData, setUserData] = useState({
        nome: "Douglas Silva",
        email: "douglas@email.com",
        telefone: "(11) 98765-4321",
    });
    const [tempUserData, setTempUserData] = useState({ ...userData });

    const handleSalvarPerfil = () => {
        setUserData({ ...tempUserData });
        setMostraModalPerfil(false);
    };

    const SettingItem = ({ icon, label, onPress, rightElement }) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.settingLeft}>
                <Ionicons
                    name={icon}
                    size={24}
                    color={COLORS.gold}
                    style={styles.settingIcon}
                />
                <Text style={styles.settingLabel}>{label}</Text>
            </View>
            {rightElement || (
                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.gray}
                />
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

                {/* Seção Perfil */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Perfil</Text>

                    <View style={styles.userCard}>
                        <View style={styles.avatarContainer}>
                            <Ionicons
                                name="person-circle"
                                size={60}
                                color={COLORS.gold}
                            />
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{userData.nome}</Text>
                            <Text style={styles.userEmail}>{userData.email}</Text>
                            <Text style={styles.userPhone}>{userData.telefone}</Text>
                        </View>
                    </View>

                    <SettingItem
                        icon="create"
                        label="Editar Perfil"
                        onPress={() => {
                            setTempUserData({ ...userData });
                            setMostraModalPerfil(true);
                        }}
                    />
                </View>

                {/* Seção Preferências */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferências</Text>

                    <SettingItem
                        icon="notifications"
                        label="Notificações"
                        rightElement={
                            <Switch
                                value={notificacoes}
                                onValueChange={setNotificacoes}
                                trackColor={{
                                    false: COLORS.border,
                                    true: COLORS.gold,
                                }}
                                thumbColor={notificacoes ? COLORS.gold : COLORS.gray}
                            />
                        }
                    />

                    <SettingItem
                        icon="text"
                        label="Tamanho da Fonte"
                        rightElement={
                            <View style={styles.fontSizeButtons}>
                                {["pequeno", "normal", "grande"].map((size) => (
                                    <TouchableOpacity
                                        key={size}
                                        style={[
                                            styles.fontSizeButton,
                                            tamanhoFonte === size &&
                                            styles.fontSizeButtonActive,
                                        ]}
                                        onPress={() => setTamanhoFonte(size)}
                                    >
                                        <Text
                                            style={[
                                                styles.fontSizeButtonText,
                                                tamanhoFonte === size &&
                                                styles.fontSizeButtonTextActive,
                                            ]}
                                        >
                                            {size === "pequeno"
                                                ? "A"
                                                : size === "normal"
                                                    ? "A"
                                                    : "A"}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        }
                    />
                </View>

                {/* Seção App */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sobre o App</Text>

                    <SettingItem
                        icon="information-circle"
                        label="Versão do App"
                        rightElement={
                            <Text style={styles.versionText}>v1.0.0</Text>
                        }
                    />

                    <SettingItem
                        icon="document-text"
                        label="Termos de Serviço"
                    />

                    <SettingItem
                        icon="shield-checkmark"
                        label="Política de Privacidade"
                    />
                </View>

                {/* Seção Suporte */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Suporte</Text>

                    <SettingItem
                        icon="call"
                        label="Entrar em Contato"
                        onPress={() => setMostraModalContato(true)}
                    />

                    <SettingItem
                        icon="star"
                        label="Avalie nosso App"
                    />

                    <SettingItem
                        icon="bug"
                        label="Reportar Problema"
                    />
                </View>

                {/* Botão Logout */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Ionicons
                        name="log-out"
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
                            <TouchableOpacity
                                onPress={() => setMostraModalPerfil(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={28}
                                    color={COLORS.white}
                                />
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
                                value={tempUserData.nome}
                                onChangeText={(text) =>
                                    setTempUserData({
                                        ...tempUserData,
                                        nome: text,
                                    })
                                }
                            />

                            <Text style={styles.formLabel}>Email</Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="Digite seu email"
                                placeholderTextColor={COLORS.gray}
                                keyboardType="email-address"
                                value={tempUserData.email}
                                onChangeText={(text) =>
                                    setTempUserData({
                                        ...tempUserData,
                                        email: text,
                                    })
                                }
                            />

                            <Text style={styles.formLabel}>Telefone</Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="Digite seu telefone"
                                placeholderTextColor={COLORS.gray}
                                keyboardType="phone-pad"
                                value={tempUserData.telefone}
                                onChangeText={(text) =>
                                    setTempUserData({
                                        ...tempUserData,
                                        telefone: text,
                                    })
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
                            <TouchableOpacity
                                onPress={() => setMostraModalContato(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={28}
                                    color={COLORS.white}
                                />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Entre em Contato</Text>
                            <View style={{ width: 28 }} />
                        </View>

                        <View style={styles.contactInfo}>
                            <View style={styles.contactItem}>
                                <Ionicons
                                    name="call"
                                    size={24}
                                    color={COLORS.gold}
                                />
                                <View style={styles.contactText}>
                                    <Text style={styles.contactLabel}>Telefone</Text>
                                    <Text style={styles.contactValue}>
                                        (11) 3000-0000
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.contactItem}>
                                <Ionicons
                                    name="mail"
                                    size={24}
                                    color={COLORS.gold}
                                />
                                <View style={styles.contactText}>
                                    <Text style={styles.contactLabel}>Email</Text>
                                    <Text style={styles.contactValue}>
                                        contato@feitonaparrilla.com
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.contactItem}>
                                <Ionicons
                                    name="location"
                                    size={24}
                                    color={COLORS.gold}
                                />
                                <View style={styles.contactText}>
                                    <Text style={styles.contactLabel}>Endereço</Text>
                                    <Text style={styles.contactValue}>
                                        Rua da Parrilla, 123
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
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
    header: {
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.white,
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: COLORS.gray,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.gold,
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    userCard: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderColor: COLORS.border,
        borderWidth: 1,
    },
    avatarContainer: {
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.white,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 12,
        color: COLORS.gray,
        marginBottom: 2,
    },
    userPhone: {
        fontSize: 12,
        color: COLORS.gray,
    },
    settingItem: {
        backgroundColor: COLORS.card,
        borderRadius: 10,
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
        gap: 8,
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
        color: COLORS.background,
        fontSize: 16,
    },
    versionText: {
        color: COLORS.gray,
        fontSize: 14,
    },
    logoutButton: {
        backgroundColor: "#8B0000",
        borderRadius: 10,
        padding: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
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
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
        maxHeight: "80%",
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
        fontSize: 14,
        fontWeight: "bold",
    },
    modalForm: {
        padding: 20,
    },
    formLabel: {
        color: COLORS.gray,
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 8,
        marginTop: 12,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    formInput: {
        backgroundColor: COLORS.card,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: 8,
        color: COLORS.white,
        padding: 12,
        fontSize: 14,
        fontFamily: "System",
    },
    contactInfo: {
        padding: 20,
    },
    contactItem: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "flex-start",
    },
    contactText: {
        marginLeft: 16,
        flex: 1,
    },
    contactLabel: {
        color: COLORS.gray,
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 4,
        textTransform: "uppercase",
    },
    contactValue: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "500",
    },
});
