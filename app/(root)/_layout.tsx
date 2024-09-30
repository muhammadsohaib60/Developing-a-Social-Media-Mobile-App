import { View, Image, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import { Tabs, router } from "expo-router";
import { home, flag, add, post, profile, nav } from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { splash1 } from "@/constants/images";
import AddPostCard from "@/components/AddPostCard";
import TopNavbar from "@/components/TopNavbar";

const RootLayout = () => {
  const [show, setShow] = useState(false);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <TopNavbar />
      {show && <AddPostCard />}
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: "#FFFFFF",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={home}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "black",
                  }}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            title: "Add",
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={add}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 40,
                    tintColor: "black",
                  }}
                />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="post"
          options={{
            headerShown: false,
            title: "Post",
            tabBarButton: () => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#4B0082",
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  top: -30,
                }}
                onPress={() => {
                  setShow(!show);
                }}
              >
                <View>
                  <Image
                    source={post}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: "white",
                    }}
                  />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="flag"
          options={{
            headerShown: false,
            title: "Flag",
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={flag}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "black",
                  }}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={profile}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "black",
                  }}
                />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="chat"
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="single-chat"
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="addpost"
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="addstory"
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="stories"
          options={{
            headerShown: false,
            unmountOnBlur: true,
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="otherprofile"
          options={{
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="userposts"
          options={{
            headerShown: false,
            tabBarButton: () => null,
            unmountOnBlur: true,
          }}
        />
        <Tabs.Screen
          name="FeedApiManager"
          options={{
            headerShown: false,
            tabBarButton: () => null,
            unmountOnBlur: true,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default RootLayout;
