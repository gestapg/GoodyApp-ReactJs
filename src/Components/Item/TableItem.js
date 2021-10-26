import React from 'react';
import classes from './TableItem.module.css';

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

const TableItem = ({ item }) => {
  return (
    <ul>
      <li className={classes.item}>
        <div>
          <h3>Harga Jual</h3>
        </div>
        <div className={classes.content}>
          <h3>{formatter.format(item.hargaJual)}</h3>
        </div>
      </li>
      <li className={classes.item}>
        <div>Harga Beli</div>
        <div className={classes.content}>
          <h3>{formatter.format(item.hargaBeli)}</h3>
        </div>
      </li>
      <li className={classes.item}>
        <div>Stock</div>
        <div className={classes.content}>
          <h3>{item.stok}</h3>
        </div>
      </li>
    </ul>
  );
};

export default TableItem;
