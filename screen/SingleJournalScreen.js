import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";

const SingleJournalScreen = props => {
  const journalId = props.navigation.getParam("journalId");
  const journal = useSelector(state =>
    state.journal.journals.find(journal => journal.id === journalId)
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{journal.title}</Text>
      <View style={styles.gradient}>
        <ScrollView>
          <Text style={styles.entry}>{journal.entry}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

SingleJournalScreen.navigationOptions = navData => {
  const journalTitle = navData.navigation.getParam("journalTitle");
  return {
    headerTitle: journalTitle.toUpperCase()
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 20,
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    color: Colors.primaryColor
  },
  gradient: {
    paddingVertical: 10,
    marginVertical: 20,
    marginHorizontal: 1000,
    marginBottom: 50,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    backgroundColor: "#F7F0FF",
    borderRadius: 10,
    shadowRadius: 8,
    shadowColor: "#CCCCCC",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 }
  },
  entry: {
    color: "#808080"
  }
});

export default SingleJournalScreen;
