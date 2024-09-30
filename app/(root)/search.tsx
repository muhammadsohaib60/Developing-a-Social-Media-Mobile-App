import { StyleSheet } from "react-native";
import React, { useState } from "react";
import GradientView from "@/components/GradientView";
import SearchBar from "@/components/SearchBar";
import TabNavigation from "@/components/TabNavigation";
import UserList from "@/components/SearchUserList";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("Accounts");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };
  return (
    <GradientView>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
      <TabNavigation selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      <UserList tab={selectedTab} query={searchQuery} />
    </GradientView>
  );
};

export default Search;

const styles = StyleSheet.create({});
