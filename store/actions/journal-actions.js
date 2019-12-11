import Journal from "../../models/journal";
import ENV from "../../env";

export const CREATE_JOURNAL = "CREATE_JOURNAL";
export const SET_JOURNALS = "SET_JOURNALS";
export const DELETE_JOURNAL = "DELETE_JOURNAL";

export const fetchJournals = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const res = await fetch(`${ENV.fireBaseUrl}.json`);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await res.json();
      const loadedJournals = [];

      for (const key in resData) {
        loadedJournals.push(
          new Journal(
            key,
            resData[key].ownerId,
            new Date(resData[key].date),
            resData[key].title,
            resData[key].entry
          )
        );
      }

      dispatch({
        type: SET_JOURNALS,
        userJournals: loadedJournals.filter(
          journal => journal.ownerId === userId
        )
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createJournal = (title, entry) => {
  return async (dispatch, getState) => {
    // execute any async code you want
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const date = new Date();

    const res = await fetch(`${ENV.fireBaseUrl}.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        entry,
        date: date.toISOString(),
        ownerId: userId
      })
    });

    const resData = await res.json();

    dispatch({
      type: CREATE_JOURNAL,
      journalData: {
        id: resData.name,
        title,
        entry,
        date,
        ownerId: userId
      }
    });
  };
};

export const deleteJournal = journalId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const res = await fetch(
      `${ENV.fireBaseUrl}/${journalId}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({ type: DELETE_JOURNAL, jid: journalId });
  };
};
