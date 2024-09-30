import { feedApiManager } from "@/app/(root)/FeedApiManager";
import { setUsersInSearch } from "@/constants/date-setter";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const UserList = ({ tab, query }: { tab: string; query: string }) => {
  const [data, setData] = useState<any>([]);

  // Function to fetch user data
  const getData = async () => {
    const res = await feedApiManager.getUsers();
    setData(res);
  };

  // Handle tab change to fetch the relevant data
  const handleTabChange = async () => {
    if (tab === "Accounts") {
      const res = await feedApiManager.getUsers();
      setData(res);
    }
    if (tab === "Tribes") {
      const res = await feedApiManager.getTribes();
      setData(res);
    }
    if (tab === "Posts") {
      // Fetch posts logic here
    }
    if (tab === "Tags") {
      // Fetch tags logic here
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Handle tab changes
  useEffect(() => {
    handleTabChange();
  }, [tab]);

  // Filter the data based on the query
  const filteredData = data.filter(
    (item: any) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.details.toLowerCase().includes(query.toLowerCase())
  );

  // Render each user item
  const renderItem = ({ item }: any) => (
    <View style={styles.userContainer}>
      <Image source={{ uri: item.img }} style={styles.userImage} />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item.title}</Text>
        <Text style={styles.userLocation}>{item.details}</Text>
      </View>
    </View>
  );

  if (data.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <FlatList
      data={filteredData} // Use the filtered data here
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

// Styling
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
