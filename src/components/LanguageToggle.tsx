import React from "react";
import { View, Button } from "react-native";
import { useAppDispatch, useAppSelector } from "../bridge/hooks";
import { setLanguage } from "../bridge/store/languageSlice";

const LanguageToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.language.code);

  const toggleLang = () => {
    dispatch(setLanguage(lang === "en" ? "ar" : "en"));
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 8,
      }}
    >
      <Button
        title={lang === "en" ? "Switch to Arabic" : "Switch to English"}
        onPress={toggleLang}
      />
    </View>
  );
};

export default LanguageToggle;
