import { feedApiManager } from "@/app/(root)/FeedApiManager";
import { setCommunities } from "@/constants/date-setter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";

const Posts = () => {
  const [postsData, setPostsData] = useState<any[]>([]);

  const handlePostPress = (postId: any) => {
    console.log(`Post with ID: ${postId} clicked`);
  };

  const fetchPosts = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      return;
    }
    const data = await feedApiManager.getUserPosts(userId);
    console.log(data);
    setPostsData(data);
  };

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif|tiff|bmp|svg|webp|heif|heic)$/i.test(url);
  };

  const isVideo = (url: string) => {
    return /\.(mp4|avi|mov|wmv|flv|mkv|webm|mpeg)$/i.test(url);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (postsData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {postsData.map((post) => (
        <TouchableOpacity
          key={post.id}
          style={styles.postContainer}
          onPress={() => handlePostPress(post.id)}
        >
          {isImage(post.content_path) ? (
            <Image source={{ uri: post.content_path }} style={styles.image} />
          ) : isVideo(post.content_path) ? (
            <>
              <Video
                source={{ uri: post.content_path }}
                style={styles.image}
                resizeMode={ResizeMode.CONTAIN}
                onLoadStart={() => console.log("Video is loading...")}
                onLoad={() => console.log("Video loaded!")}
                onError={(error) => console.log("Video error: ", error)}
              />
            </>
          ) : (
            <Text>Hello</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  postContainer: {
    width: 120,
    height: 120,
    marginBottom: 5,
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
