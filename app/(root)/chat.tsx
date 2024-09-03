import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import GradientView from "@/components/GradientView";
import { setChats } from "@/constants/date-setter";
import { router } from "expo-router";

const chats = setChats();

const Chat = () => {
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => router.push(`/single-chat?id=${item.id}`)}
      >
        <Image source={item.imageUrl} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GradientView>
      <View style={styles.container}>
        <Text style={{ fontFamily: "ReemBold", fontSize: 17, padding: 10 }}>
          Messages
        </Text>
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </GradientView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: "ReemBold",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: "ReemRegular",
    color: "#666",
  },
});
