import { setCommunities } from "@/constants/date-setter";
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

const postsData = setCommunities();
const Posts = () => {
  const handlePostPress = (postId: any) => {
    console.log(`Post with ID: ${postId} clicked`);
  };

  return (
    <View style={styles.container}>
      {postsData.map((post) => (
        <TouchableOpacity
          key={post.id}
          style={styles.postContainer}
          onPress={() => handlePostPress(post.id)}
        >
          <Image source={post.imageUrl} style={styles.image} />
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
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
