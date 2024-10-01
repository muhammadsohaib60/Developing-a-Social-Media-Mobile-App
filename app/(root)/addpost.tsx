import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import GradientView from "@/components/GradientView";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { feedApiManager } from "./FeedApiManager"; // Update this path

const AddPost = () => {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<any>([]);
  const [isUploading, setIsUploading] = useState(false);

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Selected media:", result.assets);
      setMedia((prevMedia: any) => [...prevMedia, ...result.assets]);
    }
  };

  const handleSubmit = async () => {
    if (media.length === 0) {
      Alert.alert("Error", "Please select at least one image or video");
      return;
    }

    if (!caption) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    setIsUploading(true);

    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) {
        throw new Error("User ID not found");
      }

      // Extract URIs from media objects
      const fileUris = media.map((item: any) => item.uri).filter(Boolean);

      if (fileUris.length === 0) {
        throw new Error("No valid file URIs found");
      }

      const created_at = new Date().toISOString();

      console.log("Uploading files:", fileUris);

      const result = await feedApiManager.uploadFilesAndCreatePost(
        userId,
        fileUris,
        caption,
        created_at
      );

      if (result.post) {
        Alert.alert("Success", "Post created successfully!");
        setCaption("");
        setMedia([]);
      } else if (
        result.failedUploads > 0 &&
        result.failedUploads < fileUris.length
      ) {
        Alert.alert(
          "Partial Success",
          `Post created with ${fileUris.length - result.failedUploads} out of ${
            fileUris.length
          } files. Some files failed to upload.`
        );
        setCaption("");
        setMedia([]);
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <GradientView>
      <View style={styles.container}>
        <ScrollView horizontal style={styles.mediaPreviewContainer}>
          {media.map((item: any, index: any) => (
            <View key={index} style={styles.mediaContainer}>
              {item.type === "video" ? (
                <Video source={{ uri: item.uri }} style={styles.media} />
              ) : (
                <Image source={{ uri: item.uri }} style={styles.media} />
              )}
            </View>
          ))}
        </ScrollView>

        <TextInput
          style={styles.input}
          placeholder="Write a Title..."
          placeholderTextColor="#888"
          value={caption}
          onChangeText={setCaption}
        />

        <TouchableOpacity style={styles.button} onPress={pickMedia}>
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.buttonText}>Add Images</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.submitButton,
            isUploading && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={isUploading}
        >
          <Text style={styles.buttonText}>
            {isUploading ? "Uploading..." : "Submit Post"}
          </Text>
        </TouchableOpacity>
      </View>
    </GradientView>
  );
};

export default AddPost;

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    fontSize: 16,
    fontFamily: "ReemRegular",
    color: "#000",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  mediaPreviewContainer: {
    marginBottom: 20,
  },
  mediaContainer: {
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  media: {
    width: 200,
    height: 400,
    resizeMode: ResizeMode.COVER,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#4B0082",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "ReemBold",
  },
  submitButton: {
    backgroundColor: "#228B22",
    marginTop: 10,
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
};
