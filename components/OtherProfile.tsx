import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { setUser } from "@/constants/date-setter";

const OtherProfile = () => {
  const user = setUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user.username}</Text>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.textSection}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.jobTitle}>{user.jobTitle}</Text>
          <Text style={styles.tags}>
            {user.tags.map((tag, index) => (
              <Text key={index} style={styles.tagText}>
                #{tag}{" "}
              </Text>
            ))}
          </Text>
          <Text style={styles.phone}>{user.phone}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <Image source={user.profileImage} style={styles.profileImage} />
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
    borderRadius: 40,
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",

    width: 100,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "ReemRegular",
  },
});

export default OtherProfile;
