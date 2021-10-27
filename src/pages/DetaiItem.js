import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchItem } from '../store/items/action';

import TableItem from '../Components/Item/TableItem';

const DetailItem = () => {
  const { id } = useParams();
  const { item } = useSelector(state => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItem(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="container mx-auto px-20">
        <div
          className="card bordered"
          style={{
            marginTop: '10%',
            marginBottom: '10%',
            backgroundColor: 'white',
            color: 'black',
          }}
        >
          <figure
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url(${item.photo})`,
              width: '80vw',
              height: '70vh',
            }}
          ></figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <div className="rounded">
              <TableItem item={item} />
            </div>
            <div className="justify-end card-actions">
              <Link to={'/home'} className="btn btn-primary">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailItem;
