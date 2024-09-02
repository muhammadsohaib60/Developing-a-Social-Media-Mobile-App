import React, { useRef, useState } from "react";
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
} from "react-native";
import { comment, like, share } from "@/constants/icons";
import { user } from "@/constants/images";

const { width } = Dimensions.get("window");

const PostComponent = ({ post }: any) => {
  const scrollRef = useRef<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      userName: "John Doe",
      userImage: user,
      text: "This looks awesome!",
    },
    {
      id: 2,
      userName: "Jane Smith",
      userImage: user,
      text: "Great party!",
    },
  ]);
  const [reactionModalVisible, setReactionModalVisible] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const onScroll = (event: any) => {
    const slideIndex = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    setActiveIndex(slideIndex);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          userName: "You",
          userImage: user,
          text: newComment,
        },
      ]);
      setNewComment("");
    }
  };

  const handleReaction = (reaction: any) => {
    setSelectedReaction(reaction);
    setReactionModalVisible(false);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={post.user.profileImage} style={styles.profileImage} />
        <Text style={styles.userName}>{post.user.name}</Text>
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
        {post.postMedia.map((media: any, index: any) => (
          <Image
            key={index}
            source={media}
            style={styles.media}
            resizeMode="contain"
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {post.postMedia.map((_: any, index: any) => (
          <Text
            key={index}
            style={index === activeIndex ? styles.activeDot : styles.dot}
          >
            ⬤
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setReactionModalVisible(true)}>
          <Image source={like} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleComments}>
          <Image source={comment} style={styles.icon} />
        </TouchableOpacity>
        <Image source={share} style={styles.icon} />
      </View>

      {showComments && (
        <View style={styles.commentSection}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleAddComment} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Comment</Text>
          </TouchableOpacity>
          <Text style={styles.commentTitle}>Comments</Text>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentContainer}>
              <Image
                source={comment.userImage}
                style={styles.commentUserImage}
              />
              <View>
                <Text style={styles.commentUserName}>{comment.userName}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

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
            <TouchableOpacity
              style={styles.reactionOption}
              onPress={() => handleReaction("neutral")}
            >
              <Text style={styles.reactionText}>😐 Neutral</Text>
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
  media: {
    width: width - 64,
    height: 200,
    borderRadius: 12,
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
    backgroundColor: "#007BFF",
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
});
