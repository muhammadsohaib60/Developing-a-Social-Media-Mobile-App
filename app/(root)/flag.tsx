import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import GradientView from "@/components/GradientView";
import { setFlags } from "@/constants/date-setter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = setFlags();

const Flag = () => {
  const [reaction, setReaction] = useState<any[]>([]);

  const getReactions = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      return;
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={item.img} style={styles.image} />
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.msg}>{item.msg}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
      </View>
    );
  };

  return (
    <GradientView>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </GradientView>
  );
};

export default Flag;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  imgContainer: {
    marginRight: 15,
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: "contain",
    borderRadius: 5,
  },
  txtContainer: {
    flex: 1,
  },
  msg: {
    fontSize: 18,
    fontFamily: "ReemBold",
    marginBottom: 5,
  },
  caption: {
    fontSize: 14,
    fontFamily: "ReemRegular",
    color: "#666",
  },
});
