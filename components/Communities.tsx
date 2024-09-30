import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { setCommunities } from "@/constants/date-setter";

const communityData = setCommunities();

const Communities = () => {
  const handleCommunityPress = (community: any) => {
    console.log(`Navigating to community: ${community.name}`);
  };

  return (
    <View style={styles.container}>
      {communityData.map((community, index) => (
        <TouchableOpacity
          key={index}
          style={styles.communityContainer}
          onPress={() => handleCommunityPress(community)}
        >
          <ImageBackground
            source={community.imageUrl}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.communityName}>{community.name}</Text>
            <View>
              <Text style={styles.communityDetails}>
                Members: {community.members}
              </Text>
              <Text style={styles.communityDetails}>
                Posts: {community.posts}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Communities;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  communityContainer: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  imageBackground: {
    overflow: "hidden",
    justifyContent: "space-between",
    height: 120,
  },
  imageStyle: {},
  communityName: {
    fontSize: 12,
    fontFamily: "ReemRegular",
    color: "#fff",
    padding: 5,
  },
  communityDetails: {
    fontSize: 12,
    color: "#fff",
    paddingHorizontal: 5,
    paddingBottom: 2,
  },
});
