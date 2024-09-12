import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import GradientView from "@/components/GradientView";
import HomeSearchBar from "@/components/HomeSearchBar";
import StoryComponent from "@/components/StoryComponent";
import PostComponent from "@/components/PostComponent";
import { setPost } from "@/constants/date-setter";
import { feedApiManager } from "./FeedApiManager";
import { useFocusEffect } from "expo-router";

const Home = () => {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const data = await feedApiManager.getPosts();

    setPosts(data);

    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [])
  );

  return (
    <GradientView>
      <HomeSearchBar />
      <StoryComponent />
      {loading ? (
        <ActivityIndicator size="large" color="purple" />
      ) : (
        <View style={styles.timelineContainer}>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostComponent post={item} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </GradientView>
  );
};

export default Home;

const styles = StyleSheet.create({
  timelineContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
