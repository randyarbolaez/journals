import {
  CREATE_JOURNAL,
  SET_JOURNALS,
  DELETE_JOURNAL
} from "../actions/journal-actions";
import Journal from "../../models/journal";

const initialState = {
  journals: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_JOURNALS:
      return {
        journals: action.userJournals
      };
      break;
    case CREATE_JOURNAL:
      const newJournal = new Journal(
        action.journalData.id,
        action.journalData.ownerId,
        action.journalData.date,
        action.journalData.title,
        action.journalData.entry
      );
      return {
        ...state,
        journals: state.journals.concat(newJournal)
      };
      break;
    case DELETE_JOURNAL:
      return {
        ...state,
        userProducts: state.journals.filter(
          journal => journal.id !== action.jid
        )
      };
      break;
    default:
      return state;
      break;
  }

  return state;
};
