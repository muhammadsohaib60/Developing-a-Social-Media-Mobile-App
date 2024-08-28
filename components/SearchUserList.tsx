import { setUsersInSearch } from "@/constants/date-setter";
import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const UserList = ({ tab }: { tab: string }) => {
  const users = setUsersInSearch(tab);
  const renderItem = ({ item }: any) => (
    <View style={styles.userContainer}>
      <Image source={item.imageUrl} style={styles.userImage} />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userLocation}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userLocation: {
    fontSize: 14,
    color: "#666",
  },
});

export default UserList;
