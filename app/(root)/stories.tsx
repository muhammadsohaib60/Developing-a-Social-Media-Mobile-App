import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { router, useFocusEffect } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { setStories2 } from "@/constants/date-setter";
import { feedApiManager } from "./FeedApiManager";

interface StoryComponentProps {
  story_id: string;
  user_id: string;
  content_path: string;
  created_at: string;
  user_details: {
    username: string;
    profile_picture: string;
  };
}

const { width, height } = Dimensions.get("window");

const stories = setStories2();

const StoryScreen = () => {
  const onClose = () => {
    router.push("/home");
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  const [stories, setStories] = useState<StoryComponentProps[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onClose();
    }
  };

  const onSwipeLeft = () => handleNext();
  const onSwipeRight = () => handlePrevious();

  const getStories = async () => {
    const data = await feedApiManager.getTodayStories();
    setStories(data);
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Modal transparent={true} animationType="fade">
        <View style={styles.container}>
          <PanGestureHandler
            onGestureEvent={(event) => {
              if (event.nativeEvent.translationX > 50) {
                onSwipeRight();
              } else if (event.nativeEvent.translationX < -50) {
                onSwipeLeft();
              }
            }}
          >
            <View style={styles.content}>
              {stories[currentIndex].content_path[0] === "3" ? (
                <Image
                  source={{ uri: stories[currentIndex].content_path }}
                  style={styles.media}
                  resizeMode="contain"
                />
              ) : (
                <Video
                  ref={videoRef}
                  source={{ uri: stories[currentIndex].content_path }}
                  style={styles.media}
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay
                  isLooping
                />
              )}
            </View>
          </PanGestureHandler>

          <View style={styles.topControls}>
            <View style={styles.userInfo}>
              <TouchableOpacity onPress={() => router.push("/otherprofile")}>
                <Image
                  source={{
                    uri: stories[currentIndex].user_details.profile_picture,
                  }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <Text style={styles.username}>
                {stories[currentIndex].user_details.username}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              onPress={handlePrevious}
              style={styles.arrowButton}
            >
              <AntDesign name="left" size={36} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
              <AntDesign name="right" size={36} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            {stories.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressBar,
                  index <= currentIndex ? styles.activeBar : styles.inactiveBar,
                ]}
              />
            ))}
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: width,
    height: height * 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  topControls: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 25,
  },
  controls: {
    position: "absolute",
    width: width,
    height: height,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  arrowButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    padding: 10,
  },
  progressBarContainer: {
    position: "absolute",
    top: 20,
    width: width - 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressBar: {
    height: 4,
    flex: 1,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  activeBar: {
    backgroundColor: "#ffdd00",
  },
  inactiveBar: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});

export default StoryScreen;
