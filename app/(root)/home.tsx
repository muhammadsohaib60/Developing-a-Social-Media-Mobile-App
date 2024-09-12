import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import GradientView from "@/components/GradientView";
import HomeSearchBar from "@/components/HomeSearchBar";
import StoryComponent from "@/components/StoryComponent";
import PostComponent from "@/components/PostComponent";
import { setPost } from "@/constants/date-setter";

const posts = setPost();

const Home = () => {
  const [postsArr, setPostsArr] = useState<any>([]);

  useEffect(() => {}, []);

  return (
    <GradientView>
      <HomeSearchBar />
      <StoryComponent />
      <View style={styles.timelineContainer}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostComponent post={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
