import { supabase } from "../../supabaseClient";
import * as FileSystem from "expo-file-system";

interface Post {
  id: string;
  user_id: string;
  content_paths: string[];
  caption: string;
  created_at: string;
}

interface Reaction {
  id: number;
  post_id: number;
  user_id: number;
  reaction_type: string;
  created_at: string;
}

interface Story {
  id: string;
  user_id: string;
  content_path: string;
  created_at: string;
}

interface PostWithDetails extends Post {
  reactions: Reaction[];
  comments: Comment[];
}

class FeedApiManager {
  private static instance: FeedApiManager;

  private constructor() {}

  public static getInstance(): FeedApiManager {
    if (!FeedApiManager.instance) {
      FeedApiManager.instance = new FeedApiManager();
    }
    return FeedApiManager.instance;
  }

  async uploadFilesAndCreatePost(
    userId: string,
    files: string[],
    caption: string,
    created_at: string
  ): Promise<{ post: Post | null; failedUploads: number }> {
    let failedUploads = 0;
    const uploadedFiles: string[] = [];

    try {
      for (const fileUri of files) {
        try {
          if (!fileUri) {
            console.error("Invalid file URI");
            failedUploads++;
            continue;
          }

          const fileName = fileUri.split("/").pop();
          if (!fileName) {
            console.error("Could not extract file name from URI");
            failedUploads++;
            continue;
          }

          const filePath = `${userId}/${fileName}`;

          // Read the file contents
          const fileContent = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const { error: uploadError } = await supabase.storage
            .from("posts")
            .upload(filePath, fileContent, {
              contentType: this.getContentType(fileName),
            });

          if (uploadError) throw uploadError;

          uploadedFiles.push(filePath);
        } catch (error) {
          console.error("Error uploading file:", error);
          failedUploads++;
        }
      }

      if (uploadedFiles.length > 0) {
        const { data, error: insertError } = await supabase
          .from("posts")
          .insert({
            user_id: userId,
            content_path: uploadedFiles,
            caption: caption,
            created_at: created_at,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        return { post: data as Post, failedUploads };
      } else {
        throw new Error("All file uploads failed");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      return { post: null, failedUploads };
    }
  }
  private getContentType(fileName: string): string {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "mp4":
        return "video/mp4";
      case "mov":
        return "video/quicktime";
      default:
        return "application/octet-stream";
    }
  }

  async getPosts(limit: number = 10, offset: number = 0): Promise<Post[]> {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, user_id, content_paths, caption, created_at") // Make sure 'id' is included
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  async getReactionsForPost(postId: number): Promise<Reaction[]> {
    try {
      const { data, error } = await supabase
        .from("reactions")
        .select("*")
        .eq("post_id", postId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching reactions for post ${postId}:`, error);
      throw error;
    }
  }

  async getPostsWithReactions(
    limit: number = 10,
    offset: number = 0
  ): Promise<(Post & { reactions: Reaction[] })[]> {
    try {
      // First, fetch the posts
      const posts = await this.getPosts(limit, offset);

      // Then, for each post, fetch its reactions
      const postsWithReactions = await Promise.all(
        posts.map(async (post) => {
          // Here, post.id is available because it's a property of each post fetched by getPosts
          const reactions = await this.getReactionsForPost(post.id);
          // Return a new object spreading the post properties and adding the reactions
          return { ...post, reactions };
        })
      );

      return postsWithReactions;
    } catch (error) {
      console.error("Error fetching posts with reactions:", error);
      throw error;
    }
  }

  private generateUniqueFileName(originalName: string): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split(".").pop();
    return `${timestamp}-${randomString}.${extension}`;
  }

  async uploadStoryAndCreateEntry(
    userId: string,
    file: any,
    created_at: string
  ): Promise<{ story: Story | null; failed: boolean; error?: string }> {
    try {
      console.log("Starting story upload process...");
      console.log("File object:", file);

      if (!file || !file.uri) {
        console.error("Invalid file object");
        return { story: null, failed: true, error: "Invalid file object" };
      }

      const originalFileName = file.uri.split("/").pop();
      if (!originalFileName) {
        console.error("Could not extract file name from URI");
        return {
          story: null,
          failed: true,
          error: "Could not extract file name",
        };
      }

      const uniqueFileName = this.generateUniqueFileName(originalFileName);
      const filePath = `${userId}/${uniqueFileName}`;
      console.log("File path for upload:", filePath);

      // Read the file contents
      console.log("Reading file contents...");
      const fileContent = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(
        "File content read successfully. Length:",
        fileContent.length
      );

      console.log("Uploading to Supabase storage...");
      const { error: uploadError } = await supabase.storage
        .from("stories")
        .upload(filePath, fileContent, {
          contentType: file.mimeType || this.getContentType(originalFileName),
        });

      if (uploadError) {
        console.error("Supabase storage upload error:", uploadError);
        throw uploadError;
      }

      // Get the public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from("stories")
        .getPublicUrl(filePath);

      if (!urlData || !urlData.publicUrl) {
        throw new Error("Failed to get public URL for uploaded file");
      }

      const publicUrl = urlData.publicUrl;
      console.log("Public URL for uploaded file:", publicUrl);

      console.log("File uploaded successfully. Creating database entry...");
      const { data, error: insertError } = await supabase
        .from("stories")
        .insert({
          user_id: userId,
          content_path: [publicUrl], // Store the public URL instead of the file path
          created_at: created_at,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Database insert error:", insertError);
        throw insertError;
      }

      console.log("Story created successfully:", data);
      return { story: data as Story, failed: false };
    } catch (error) {
      console.error("Error in uploadStoryAndCreateEntry:", error);
      return {
        story: null,
        failed: true,
        error: error.message || "Unknown error occurred",
      };
    }
  }

  //get stories function
  //you can use the content_path for the image url of image story
  async getTodayStories(
    limit: number = 10,
    offset: number = 0
  ): Promise<Story[]> {
    try {
      // Get today's date at the start of the day (00:00:00)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Get tomorrow's date at the start of the day (00:00:00)
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data, error } = await supabase
        .from("stories")
        .select("id, user_id, content_path, created_at")
        .gte("created_at", today.toISOString())
        .lt("created_at", tomorrow.toISOString())
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching today's stories:", error);
      throw error;
    }
  }
}

export const feedApiManager = FeedApiManager.getInstance();
