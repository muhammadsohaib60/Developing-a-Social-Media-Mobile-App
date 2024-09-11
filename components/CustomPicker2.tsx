import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface CustomPickerProps {
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  items: { label: string; value: string }[];
}

const CustomPicker = ({
  selectedValue,
  onValueChange,
  items,
}: CustomPickerProps) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={onValueChange}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "white",
    width: "45%",
    borderRadius: 50,
    marginBottom: 10,
    overflow: "hidden", // Ensures the picker is contained within the rounded borders
  },
  picker: {
    width: "100%",
    color: "#969696",
    fontFamily: "ReemRegular",
    paddingHorizontal: 20,
  },
});

export default CustomPicker;
