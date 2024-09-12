import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import GradientView from "@/components/GradientView";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { feedApiManager } from "./FeedApiManager"; // Ensure this path is correct

const AddStory = () => {
  const [media, setMedia] = useState<any>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia((prevMedia: any) => [...prevMedia, ...result.assets]);
    }
  };

  const handleSubmit = async () => {
    if (media.length === 0) {
      Alert.alert("Error", "Please select at least one image or video");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Starting upload...");

    try {
      const userId = await AsyncStorage.getItem('userId');
      
      if (!userId) {
        throw new Error("User ID not found");
      }

      const created_at = new Date().toISOString();

      for (const item of media) {
        setUploadStatus(`Uploading ${media.indexOf(item) + 1} of ${media.length}...`);
        const result = await feedApiManager.uploadStoryAndCreateEntry(
          userId,
          item,
          created_at
        );

        if (!result.story) {
          throw new Error(result.error || "Failed to add story");
        }
      }

      setUploadStatus("All stories added successfully!");
      Alert.alert("Success", "All stories added successfully!");
      setMedia([]);
    } catch (error) {
      console.error("Error adding stories:", error);
      setUploadStatus(`Error: ${error.message}`);
      Alert.alert("Error", `Failed to add stories. ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <GradientView>
      <View style={styles.container}>
        {/* Media Preview */}
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

        {/* Pick Media Button */}
        <TouchableOpacity style={styles.button} onPress={pickMedia}>
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.buttonText}>Add Images or Videos</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, styles.submitButton, isUploading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isUploading}
        >
          <Text style={styles.buttonText}>
            {isUploading ? "Uploading..." : "Publish Story"}
          </Text>
        </TouchableOpacity>

        {/* Upload Status */}
        {uploadStatus !== "" && (
          <Text style={styles.statusText}>{uploadStatus}</Text>
        )}
      </View>
    </GradientView>
  );
};

export default AddStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    resizeMode: "contain",
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
    marginTop: 20,
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});