import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Thumbnail */}
      {event.image ? (
        <Image source={{ uri: event.image }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
          <Ionicons name="musical-notes-outline" size={24} color="#9CA3AF" />
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text numberOfLines={1} style={styles.title}>
            {event.name}
          </Text>

          <TouchableOpacity
            onPress={onToggleFavourite}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={isFavourite ? "heart" : "heart-outline"}
              size={22}
              color={isFavourite ? "#EF4444" : "#D1D5DB"}
            />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={1} style={styles.subtitle}>
          {event.venue || "Venue TBA"}
        </Text>

        <Text numberOfLines={1} style={styles.meta}>
          {[event.city, event.country].filter(Boolean).join(", ")}
        </Text>

        <Text style={styles.meta}>
          {event.date || "Date TBA"}
          {event.time ? ` · ${event.time}` : ""}
        </Text>

        <Text style={styles.ctaText}>Tap to view details</Text>
      </View>
    </TouchableOpacity>
  );
};

const CARD_BG = "#FFFFFF";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: CARD_BG,
    borderRadius: 14,
    marginBottom: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
  },
  thumbnailPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginRight: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  ctaText: {
    marginTop: 6,
    fontSize: 11,
    color: "#3B82F6",
    fontWeight: "500",
  },
});

export default EventCard;
