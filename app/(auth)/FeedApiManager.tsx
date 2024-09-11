import { supabase } from "../../supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

class FeedApiManager {
  private static instance: FeedApiManager;

  private constructor() {
    // Private constructor to prevent direct construction calls with the `new` operator.
  }

  public static getInstance(): FeedApiManager {
    if (!FeedApiManager.instance) {
      FeedApiManager.instance = new FeedApiManager();
    }

    return FeedApiManager.instance;
  }

  // ... [previous methods remain the same]

  async createPost(
    userId: string,
    contentType: 'video' | 'image',
    file: File,
    caption: string
  ): Promise<Post> {
    try {
      // 1. Upload the file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('posts')  // Make sure this bucket exists in your Supabase project
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Create a new post entry
      const { data, error: insertError } = await supabase
        .from('posts')
        .insert({
          user_id: userId,
          content_type: contentType,
          content_path: filePath,
          caption: caption,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) throw insertError;

      return data as Post;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }
}

export const feedApiManager = FeedApiManager.getInstance();