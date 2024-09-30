import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import GradientView from "@/components/GradientView";
import { setChatUser, setMessages } from "@/constants/date-setter";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const user = setChatUser();
const messages = setMessages();

const SingleChat = () => {
  const renderMessage = ({ item }: any) => {
    const isSender = item.senderId === user.id;

    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text
          style={isSender ? styles.sentMessageText : styles.receivedMessageText}
        >
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <GradientView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>router.push("/chat")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Image source={user.profileImage} style={styles.profileImage} />
          <Text style={styles.name}>{user.name}</Text>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity>
            <Ionicons name="send" size={24} color="indigo" />
          </TouchableOpacity>
        </View>
      </View>
    </GradientView>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: "ReemBold",
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "75%",
  },
  sentMessage: {
    backgroundColor: "#4B0082", // Indigo color for sent messages
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
  },
  sentMessageText: {
    fontSize: 16,
    fontFamily: "ReemRegular",
    color: "#fff", // White color for message text
  },
  receivedMessageText: {
    fontSize: 16,
    fontFamily: "ReemRegular",
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "ReemRegular",
    color: "#000",
  },
});
