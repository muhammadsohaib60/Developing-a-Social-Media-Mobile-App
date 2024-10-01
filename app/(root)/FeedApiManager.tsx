import { setTribes } from "@/constants/date-setter";
import { supabase } from "../../supabaseClient";
import * as FileSystem from "expo-file-system";

export interface Post {
  posts_id: number;
  user_id: string;
  content_path: string[];
  caption: string;
  created_at: string;
  title: string;
  user_details: {
    username: string;
    profile_picture: string;
  };
}

interface Reaction {
  id: number;
  post_id: number;
  user_id: number;
  reaction_type: string;
  created_at: string;
}

export type Story = {
  story_id: string;
  user_id: string;
  content_path: string;
  created_at: string;
  user_details: {
    username: string;
    profile_picture: string;
  };
};

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
    title: string,
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

          // Convert Base64 to Uint8Array
          const uint8Array = new Uint8Array(
            atob(fileContent)
              .split("")
              .map((char) => char.charCodeAt(0))
          );

          const { error: uploadError } = await supabase.storage
            .from("posts")
            .upload(filePath, uint8Array, {
              contentType: this.getContentType(fileName),
            });

          if (uploadError) throw uploadError;

          // Get the public URL for the uploaded file
          const { data: urlData } = supabase.storage
            .from("posts")
            .getPublicUrl(filePath);

          if (!urlData || !urlData.publicUrl) {
            throw new Error("Failed to get public URL for uploaded file");
          }

          uploadedFiles.push(urlData.publicUrl);
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
            title: title,
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
        .select(
          `
          posts_id, 
          user_id, 
          content_path, 
          caption, 
          created_at,
          user_details(username, profile_pictures)
        `
        ) // Fetch profile_pictures without array indexing
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      // Transform the data to extract the first profile picture manually
      const posts: Post[] = data.map((post: any) => ({
        posts_id: post.posts_id,
        user_id: post.user_id,
        content_path: post.content_path,
        caption: post.caption,
        created_at: post.created_at,
        user_details: {
          username: post.user_details?.username || "",
          profile_picture: post.user_details?.profile_pictures?.[0] || null, // Extract the first picture or null
        },
      }));

      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  async fetchReactionOnPost(postId: number, userId: string) {
    try {
      const { data, error } = await supabase
        .from("reactions")
        .select("*")
        .eq("post_id", postId)
        .eq("user_id", userId)
        .maybeSingle(); // Use maybeSingle to avoid throwing an error when no reaction exists

      if (error) throw error;

      // If no reaction exists, return a neutral reaction
      if (!data) {
        return {
          post_id: postId,
          user_id: userId,
          reaction_type: "neutral", // default to neutral if no reaction is found
        };
      }

      return data; // return the existing reaction data if found
    } catch (error) {
      console.error("Error fetching reaction on post:", error);
      throw error;
    }
  }

  async postComment(postId: number, userId: string, content: string) {
    try {
      const { data, error } = await supabase.from("comments").insert([
        {
          post_id: postId,
          user_id: userId,
          content: content,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  }
  async reactOnPost(postId: number, userId: string, reactionType: string) {
    try {
      // Check if reaction for this post and user exists
      const { data: existingReaction, error: existingReactionError } =
        await supabase
          .from("reactions")
          .select("*")
          .eq("post_id", postId)
          .eq("user_id", userId)
          .maybeSingle(); // Use maybeSingle to avoid throwing an error if the record doesn't exist

      if (existingReactionError) throw existingReactionError;

      if (existingReaction) {
        // Update existing reaction
        const { data: updatedReaction, error: updateError } = await supabase
          .from("reactions")
          .update({ reaction_type: reactionType })
          .eq("reaction_id", existingReaction.reaction_id)
          .single(); // single here because you are updating a specific reaction

        if (updateError) throw updateError;

        return updatedReaction;
      } else {
        // Add new reaction
        const { data: newReaction, error: insertError } = await supabase
          .from("reactions")
          .insert([
            {
              post_id: postId,
              user_id: userId,
              reaction_type: reactionType,
              created_at: new Date().toISOString(),
            },
          ])
          .single(); // single here because you are inserting a single reaction

        if (insertError) throw insertError;

        return newReaction;
      }
    } catch (error) {
      console.error("Error reacting on post:", error);
      throw error;
    }
  }

  async getCommentsForPost(postId: number) {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(
          `
          id,
          user_id,
          content,
          user_details(username, profile_pictures)
          `
        )
        .order("created_at", { ascending: false })
        .eq("post_id", postId);

      const comments = data?.map((comment: any) => ({
        id: comment.id,
        user_id: comment.user_id,
        content: comment.content,
        user_details: {
          username: comment.user_details?.username || "",
          profile_picture: comment.user_details?.profile_pictures?.[0] || null,
        },
      }));

      if (error) throw error;
      return comments;
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
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
          const reactions = await this.getReactionsForPost(post.posts_id);
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

      // Convert Base64 to Uint8Array
      const uint8Array = new Uint8Array(
        atob(fileContent)
          .split("")
          .map((char) => char.charCodeAt(0))
      );

      console.log("Uploading to Supabase storage...");
      const { error: uploadError } = await supabase.storage
        .from("stories")
        .upload(filePath, uint8Array, {
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

      // Fetch stories along with the user details (username and profile_pictures)
      const { data, error } = await supabase
        .from("stories")
        .select(
          `
          story_id, 
          user_id, 
          content_path, 
          created_at, 
          user_details(username, profile_pictures)
        `
        )
        .gte("created_at", today.toISOString())
        .lt("created_at", tomorrow.toISOString())
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      // Map over the data to structure the user details correctly
      const stories: Story[] = data.map((story: any) => ({
        story_id: story.story_id,
        user_id: story.user_id,
        content_path: story.content_path,
        created_at: story.created_at,
        user_details: {
          username: story.user_details?.username || "",
          profile_picture: story.user_details?.profile_pictures?.[0] || null,
        },
      }));

      return stories;
    } catch (error) {
      console.error("Error fetching today's stories:", error);
      throw error;
    }
  }

  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from("user_details")
        .select(
          `
          username,
          user_id,
          full_name,
          email,
          phone_number,
          profile_pictures
          `
        )
        .eq("user_id", userId)
        .single();

      if (error) throw error;

      const user = {
        user_name: data?.username || "",
        user_id: data?.user_id || "",
        full_name: data?.full_name || "",
        email: data?.email || "",
        phone_number: data?.phone_number || "",
        profile_picture: data?.profile_pictures?.[0] || null,
      };

      console.log(user);

      return user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async getUserPosts(userId: string) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          posts_id,
           content_path
          `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const posts = data.map((post: any) => ({
        content_path: post.content_path[0],
        id: post.posts_id,
      }));

      return posts;
    } catch (error) {
      console.error("Error fetching user posts:", error);
      throw error;
    }
  }

  async getUserReactions(userId: string) {
    //get like or dislike , the name of the post owner and url of the post and caption

    try {
      const { data, error } = await supabase
        .from("reactions")
        .select(
          `
          reaction_id,
          post_id,
          reaction_type,
          post_details:posts(posts_id, user_id, content_path, caption, created_at, user_details(username))
          `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .neq("reaction_type", "neutral");
      if (error) throw error;

      const reactions = data.map((reaction: any) => ({
        reaction_id: reaction.reaction_id,
        post_id: reaction.post_id,
        reaction_type: reaction.reaction_type,
        post_details: {
          posts_id: reaction.post_details.posts_id,
          user_id: reaction.post_details.user_id,
          content_path: reaction.post_details.content_path[0],
          caption: reaction.post_details.caption,
          created_at: reaction.post_details.created_at,
          user_details: {
            username: reaction.post_details.user_details.username,
          },
        },
      }));

      return reactions;
    } catch (error) {
      console.error("Error fetching user reactions:", error);
      throw error;
    }
  }

  async getUsers() {
    try {
      // Step 1: Fetch users with state ID
      const { data: usersData, error: usersError } = await supabase.from(
        "user_details"
      ).select(`
          user_id,
          username,
          profile_pictures,
          state,
          country
        `);

      if (usersError) throw usersError;

      // Step 2: Loop through each user and fetch their state name by matching the state ID
      const users = await Promise.all(
        usersData.map(async (user: any) => {
          // Fetch the state name for each user based on their state ID
          const { data: stateData, error: stateError } = await supabase
            .from("reg_state")
            .select("state_name")
            .eq("state_id", user.state)
            .single(); // Use .single() because we expect only one match

          if (stateError) {
            console.error(
              `Error fetching state for user ${user.user_id}:`,
              stateError
            );
            return null; // Handle error (you can choose to continue or throw here)
          }

          // Step 3: Return the formatted user data
          return {
            id: user.user_id,
            title: user.username,
            img: user.profile_pictures ? user.profile_pictures[0] : null,
            details: `${stateData?.state_name || "Unknown"}, ${user.country}`,
          };
        })
      );

      // Filter out any null results in case of errors
      return users.filter((user) => user !== null);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async getTribes() {
    const res = setTribes();
    return res;
  }
}

export const feedApiManager = FeedApiManager.getInstance();
