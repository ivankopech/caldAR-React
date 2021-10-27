import { FaTimes, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './technician.module.css';

const Technician = ({ technician, onDelete, editTechnician }) => {
  const { id, fullName, DNI, phone, address } = technician;
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
          onClick={() => editTechnician(technician)}
        />
      </div>
      <div className={styles.item}>{fullName}</div>
      <div className={styles.item}>{DNI}</div>
      <div className={styles.item}>{phone}</div>
      <div className={styles.item}>{address}</div>
    </div>
  );
};

Technician.propTypes = {
  technician: PropTypes.instanceOf(Object).isRequired,
  onDelete: PropTypes.func.isRequired,
  editTechnician: PropTypes.func.isRequired,
};

export default Technician;
