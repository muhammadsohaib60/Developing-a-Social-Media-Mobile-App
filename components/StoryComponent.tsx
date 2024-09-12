import React, { useCallback, useEffect, useState } from "react";
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
import { router, useFocusEffect } from "expo-router";
import { feedApiManager, Story } from "@/app/(root)/FeedApiManager";

interface StoryComponentProps {
  isAddNew?: boolean;
  story_id: string;
  user_id?: string;
  content_path?: string;
  created_at?: string;
  user_details?: {
    username: string;
    profile_picture: string | null;
  };
}

const StoryComponent = () => {
  const [stories, setStories] = useState<StoryComponentProps[]>([
    {
      story_id: "0",
      isAddNew: true,
    },
  ]);
  const [loading, setLoading] = useState(true);

  const getStories = async () => {
    const data = await feedApiManager.getTodayStories();
    setStories([
      {
        story_id: "0",
        isAddNew: true,
      },
      ...data,
    ]);
    setLoading(false);
  };

  useEffect(() => {
    getStories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused

      return () => {
        getStories();
      };
    }, [])
  );

  const renderItem = ({ item }: any) => {
    if (item.isAddNew) {
      return (
        <TouchableOpacity
          style={styles.storyContainer}
          onPress={() => router.push("/addstory")}
        >
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
        <TouchableOpacity
          style={styles.storyContainer}
          onPress={() => router.push("/stories")}
        >
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
        data={stories}
        renderItem={renderItem}
        keyExtractor={(item) => item.story_id}
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
