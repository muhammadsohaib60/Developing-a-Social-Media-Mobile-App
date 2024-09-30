import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { setUser } from "@/constants/date-setter";
import { router } from "expo-router";
import { feedApiManager } from "@/app/(root)/FeedApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      return;
    }

    const data = await feedApiManager.getUserProfile(userId);
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user.user_name}</Text>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.textSection}>
          <Text style={styles.name}>{user.full_name}</Text>
          <Text style={styles.phone}>{user.phone_number}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <Image
          source={{ uri: user.profile_picture }}
          style={styles.profileImage}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.buttonText}>My Communities</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
    margin: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  username: {
    fontSize: 16,
    fontFamily: "ReemBold",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  textSection: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontFamily: "ReemBold",
  },
  jobTitle: {
    fontSize: 13,
    color: "gray",
    fontFamily: "ReemRegular",
  },
  tags: {
    flexDirection: "row",
    marginVertical: 5,
    color: "gray",
  },
  tagText: {
    color: "gray",
    fontFamily: "ReemRegular",
    fontSize: 13,
  },
  phone: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: "ReemRegular",
  },
  email: {
    fontSize: 13,
    fontFamily: "ReemBold",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    width: 120,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "ReemRegular",
  },
});

export default UserProfile;
