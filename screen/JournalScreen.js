import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Platform,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import {
  HeaderButtons,
  HeaderButton,
  Item
} from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import Journal from "../components/Journal";
import * as journalActions from "../store/actions/journal-actions";
import * as authActions from "../store/actions/auth-actions";
import Colors from "../constants/Colors";

const JournalScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const journals = useSelector(state => state.journal.journals);
  const dispatch = useDispatch();

  const loadJournals = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(journalActions.fetchJournals());
    } catch (err) {
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("SingleJournal", {
      journalId: id,
      journalTitle: title
    });
  };

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadJournals
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadJournals]);

  useEffect(() => {
    setIsLoading(true);
    props.navigation.setParams({
      logout: () => {
        dispatch(authActions.logout());
      }
    });
    dispatch(journalActions.fetchJournals()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>;
  }

  const deleteHandler = id => {
    Alert.alert("Are you Sure?", "Do you really want to delete this item?", [
      {
        text: "No",
        style: "default"
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(journalActions.deleteJournal(id));
          loadJournals();
        }
      }
    ]);
  };

  if (journals.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Start writing some journal entries!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadJournals}
      refreshing={isRefreshing}
      data={journals}
      keyExtractor={item => item.id}
      numColumns={2}
      renderItem={itemData => (
        <Journal
          {...itemData.item}
          date={itemData.item.readableDate}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primaryColor}
            title="Delete Journal"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </Journal>
      )}
    />
  );
};

JournalScreen.navigationOptions = navData => {
  const logoutFn = navData.navigation.getParam("logout");
  return {
    headerTitle: "All Journals",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Journal"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("AddJournal");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Journal"
          iconName={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
          onPress={logoutFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});

export default JournalScreen;
