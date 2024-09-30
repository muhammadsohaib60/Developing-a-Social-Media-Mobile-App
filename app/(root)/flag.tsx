import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import GradientView from "@/components/GradientView";
import { setFlags } from "@/constants/date-setter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { feedApiManager } from "./FeedApiManager";
import { ResizeMode, Video } from "expo-av";
import { useFocusEffect } from "expo-router";

const Flag = () => {
  const [reaction, setReaction] = useState<any[]>([]);

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif|tiff|bmp|svg|webp|heif|heic)$/i.test(url);
  };

  const isVideo = (url: string) => {
    return /\.(mp4|avi|mov|wmv|flv|mkv|webm|mpeg)$/i.test(url);
  };

  const getReactions = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      return;
    }

    const data = await feedApiManager.getUserReactions(userId);
    setReaction(data);
  };

  useEffect(() => {
    getReactions();
  }, []);

  if (reaction.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          {isImage(item.post_details.content_path) ? (
            <Image
              source={{ uri: item.post_details.content_path }}
              style={styles.image}
            />
          ) : (
            <Video
              source={{ uri: item.post_details.content_path }}
              style={styles.image}
              resizeMode={ResizeMode.CONTAIN}
              onLoadStart={() => console.log("Video is loading...")}
              onLoad={() => console.log("Video loaded!")}
              onError={(error) => console.log("Video error: ", error)}
            />
          )}
        </View>
        <View style={styles.txtContainer}>
          <Text
            style={styles.msg}
          >{`You ${item.reaction_type}d ${item.post_details.user_details.username}'s post `}</Text>
          <Text style={styles.caption}>{item.post_details.caption}</Text>
        </View>
      </View>
    );
  };

  return (
    <GradientView>
      <View style={styles.listContainer}>
        <FlatList
          data={reaction}
          renderItem={renderItem}
          keyExtractor={(item) => item.reaction_id}
        />
      </View>
    </GradientView>
  );
};

export default Flag;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  imgContainer: {
    marginRight: 15,
    backgroundColor: "black",
    borderRadius: 8,
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: "contain",
    borderRadius: 5,
  },
  txtContainer: {
    flex: 1,
  },
  msg: {
    fontSize: 18,
    fontFamily: "ReemBold",
    marginBottom: 5,
  },
  caption: {
    fontSize: 14,
    fontFamily: "ReemRegular",
    color: "#666",
  },
});
function fetchPosts() {
  throw new Error("Function not implemented.");
}
