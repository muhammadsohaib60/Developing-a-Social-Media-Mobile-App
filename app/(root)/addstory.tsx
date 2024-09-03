import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import GradientView from "@/components/GradientView";
import { Ionicons } from "@expo/vector-icons";

const AddStory = () => {
  const [media, setMedia] = useState<any>([]);

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

  const handleSubmit = () => {
    // Handle story submission logic here (e.g., upload to server or database)
    console.log("Story submitted:", media);
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
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Pubish Story</Text>
        </TouchableOpacity>
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
});
