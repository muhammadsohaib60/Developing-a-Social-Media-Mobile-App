import { signUpProps } from "@/constants/types";
import { supabase } from "../supabaseClient"; // Adjust this path as needed
import * as FileSystem from "expo-file-system";
import { decode } from "base-64";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signup = async (data: signUpProps) => {
  console.log("Signup data:", data);

  try {
    const currentTimestamp = new Date().toISOString(); // Get the current timestamp in ISO format

    const { data: newUser, error } = await supabase
      .from("user_details")
      .insert([
        {
          email: data.email,
          password: data.password, // Note: In a production app, ensure this is properly hashed
          phone_number: data.phone,
          username: data.username,
          full_name: data.fullName,
          birthday: data.dateOfBirth,
          gender: data.gender,
          country: data.country,
          state: data.state,
          local_government: data.localGovernment,
          neighborhood: data.neighborhood,
          secondary_school_name: data.secondarySchool,
          secondary_school_grad_year: parseInt(data.schoolYear),
          uni_name: data.university,
          uni_grad_year: parseInt(data.universityYear),
          uni_department: data.department,
          religion: data.religion,
          muslim_sect:
            data.religion === "Muslim" ? data.religionSpecific : null,
          church: data.religion === "Christian" ? data.religionSpecific : null,
          political_party: data.politicalParty,
          sports_club: data.sportsClub,
          ethnic_tribe: data.ethnicTribe,
          profile_pictures: [], // Empty array initially
          created_at: currentTimestamp,
        },
      ])
      .select() // This will return the inserted row, including the auto-incremented user_id
      .single(); // We expect a single row to be returned

    if (error) throw error;

    if (!newUser || !newUser.user_id) {
      throw new Error("User creation failed or user ID is missing");
    }

    // console.log('User signed up successfully:', newUser);
    return newUser;
  } catch (error) {
    console.error("Error in signup function:", error);
    throw error;
  }
};

async function uploadImageToBucket(
  uri: string,
  username: string,
  index: number
): Promise<string> {
  const MAX_RETRIES = 3;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      //console.log(`Attempting to upload image (attempt ${retries + 1}): ${uri}`);

      // Check if file exists and is readable
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        throw new Error(`File does not exist: ${uri}`);
      }

      // Read file as base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert Base64 to Uint8Array
      const uint8Array = new Uint8Array(atob(base64).split('').map(char => char.charCodeAt(0)));

      const fileName = `${username}_${index + 1}.jpg`;
      const filePath = `images_user_signup/${fileName}`;

      //console.log(`Uploading to Supabase: ${filePath}`);
      const { data, error } = await supabase.storage
        .from("images_user_signup")
        .upload(filePath, uint8Array, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images_user_signup").getPublicUrl(filePath);

      //console.log(`Upload successful, public URL: ${publicUrl}`);
      return publicUrl;
    } catch (error) {
      // console.error(`Error in uploadImageToBucket (attempt ${retries + 1}):`, error);
      retries++;
      if (retries >= MAX_RETRIES) {
        throw error;
      }
      // Wait for a short time before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw new Error("Max retries reached for image upload");
}
export const uploadImagesAndUpdateUser = async (
  userId: number,
  images: string[],
  username: string
) => {
  //console.log('Received userId:', userId);
  //console.log('Received images:', images);
  // console.log('Received username:', username);

  try {
    const imageUploadResults = await Promise.allSettled(
      images.map((uri, index) => uploadImageToBucket(uri, username, index))
    );

    const successfulUploads = imageUploadResults
      .filter(
        (result): result is PromiseFulfilledResult<string> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);

    const failedUploads = imageUploadResults
      .filter(
        (result): result is PromiseRejectedResult =>
          result.status === "rejected"
      )
      .map((result) => result.reason);

    if (failedUploads.length > 0) {
      console.error("Some image uploads failed:", failedUploads);
    }

    if (successfulUploads.length > 0) {
      const { data, error } = await supabase
        .from("user_details")
        .update({ profile_pictures: successfulUploads })
        .eq("user_id", userId)
        .select();

      if (error) {
        //console.error('Error updating user:', error);
        throw error;
      }

      //console.log('User updated with image URLs:', data);
      return { data, failedUploads: failedUploads.length };
    } else {
      throw new Error("All image uploads failed");
    }
  } catch (error) {
    console.error("Error in uploadImagesAndUpdateUser:", error);
    throw error;
  }
};

export const signin = async (emailOrPhone: string, password: string) => {
  try {
    const { data: user, error } = await supabase
      .from("user_details")
      .select("*")
      .or(`email.eq.${emailOrPhone},phone_number.eq.${emailOrPhone}`)
      .eq("password", password)
      .single();

    if (error) throw error;

    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (!user.user_id) {
      throw new Error("User ID is missing");
    }

    // Store user_id in AsyncStorage
    await AsyncStorage.setItem('userId', user.user_id.toString());
    console.log("Stored user ID:", user.user_id.toString());

    // Clear all other AsyncStorage items
    const allKeys = await AsyncStorage.getAllKeys();
    const keysToRemove = allKeys.filter(key => key !== 'userId');
    await AsyncStorage.multiRemove(keysToRemove);

    //console.log('User signed in successfully:', user);
    return user;
  } catch (error) {
    console.error("Error signing in:", (error as Error).message);
    throw error;
  }
};