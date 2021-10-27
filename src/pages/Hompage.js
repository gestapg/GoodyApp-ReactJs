import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../Components/UI/LoadingSpinner';

import Card from '../Components/Card';
import { fetchItems } from '../store/items/action';

const HomePage = () => {
  const { items, isLoading } = useSelector(state => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="centered">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="container mx-auto text-center mt-10 mb-10 ">
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 ml-10 mr-10">
            {items.map(item => {
              return <Card item={item} key={item.barangId} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
