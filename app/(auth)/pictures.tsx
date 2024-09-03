import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import Header2 from "@/components/Header2";
import Progress from "@/components/Progress";
import CustomButton from "@/components/CustomButton";
import { img_btn } from "@/constants/images";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signup, uploadImagesAndUpdateUser } from "@/utils/authMethods";

const Pictures = () => {
  const [images, setImages] = useState<string[]>([]);
  const { signUpData, setSignUpData } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImages(selectedImages);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newUser = await signup({
        ...signUpData,
        profile_pictures: [],
      });

      if (newUser && newUser.user_id) {
        const result = await uploadImagesAndUpdateUser(
          newUser.user_id,
          images,
          signUpData.username
        );

        if (result.failedUploads > 0) {
          Alert.alert(
            "Partial Success",
            `User created successfully, but ${result.failedUploads} image(s) failed to upload. You can try uploading them later.`
          );
        } else {
          Alert.alert(
            "Success",
            "User created and all images uploaded successfully!"
          );
        }

        router.push("/confirmation");
      } else {
        throw new Error("User creation failed or user ID is missing");
      }
    } catch (error) {
      console.error("Error during signup or image upload:", error);
      Alert.alert(
        "Error",
        "There was an error during the signup process. Please try again."
      );
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Add Up to 5 Pictures"
        heading2="You can add up to 5 photos."
      />
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImages} style={styles.pickButton}>
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

        {!loading ? (
          <CustomButton size={18} text="Next" handlePress={handleSubmit} />
        ) : (
          <ActivityIndicator size="large" color="yellow" />
        )}
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
  pickButton: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 10,
  },
});
