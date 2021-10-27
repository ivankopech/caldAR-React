import PropTypes from 'prop-types';
import Technician from '../Technician';
import styles from './list.module.css';

const TechnicianList = ({ technicians, onDelete, editTechnician }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.technicianContainer}>
          <h3 className={styles.item}>Action</h3>
          <h3 className={styles.item}>Full Name</h3>
          <h3 className={styles.item}>DNI</h3>
          <h3 className={styles.item}>Phone</h3>
          <h3 className={styles.item}>Address</h3>
        </div>
        {technicians.map((currentTechnician) => (
          <Technician
            key={currentTechnician.id}
            technician={currentTechnician}
            onDelete={onDelete}
            editTechnician={editTechnician}
          />
        ))}
      </div>
    </>
  );
};

TechnicianList.propTypes = {
  technicians: PropTypes.instanceOf(Array).isRequired,
  onDelete: PropTypes.func.isRequired,
  editTechnician: PropTypes.func.isRequired,
};

export default TechnicianList;
