import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal"; // To handle the modal display
import { Picker } from "@react-native-picker/picker";

interface CustomPickerProps {
  selectedValue: string | undefined;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  items: { label: string; value: string }[];
}

const CustomPicker = ({
  selectedValue,
  onValueChange,
  items,
}: CustomPickerProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    undefined
  ); // State to store the selected label

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredItems(items); // Show all items when query is empty
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  // Function to open the modal and reset filteredItems to show all initially
  const openModal = () => {
    setFilteredItems(items); // Reset the filtered items to show all initially
    setSearchQuery(""); // Reset search query
    setModalVisible(true);
  };

  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.selectedValue}>
          {selectedLabel || filteredItems[0]?.label || "Select an option"}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearch}
          />

          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.value}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setSelectedLabel(item.label); // Set the label for display
                  onValueChange(item.value, index); // Pass the value (foreign key)
                  setModalVisible(false); // Close modal on selection
                }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "white",
    width: "70%",
    borderRadius: 50,
    marginBottom: 10,
    overflow: "hidden", // Ensures the picker is contained within the rounded borders
    padding: 12,
  },
  selectedValue: {
    fontFamily: "ReemRegular",
    color: "#969696",
    width: "100%", // Ensures the text takes full width
    overflow: "hidden",
    textAlign: "center", // Center align the selected value
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});

export default CustomPicker;
