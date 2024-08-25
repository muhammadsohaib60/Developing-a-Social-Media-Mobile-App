import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Header2 from "@/components/Header2";
import Progress from "@/components/Progress";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { img_btn } from "@/constants/images";

const Pictures = () => {
  const [images, setImages] = useState<string[]>([]);

  // Function to pick images
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5, // Limit the selection to 5 images
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImages(selectedImages);
    }
  };

  const handleSubmit = () => {
    // You can process the selected images or navigate to the next screen
    router.push("/confirmation");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Add Upto 5 Pictures"
        heading2="You can add up to 5 photos."
      />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={pickImages}
          style={{
            backgroundColor: "white",
            borderRadius: 100,
            padding: 10,
          }}
        >
          <Image source={img_btn} />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.imageContainer}>
          {images.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={styles.image}
            />
          ))}
        </ScrollView>

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

      <Progress activeCircles={3} />
    </SafeAreaView>
  );
};

export default Pictures;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B008290",
    gap: 40,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
});
