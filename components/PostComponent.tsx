import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  Share,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { comment, like, share } from "@/constants/icons";
import { router } from "expo-router";
import { feedApiManager, Post } from "@/app/(root)/FeedApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const PostComponent = ({ post }: { post: Post }) => {
  const scrollRef = useRef<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<any>([]);
  const [reactionModalVisible, setReactionModalVisible] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reaction, setReaction] = useState("neutral");
  const [showIcon, setShowIcon] = useState(false); // To show/hide play/pause icon
  const [shouldPlay, setShouldPlay] = useState(false);

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif|tiff|bmp|svg|webp|heif|heic)$/i.test(url);
  };

  const isVideo = (url: string) => {
    return /\.(mp4|avi|mov|wmv|flv|mkv|webm|mpeg)$/i.test(url);
  };

  const lastPress = useRef(0);

  const handleReactionTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 500;

    if (now - lastPress.current < DOUBLE_PRESS_DELAY) {
      setReactionModalVisible(false);
      handleDoubleTap();
    } else {
      lastPress.current = now;
      handleSingleTap();
    }
  };

  const handleSingleTap = () => {
    setReactionModalVisible(true);
  };

  const handleDoubleTap = () => {
    handleReaction("neutral");
  };

  const sharePost = async () => {
    try {
      const result = await Share.share({
        message: "post link here",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("Content shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Content sharing dismissed");
      }
    } catch (error) {
      console.error("Error sharing content: ", error);
    }
  };

  const getReaction = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      return;
    }
    const data = await feedApiManager.fetchReactionOnPost(
      post.posts_id,
      userId
    );
    setReaction(data.reaction_type);
  };

  const onScroll = (event: any) => {
    const slideIndex = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    setActiveIndex(slideIndex);
  };

  const toggleComments = (id: any) => {
    setShowComments(!showComments);
    getComments(id);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      return;
    }
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      return;
    }
    await feedApiManager.postComment(post.posts_id, userId, newComment);
    getComments(post.posts_id);
  };

  const handleReaction = async (reaction: any) => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      return;
    }
    await feedApiManager.reactOnPost(post.posts_id, userId, reaction);

    setSelectedReaction(reaction);
    setReactionModalVisible(false);
    getReaction();
  };

  const getComments = async (id: any) => {
    const data = await feedApiManager.getCommentsForPost(id);
    setComments(data);
    setLoading(false);
  };

  const handleTap = () => {
    setShouldPlay(!shouldPlay);
    setShowIcon(true);
    setTimeout(() => setShowIcon(false), 2000);
  };

  useEffect(() => {
    getReaction();
  });

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/otherprofile")}>
          <Image
            source={{
              uri: post.user_details.profile_picture,
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <Text style={styles.userName}>{post.user_details.username}</Text>
      </View>
      <Text style={styles.caption}>{post.caption}</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={styles.mediaContainer}
      >
        {post.content_path.map((media: string, index: any) => (
          <View key={index} style={styles.mediaWrapper}>
            {isImage(media) ? (
              <Image
                source={{ uri: media }}
                style={styles.media}
                resizeMode="contain"
              />
            ) : (
              <TouchableWithoutFeedback
                style={{ backgroundColor: "transparent" }}
                onPress={handleTap}
              >
                <View style={{ width: "100%" }}>
                  <Video
                    source={{ uri: media } as any}
                    style={styles.media}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={shouldPlay && activeIndex === index}
                    isLooping
                  />
                  {showIcon && (
                    <View style={styles.iconOverlay}>
                      {shouldPlay ? (
                        <AntDesign
                          name="pausecircleo"
                          size={40}
                          color="white"
                        />
                      ) : (
                        <AntDesign name="playcircleo" size={40} color="white" />
                      )}
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {post.content_path.map((_: any, index: any) => (
          <Text
            key={index}
            style={index === activeIndex ? styles.activeDot : styles.dot}
          >
            ⬤
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleReactionTap}>
          {reaction === "like" ? (
            <Text style={{ color: "black", fontSize: 20 }}>👍</Text>
          ) : reaction === "dislike" ? (
            <Text style={{ color: "black", fontSize: 20 }}>👎 </Text>
          ) : (
            <Image source={like} style={styles.icon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleComments(Number(post.posts_id))}>
          <Image source={comment} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={sharePost}>
          <Image source={share} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {showComments &&
        (loading ? (
          <ActivityIndicator size="large" color="purple" />
        ) : (
          <View style={styles.commentSection}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity
              onPress={handleAddComment}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add Comment</Text>
            </TouchableOpacity>

            <Text style={styles.commentTitle}>Comments</Text>
            {comments.map((comment: any) => (
              <View key={comment.id} style={styles.commentContainer}>
                <Image
                  source={{ uri: comment.user_details.profile_picture }}
                  style={styles.commentUserImage}
                />
                <View>
                  <Text style={styles.commentUserName}>
                    {comment.user_details.username}
                  </Text>
                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}

      {/* Reaction Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={reactionModalVisible}
        onRequestClose={() => setReactionModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.reactionOption}
              onPress={() => handleReaction("like")}
            >
              <Text style={styles.reactionText}>👍 Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reactionOption}
              onPress={() => handleReaction("dislike")}
            >
              <Text style={styles.reactionText}>👎 Dislike</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mediaContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  mediaWrapper: {
    width: width - 64,
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  media: {
    width: "100%",
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 8,
  },
  dot: {
    fontSize: 10,
    color: "#888",
    marginHorizontal: 4,
  },
  activeDot: {
    fontSize: 10,
    color: "#000",
    marginHorizontal: 4,
  },
  caption: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "ReemRegular",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  commentSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "ReemBold",
    marginTop: 16,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  commentUserImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "ReemBold",
  },
  commentText: {
    fontSize: 14,
    fontFamily: "ReemRegular",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#4B0082",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: 200,
    alignItems: "center",
  },
  reactionOption: {
    paddingVertical: 12,
  },
  reactionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconOverlay: { position: "absolute", top: "45%", left: "45%" },
});
