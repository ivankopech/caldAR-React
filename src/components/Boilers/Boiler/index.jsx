import { FaTimes, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './boiler.module.css';

const Boiler = ({ boiler, onDelete, editBoiler }) => {
  const { id, fullName} = boiler;
  return (
    <div className={styles.itemContainer}>
      <div className={styles.item}>
        <FaTimes
          className={styles.btn}
          style={{ cursor: 'pointer' }}
          onClick={() => onDelete(id)}
        />
        <FaEdit
          className={styles.btn}
          style={{ cursor: 'pointer' }}
          onClick={() => editBoiler(boiler)}
        />
      </div>
      <div className={styles.item}>{fullName}</div>
    </div>
  );
};

Boiler.propTypes = {
  boiler: PropTypes.instanceOf(Object).isRequired,
  onDelete: PropTypes.func.isRequired,
  editBoiler: PropTypes.func.isRequired,
};

export default Boiler;