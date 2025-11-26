import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAppDispatch, useAppSelector } from "../bridge/hooks";
import { toggleFavourite } from "../bridge/store/favouritesSlice";
import EventCard from "../components/EventCard";
import type { RootStackParamList } from "../navigation/RootNavigator";
import type { EventItem } from "../bridge/types/events";

type Props = NativeStackScreenProps<RootStackParamList, "Favourites">;

const SCREEN_BG = "#F3F4F6";

const FavouritesScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const favouriteIds = useAppSelector(
    (state) => state.favourites?.ids ?? []   // SAFE
  );

  const itemsById = useAppSelector(
    (state) => state.favourites?.itemsById ?? {}  // SAFE
  );

  const favourites: EventItem[] = favouriteIds
    .map((id) => itemsById[id])
    .filter((e): e is EventItem => !!e);

  const handlePressEvent = (event: EventItem) => {
    navigation.navigate("EventDetails", { event });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {favourites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No favourites yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on an event to save it.
            </Text>
          </View>
        ) : (
          favourites.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isFavourite={true}
              onToggleFavourite={() => dispatch(toggleFavourite(event))}
              onPress={() => handlePressEvent(event)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default FavouritesScreen;
