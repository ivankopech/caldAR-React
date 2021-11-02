import PropTypes from 'prop-types';
import Boiler from '../Boiler';
import styles from './list.module.css';

const BoilerList = ({ boilers, onDelete, editBoiler }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.boilerContainer}>
          <h3 className={styles.item}>Action</h3>
          <h3 className={styles.item}>Full Name</h3>
        </div>
        {boilers.map((currentBoiler) => (
          <Boiler
            key={currentBoiler.id}
            boiler={currentBoiler}
            onDelete={onDelete}
            editBoiler={editBoiler}
          />
        ))}
      </div>
    </>
  );
};

BoilerList.propTypes = {
  boilers: PropTypes.instanceOf(Array).isRequired,
  onDelete: PropTypes.func.isRequired,
  editBoiler: PropTypes.func.isRequired,
};

export default BoilerList;