import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import Input from "../components/Input";
import * as journalsActions from "../store/actions/journal-actions";
import Colors from "../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AddJournalScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      entry: ""
    },
    inputValidities: {
      title: false,
      entry: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Check the errors in the form.", {
        text: "okay"
      });
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        journalsActions.createJournal(
          formState.inputValues.title,
          formState.inputValues.entry
        )
      );
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ justifyContent: "center" }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            style={styles.input}
            id="title"
            label="Title"
            placeholder="Enter title"
            errorText="Enter a valid title."
            onInputChange={inputChangeHandler}
            initialValue={""}
            required
          />
          <Input
            id="entry"
            label="Entry"
            placeholder="How was your day?"
            errorText="Write your daily entry."
            onInputChange={inputChangeHandler}
            initialValue={""}
            required
            multiline
            numberOfLines={10}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AddJournalScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Add Journal",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          color={Platform.OS === "android" ? "white" : Colors.primaryColor}
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
    flex: 1,
    backgroundColor: "#DDD6F3",
    borderRadius: 10,
    shadowRadius: 8,
    shadowColor: "#CCCCCC",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 }
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AddJournalScreen;
