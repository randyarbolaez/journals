import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Journal = props => {
  return (
    <View style={styles.grid}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={props.onSelect}
        useForeground
      >
        <View style={styles.container}>
          <Text style={styles.title}>{props.title.toUpperCase()}</Text>
          <Text>{props.date}</Text>
          {props.children}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    margin: 15,
    height: 100,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#CCCCCC"
  },
  container: {
    alignItems: "center",
    height: 100,
    paddingVertical: 10,
    backgroundColor: "#F7F0FF",
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 }
  },
  title: {
    color: "#552586"
  }
});

export default Journal;
