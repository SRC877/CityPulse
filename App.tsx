import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/bridge/store";
import RootNavigator from "./src/navigation/RootNavigator";

const LoadingGate: React.FC = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator size="large" />
  </View>
);

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingGate />} persistor={persistor}>
      <RootNavigator />
    </PersistGate>
  </Provider>
);

export default App;
