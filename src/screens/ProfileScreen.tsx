import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useAppDispatch, useAppSelector } from "../bridge/hooks";
import { setLanguage } from "../bridge/store/languageSlice";
import type { RootStackParamList } from "../navigation/RootNavigator";

const PRIMARY = "#F9735B";
const TEXT_DARK = "#111827";
const TEXT_MUTED = "#6B7280";
const CARD_BG = "#FFFFFF";
const SCREEN_BG = "#F3F4F6";

const MOCK_NAME = "Sangha";
const MOCK_EMAIL = "src8775@gmail.com";

type Nav = NativeStackNavigationProp<RootStackParamList, "Profile">;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();

  const language = useAppSelector((state) => state.language.code);
  const favouriteIds = useAppSelector((state) => state.favourites.ids);

  const isArabic = language === "ar";
  const languageLabel = isArabic ? "Arabic" : "English";

  const handleLogoutPress = () => {
    Alert.alert("Logout", "Logout flow will be implemented later.");
  };

  const handleFavouritesPress = () => {
    navigation.navigate("Favourites");
  };

  const handleLanguagePress = () => {
    const nextLang = isArabic ? "en" : "ar";
    dispatch(setLanguage(nextLang));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top profile section */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.nameText}>{MOCK_NAME}</Text>
          <Text style={styles.emailText}>{MOCK_EMAIL}</Text>
        </View>

        {/* Settings card */}
        <View style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>SETTINGS</Text>

          {/* Language row */}
          <TouchableOpacity style={styles.row} onPress={handleLanguagePress}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconCircle}>
                <Ionicons name="globe-outline" size={18} color={PRIMARY} />
              </View>
              <Text style={styles.rowLabel}>Language</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{languageLabel}</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={TEXT_MUTED}
                style={{ marginLeft: 4 }}
              />
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Favourites row */}
          <TouchableOpacity style={styles.row} onPress={handleFavouritesPress}>
            <View style={styles.rowLeft}>
              <View style={styles.rowIconCircle}>
                <Ionicons name="heart-outline" size={18} color={PRIMARY} />
              </View>
              <Text style={styles.rowLabel}>My Favorites</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{favouriteIds.length}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogoutPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name="log-out-outline"
            size={18}
            color={PRIMARY}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>City Pulse v1.0.0</Text>
          <Text style={styles.footerText}>
            © 2025 City Pulse. All rights reserved.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "600",
    color: TEXT_DARK,
  },
  emailText: {
    fontSize: 14,
    color: TEXT_MUTED,
    marginTop: 2,
  },
  settingsCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  settingsTitle: {
    fontSize: 13,
    color: TEXT_MUTED,
    fontWeight: "600",
    marginBottom: 10,
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rowLabel: {
    fontSize: 15,
    color: TEXT_DARK,
  },
  rowValue: {
    fontSize: 14,
    color: TEXT_MUTED,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  badge: {
    minWidth: 24,
    paddingHorizontal: 6,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 13,
    color: TEXT_DARK,
    fontWeight: "500",
  },
  logoutButton: {
    marginTop: 24,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 15,
    color: PRIMARY,
    fontWeight: "600",
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingBottom: 12,
  },
  footerText: {
    fontSize: 12,
    color: TEXT_MUTED,
  },
});

export default ProfileScreen;
