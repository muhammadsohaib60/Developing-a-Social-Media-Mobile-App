import React from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { setStories } from "@/constants/date-setter";

const dummyStories = setStories();

const StoryComponent = () => {
  const renderItem = ({ item }: any) => {
    if (item.isAddNew) {
      return (
        <TouchableOpacity style={styles.storyContainer}>
          <LinearGradient
            colors={["#FFD700", "#FFD700"]}
            style={styles.storyCircle}
          >
            <Text style={styles.plusIcon}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.storyContainer}>
          <LinearGradient
            colors={["#FFD700", "#FFD700"]}
            style={styles.storyCircle}
          >
            <Image source={item.imageUrl} style={styles.storyImage} />
          </LinearGradient>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <FlatList
        data={dummyStories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  storyCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFD700",
    backgroundColor: "#E0E0E0",
  },
  plusIcon: {
    fontSize: 40,
    color: "#FFFFFF",
  },
  storyImage: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
});

export default StoryComponent;
