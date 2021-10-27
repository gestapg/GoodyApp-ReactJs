import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../store/items/action';
import swal from 'sweetalert';

import TableItem from './Item/TableItem';

function Card({ item }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDetail = () => {
    history.push(`/detail/${item.barangId}`);
  };

  const handleEdit = () => {
    history.push(`/edit-item/${item.barangId}`);
  };

  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          dispatch(deleteItem(item.barangId));
          swal('Poof! Your data has been deleted!', {
            icon: 'success',
          });
        } else {
          swal('Your data is safe!', {
            icon: 'info',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className="card bordered bg-primary drop-shadow-xl transition duration-500 ease-in-out transform hover:scale-110"
        // style={{ backgroundColor: 'white' }}
      >
        <figure
          className="bg-cover bg-center h-60"
          style={{ backgroundImage: `url(${item.photo})` }}
        >
          <div style={{ height: '100%' }}></div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.name}</h2>
          <div className="rounded">
            <TableItem item={item} />
          </div>
          <div className="justify-end card-actions">
            <button
              className="btn btn-primary rounded-full transition duration-300 ease-in-out transform hover:-translate-y-2"
              onClick={handleDetail}
              style={{ width: '80px' }}
            >
              Detail
            </button>
            <button
              className="btn btn-primary rounded-full  transition duration-300 ease-in-out transform hover:-translate-y-2"
              onClick={handleEdit}
              style={{ width: '80px' }}
            >
              Edit
            </button>

            <button
              className="btn btn-secondary rounded-full transition duration-300 ease-in-out transform hover:-translate-y-2"
              onClick={handleDelete}
              style={{ width: '80px' }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
