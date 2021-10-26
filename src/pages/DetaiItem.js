import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { fetchItem } from '../store/items/action';

const DetailItem = () => {
  const { id } = useParams();
  const { item } = useSelector(state => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItem(id));
  }, [dispatch, id]);

  return (
    <>
      <h1>{item.name}</h1>
      <h1>{item.photo}</h1>
      <h1>{item.hargaJual}</h1>
      <h1>{item.hargaBeli}</h1>
      <h1>{item.stok}</h1>
    </>
  );
};

export default DetailItem;
