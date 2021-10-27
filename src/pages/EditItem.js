import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { storage } from '../firebaseconfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../assets/background-edit.jpg';

import { editItem, fetchItem } from '../store/items/action';

const EditItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { item } = useSelector(state => state.items);

  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [hargaJual, setHargaJual] = useState('');
  const [hargaBeli, setHargaBeli] = useState('');
  const [stok, setStok] = useState('');

  const [imageUpload, setImageUpload] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchItem(id));
  }, [dispatch, id]);

  useEffect(() => {
    setName(item?.name);
    setPhoto(item?.photo);
    setHargaJual(item?.hargaJual);
    setHargaBeli(item?.hargaBeli);
    setStok(item?.stok);
  }, [item]);

  const forName = e => {
    e.preventDefault();
    setName(e.target.value);
  };
  const forPhoto = async e => {
    const dataPhoto = e.target.files[0];

    if (!dataPhoto) {
      return toast.error('Please upload the file!');
    } else if (
      dataPhoto.name.split('.')[1] !== 'jpg' &&
      dataPhoto.name.split('.')[1] !== 'png'
    ) {
      setBtnDisabled(true);
      return toast.error('File type must be JPG or PNG');
    } else if (dataPhoto.size > 100000) {
      setBtnDisabled(true);
      return toast.error('Size should be under 100KB');
    } else {
      try {
        setBtnDisabled(false);
        setImageUpload(true);
        const storageRef = ref(storage, dataPhoto.name);
        await uploadBytes(storageRef, dataPhoto);
        const url = await getDownloadURL(storageRef);
        setPhoto(url);
      } catch (err) {
        console.log(err);
      } finally {
        setImageUpload(false);
      }
    }
  };
  const forHargaBeli = e => {
    e.preventDefault();
    setHargaBeli(e.target.value);
  };
  const forHargaJual = e => {
    e.preventDefault();
    setHargaJual(e.target.value);
  };
  const forStok = e => {
    e.preventDefault();
    setStok(e.target.value);
  };

  const handleToHome = e => {
    e.preventDefault();
    history.push('/home');
  };

  const handleEditItem = e => {
    e.preventDefault();
    setIsLoadingEdit(true);
    const payload = {
      name,
      photo,
      hargaBeli,
      hargaJual,
      stok,
    };

    if (
      payload.name === '' ||
      payload.photo === '' ||
      payload.hargaBeli === '' ||
      payload.hargaJual === '' ||
      payload.stok === ''
    ) {
      return toast.error('Please fill all the field!');
    } else if (payload.hargaBeli < 0 || payload.hargaJual < 0) {
      return toast.error('Price cant be less than zero');
    } else {
      dispatch(editItem(id, payload));
      setIsLoadingEdit(false);
      history.push('/home');
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        className="hero min-h-screen bg-base-200 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <div className="m-10">
            <div className="justify-between grid grid-cols-2 ml-2 mr-2">
              <div>
                <h2
                  className="mb-5 text-3xl font-bold"
                  style={{ color: 'white' }}
                >
                  Edit an Item
                </h2>
              </div>
              <div className="text-right">
                <button
                  className="btn btn-square btn-ghost mt-2"
                  onClick={handleToHome}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              className="card shadow-2xl"
              style={{
                backgroundColor: '#2a475e',
                borderWidth: 1,
                borderColor: '#66c0f4',
              }}
            >
              <div className="m-8 ">
                <form action="" type="submit" onSubmit={handleEditItem}>
                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text" style={{ color: '#c7d5e0' }}>
                        Name
                      </span>
                    </label>
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      onChange={forName}
                      value={name}
                    />
                  </div>

                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text" style={{ color: '#c7d5e0' }}>
                        Photo
                      </span>
                    </label>
                    <input
                      style={{ color: 'white' }}
                      type="file"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      onChange={forPhoto}
                    />
                  </div>

                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text" style={{ color: '#c7d5e0' }}>
                        Harga Jual
                      </span>
                    </label>
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      onChange={forHargaJual}
                      value={hargaJual}
                      type="number"
                    />
                  </div>

                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text" style={{ color: '#c7d5e0' }}>
                        Harga Beli
                      </span>
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      onChange={forHargaBeli}
                      value={hargaBeli}
                    />
                  </div>

                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text" style={{ color: '#c7d5e0' }}>
                        Stok
                      </span>
                    </label>
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      onChange={forStok}
                      value={stok}
                      type="number"
                    />
                  </div>

                  <div className="mt-6 mb-3 text-center">
                    <button
                      type="submit"
                      className={`btn btn-primary ${
                        imageUpload && isLoadingEdit ? 'loading' : ''
                      }`}
                      disabled={btnDisabled ? 'disable' : ''}
                    >
                      Edit an Item!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditItem;
