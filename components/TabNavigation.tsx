import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface TabNavigationProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const tabs = ["Accounts", "Tribes", "Posts", "Tags"];

const TabNavigation = ({ selectedTab, onSelectTab }: TabNavigationProps) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onSelectTab(tab)}
          style={[styles.tab, selectedTab === tab && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab && styles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 17,
    color: "#000",
    fontFamily: "ReemRegular",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  activeTabText: {
    fontFamily: "ReemBold",
  },
});

export default TabNavigation;
