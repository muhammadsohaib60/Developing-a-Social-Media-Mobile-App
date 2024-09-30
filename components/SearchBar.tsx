import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ value, onChangeText, onSearch }: SearchBarProps) => {
  return (
    <View
      style={{
        margin: 20,
      }}
    >
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#000" />
        <TextInput
          style={styles.searchInput}
          placeholder="Yoruba"
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={onSearch}>
          <MaterialIcons name="send" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 1)",
    gap: 10,
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "ReemRegular",
    color: "rgba(113, 113, 113, 1)",
    fontSize: 17,
  },
});

export default SearchBar;
