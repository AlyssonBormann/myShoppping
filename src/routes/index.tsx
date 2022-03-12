import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

type User = {
  uid: string;
};

export function Routes() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });

    return subscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
