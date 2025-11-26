import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { searchEventsRequest } from "../bridge/store/eventsSlice";
import { toggleFavourite } from "../bridge/store/favouritesSlice";
import { useAppDispatch, useAppSelector } from "../bridge/hooks";
import EventCard from "../components/EventCard";
import LanguageToggle from "../components/LanguageToggle";
import type { RootStackParamList } from "../navigation/RootNavigator";
import type { EventItem } from "../bridge/types/events";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");

  const events = useAppSelector((state) => state.events.items);
  const loading = useAppSelector((state) => state.events.loading);
  const error = useAppSelector((state) => state.events.error);
  const favouriteIds = useAppSelector((state) => state.favourites.ids);

  const onSearch = () => {
    if (!keyword && !city) return;
    dispatch(searchEventsRequest({ keyword, city }));
  };

  const handlePressEvent = (event: EventItem) => {
    navigation.navigate("EventDetails", { event });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <LanguageToggle />

      <TextInput
        placeholder="Keyword (e.g. music)"
        value={keyword}
        onChangeText={setKeyword}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="City (e.g. Dubai)"
        value={city}
        onChangeText={setCity}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <Button title="Search" onPress={onSearch} />

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {error && <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>}

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            isFavourite={favouriteIds.includes(item.id)}
            onToggleFavourite={() => dispatch(toggleFavourite(item.id))}
            onPress={() => handlePressEvent(item)}
          />
        )}
      />

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default HomeScreen;
