import React from "react";
import { TouchableOpacity, View, Text, Button, Image } from "react-native";
import type { EventItem } from "../bridge/types/events";

interface Props {
  event: EventItem;
  isFavourite: boolean;
  onToggleFavourite: () => void;
  onPress: () => void;
}

const EventCard: React.FC<Props> = ({
  event,
  isFavourite,
  onToggleFavourite,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {event.image && (
        <Image
          source={{ uri: event.image }}
          style={{ width: 100, height: 100 }}
        />
      )}
      <View style={{ flex: 1, padding: 8 }}>
        <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
          {event.name}
        </Text>
        <Text numberOfLines={1}>{event.venue}</Text>
        <Text>{event.date}</Text>
        <Button
          title={isFavourite ? "Unfavourite" : "Favourite"}
          onPress={onToggleFavourite}
        />
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
