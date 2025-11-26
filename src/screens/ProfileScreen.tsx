import React from "react";
import { View, Text, FlatList } from "react-native";
import { useAppSelector } from "../bridge/hooks";

const ProfileScreen: React.FC = () => {
  const favouriteIds = useAppSelector((state) => state.favourites.ids);
  const language = useAppSelector((state) => state.language.code);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
        Profile
      </Text>

      <Text>Language: {language}</Text>

      <Text style={{ marginTop: 16, fontWeight: "bold" }}>
        Favourite Event IDs:
      </Text>

      {favouriteIds.length === 0 ? (
        <Text>No favourites yet.</Text>
      ) : (
        <FlatList
          data={favouriteIds}
          keyExtractor={(id) => id}
          renderItem={({ item }) => <Text>- {item}</Text>}
        />
      )}
    </View>
  );
};

export default ProfileScreen;
