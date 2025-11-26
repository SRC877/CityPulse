import React from "react";
import { ScrollView, View, Text, Image, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAppDispatch, useAppSelector } from "../bridge/hooks";
import { toggleFavourite } from "../bridge/store/favouritesSlice";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "EventDetails">;

const EventDetailsScreen: React.FC<Props> = ({ route }) => {
  const { event } = route.params;
  const dispatch = useAppDispatch();

  const favouriteIds = useAppSelector((state) => state.favourites.ids);
  const isFav = favouriteIds.includes(event.id);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {event.image && (
        <Image
          source={{ uri: event.image }}
          style={{ width: "100%", height: 220, borderRadius: 8 }}
        />
      )}

      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 12 }}>
        {event.name}
      </Text>
      {event.venue ? <Text>{event.venue}</Text> : null}
      <Text>
        {[event.city, event.country].filter(Boolean).join(", ")}
      </Text>
      <Text>
        {event.date || "Date TBA"} {event.time ? `· ${event.time}` : ""}
      </Text>

      <View style={{ marginTop: 12 }}>
        <Button
          title={isFav ? "Remove from favourites" : "Add to favourites"}
          onPress={() => dispatch(toggleFavourite(event))}
        />
      </View>
    </ScrollView>
  );
};

export default EventDetailsScreen;
