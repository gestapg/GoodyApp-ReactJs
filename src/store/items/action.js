import { db } from '../../firebaseconfig';
import {
  doc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import {
  FETCH_ITEM,
  FETCH_ITEMS,
  EDIT_ITEM,
  CREATE_ITEM,
  DELETE_ITEM,
  LOADING_FETCH,
} from './actionType';

export const createItem = payload => {
  return async dispatch => {
    const docRef = await addDoc(collection(db, 'items'), payload);

    dispatch({ type: CREATE_ITEM, payload: docRef.id });
  };
};

export const fetchItems = () => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING_FETCH, payload: true });
      const items = await getDocs(collection(db, 'items'));

      let data = [];
      items.forEach(doc => {
        data.push({ barangId: doc.id, ...doc.data() });
      });

      dispatch({ type: FETCH_ITEMS, payload: data });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: LOADING_FETCH, payload: false });
    }
  };
};

export const fetchItem = id => {
  return async dispatch => {
    const item = await getDoc(doc(db, 'items', id));

    dispatch({ type: FETCH_ITEM, payload: item.data() });
  };
};

export const editItem = (id, payload) => {
  return async dispatch => {
    await updateDoc(doc(db, 'items', id), payload);

    dispatch({ type: EDIT_ITEM });
    dispatch(fetchItems());
  };
};

export const deleteItem = id => {
  return async dispatch => {
    await deleteDoc(doc(db, 'items', id));
    dispatch({ type: DELETE_ITEM });
    dispatch(fetchItems());
  };
};
