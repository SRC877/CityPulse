import React, { useState, useLayoutEffect } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { searchEventsRequest } from "../bridge/store/eventsSlice";
import { toggleFavourite } from "../bridge/store/favouritesSlice";
import { useAppDispatch, useAppSelector } from "../bridge/hooks";
import EventCard from "../components/EventCard";
import LanguageToggle from "../components/LanguageToggle";
import type { RootStackParamList } from "../navigation/RootNavigator";
import type { EventItem } from "../bridge/types/events";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const PRIMARY = "#007AFF";
const CARD_BG = "#FFFFFF";
const SCREEN_BG = "#F2F3F7";

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [keyword, setKeyword] = useState("Music");
  const [city, setCity] = useState("Dubai");
  const [hasSearched, setHasSearched] = useState(false);

  const events = useAppSelector((state) => state.events.items);
  const loading = useAppSelector((state) => state.events.loading);
  const error = useAppSelector((state) => state.events.error);
  const favouriteIds = useAppSelector((state) => state.favourites.ids);

  // Configure header profile avatar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "City Pulse",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.headerAvatarContainer}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={styles.headerAvatar}>
            {/* You can replace "SR" with first letters of logged-in user later */}
            <Text style={styles.headerAvatarText}>SR</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onSearch = () => {
    if (!keyword.trim() && !city.trim()) {
      return;
    }
    setHasSearched(true);
    Keyboard.dismiss();
    dispatch(
      searchEventsRequest({ keyword: keyword.trim(), city: city.trim() })
    );
  };

  const handlePressEvent = (event: EventItem) => {
    navigation.navigate("EventDetails", { event });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.helperText}>Searching events…</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorSubtitle}>{error}</Text>
          <Text style={styles.helperText}>
            Please try a different keyword/city or check your network.
          </Text>
        </View>
      );
    }

    if (hasSearched && events.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyTitle}>No events found</Text>
          <Text style={styles.emptySubtitle}>
            Try searching for popular cities like{" "}
            <Text style={styles.highlight}>Dubai</Text>,{" "}
            <Text style={styles.highlight}>New York</Text> or{" "}
            <Text style={styles.highlight}>London</Text>.
          </Text>
        </View>
      );
    }

    if (!hasSearched && events.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyTitle}>Discover events around you</Text>
          <Text style={styles.emptySubtitle}>
            Start by searching for <Text style={styles.highlight}>“Music”</Text>{" "}
            in <Text style={styles.highlight}>“Dubai”</Text> to see sample data.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.listContainer}>
        {events.map((item) => (
          <EventCard
            key={item.id}
            event={item}
            isFavourite={favouriteIds.includes(item.id)}
            onToggleFavourite={() => dispatch(toggleFavourite(item.id))}
            onPress={() => handlePressEvent(item)}
          />
        ))}
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
              <Text style={styles.searchTitle}>Find local events</Text>
              <LanguageToggle />
            </View>

            <TextInput
              placeholder="What are you looking for? (e.g. Music, Sports)"
              value={keyword}
              onChangeText={setKeyword}
              style={styles.input}
              placeholderTextColor="#8E8E93"
              returnKeyType="next"
            />
            <TextInput
              placeholder="City (e.g. Dubai, New York)"
              value={city}
              onChangeText={setCity}
              style={styles.input}
              placeholderTextColor="#8E8E93"
              returnKeyType="search"
              onSubmitEditing={onSearch}
            />

            <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
              <Text style={styles.searchButtonText}>SEARCH</Text>
            </TouchableOpacity>
          </View>

          {/* List / states */}
          {renderContent()}
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
  searchCard: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  searchHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: "#F9FAFB",
  },
  searchButton: {
    marginTop: 4,
    borderRadius: 10,
    backgroundColor: PRIMARY,
    alignItems: "center",
    paddingVertical: 12,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    letterSpacing: 0.8,
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 8,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  helperText: {
    marginTop: 8,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  highlight: {
    color: PRIMARY,
    fontWeight: "600",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#B91C1C",
    marginBottom: 4,
    textAlign: "center",
  },
  errorSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
  },
});

export default HomeScreen;
