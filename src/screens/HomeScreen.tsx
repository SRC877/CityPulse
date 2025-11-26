import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { useAppDispatch, useAppSelector } from "../bridge/hooks";
import { searchEventsRequest } from "../bridge/store/eventsSlice";
import { toggleFavourite } from "../bridge/store/favouritesSlice";
import EventCard from "../components/EventCard";
import type { RootStackParamList } from "../navigation/RootNavigator";
import type { EventItem } from "../bridge/types/events";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const PRIMARY = "#F9735B"; // accent
const SCREEN_BG = "#F5F5F7";
const CARD_BG = "#FFFFFF";
const TEXT_DARK = "#111827";
const TEXT_MUTED = "#6B7280";

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

  const events = useAppSelector((state) => state.events.items);
  const loading = useAppSelector((state) => state.events.loading);
  const error = useAppSelector((state) => state.events.error);
  const favouriteIds = useAppSelector((state) => state.favourites.ids);

  const isSearchInputValid =
    keyword.trim().length > 0 && city.trim().length > 0;

  // Header: Discover + profile avatar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Discover",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.headerAvatarContainer}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>SR</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
    if (!text.trim() || !city.trim()) {
      setHasSearched(false);
    }
  };

  const handleChangeCity = (text: string) => {
    setCity(text);
    if (!keyword.trim() || !text.trim()) {
      setHasSearched(false);
    }
  };

  const onSearch = () => {
    Keyboard.dismiss();
    if (!isSearchInputValid) {
      setShowValidationError(true);
      setHasSearched(false);
      return;
    }
    setShowValidationError(false);
    setHasSearched(true);
    dispatch(
      searchEventsRequest({
        keyword: keyword.trim(),
        city: city.trim(),
      })
    );
  };

  const handlePressEvent = (event: EventItem) => {
    navigation.navigate("EventDetails", { event });
  };

  const visibleEvents: EventItem[] = isSearchInputValid ? events : [];

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={PRIMARY} />
          <Text style={[styles.emptyText, { marginTop: 8 }]}>
            Searching events…
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="warning-outline" size={40} color={PRIMARY} />
          <Text style={[styles.emptyText, { fontWeight: "600", marginTop: 8 }]}>
            Something went wrong
          </Text>
          <Text style={styles.emptySubText}>{error}</Text>
        </View>
      );
    }

    if (hasSearched && isSearchInputValid) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={46} color="#9CA3AF" />
          <Text style={[styles.emptyText, { marginTop: 10 }]}>
            No events found
          </Text>
          <Text style={styles.emptySubText}>
            Try searching for events in another city.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={46} color="#9CA3AF" />
        <Text style={[styles.emptyText, { marginTop: 10 }]}>
          Search events…
        </Text>
        <Text style={styles.emptySubText}>
          Try searching for events in your city.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Search card */}
          <View style={styles.searchCard}>
            <View style={styles.searchHeaderRow}>
              <View>
                <Text style={styles.searchTitle}>Discover events</Text>
                <Text style={styles.searchSubtitle}>
                  Find concerts, sports, and more near you
                </Text>
              </View>
            </View>

            {/* Keyword input */}
            <View style={styles.inputRow}>
              <Ionicons
                name="search-outline"
                size={18}
                color={TEXT_MUTED}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Search events..."
                placeholderTextColor="#A0A0AA"
                value={keyword}
                onChangeText={handleChangeKeyword}
                style={styles.input}
                returnKeyType="next"
              />
            </View>

            {/* City input */}
            <View style={styles.inputRow}>
              <Ionicons
                name="location-outline"
                size={18}
                color={TEXT_MUTED}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter city"
                placeholderTextColor="#A0A0AA"
                value={city}
                onChangeText={handleChangeCity}
                style={styles.input}
                returnKeyType="search"
                onSubmitEditing={onSearch}
              />
            </View>

            {/* Validation message */}
            {showValidationError && !isSearchInputValid && (
              <Text style={styles.validationText}>
                Please enter both event type and city.
              </Text>
            )}

            {/* Search button */}
            <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          {/* Results list */}
          <FlatList
            data={visibleEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventCard
                event={item}
                isFavourite={favouriteIds.includes(item.id)}
                onToggleFavourite={() => dispatch(toggleFavourite(item))}
                onPress={() => handlePressEvent(item)}
              />
            )}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              visibleEvents.length === 0
                ? styles.listEmptyContent
                : styles.listContent
            }
            ListEmptyComponent={renderEmptyState}
          />
        </View>
      </TouchableWithoutFeedback>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },

  // Header avatar
  headerAvatarContainer: {
    marginRight: 12,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  // Search card
  searchCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  searchHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: TEXT_DARK,
  },
  searchSubtitle: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F4F4F5",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: TEXT_DARK,
  },
  validationText: {
    color: "#B91C1C",
    fontSize: 12,
    marginBottom: 4,
  },
  searchButton: {
    marginTop: 4,
    borderRadius: 999,
    backgroundColor: PRIMARY,
    alignItems: "center",
    paddingVertical: 12,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },

  // List
  listContent: {
    paddingBottom: 24,
  },
  listEmptyContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },

  // Empty / error states
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    color: TEXT_DARK,
  },
  emptySubText: {
    fontSize: 13,
    color: TEXT_MUTED,
    textAlign: "center",
    marginTop: 4,
  },
});

export default HomeScreen;
