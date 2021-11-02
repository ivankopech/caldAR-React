import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';

const BoilerForm = ({
  onAdd,
  updateBoiler,
  currentBoiler,
  setUpdate,
  setCurrentBoiler,
  getBoiler,
}) => {
  const history = useHistory();
  const { action, boilerId } = useParams();
  const [fullName, setName] = useState('');
  // const options = [
  //   { value: '', label: '' },
  //   { value: 'particular', label: 'Particular' },
  //   { value: 'construction company', label: 'Construction company' },
  // ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentBoiler) {
      updateBoiler({
        fullName,
        id: currentBoiler.id,
      });
    } else {
      onAdd({ fullName});
    }

    setName('');
  };

  const handleReset = () => {
    if (currentBoiler) {
      setUpdate(false);
    }
    history.push('/boilers');
    setName('');
  };

  useEffect(() => {
    if (currentBoiler) {
      setName(currentBoiler.fullName);
    } else if (action === 'update') {
      const BoilerToBeUpdated = getBoiler(boilerId);
      if (BoilerToBeUpdated) {
        setUpdate(true);
        history.push(`/boiler/update/${BoilerToBeUpdated.id}`);
        setCurrentBoiler({
          id: BoilerToBeUpdated.id,
          fullName: BoilerToBeUpdated.fullName,
        });
      } else {
        history.replace('/boilers');
      }
    } else {
      handleReset();
    }
  }, [currentBoiler]);

  return (
    <div>
      <h3 className={styles.subtitle}>
        {currentBoiler ? 'Update Boiler' : 'Add Boiler'}
      </h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldsContainer}>
          <div>
            <label htmlFor="fullName">
              {' '}
              Name:
              <input
                type="text"
                placeholder="Add full name"
                value={fullName}
                onChange={(e) => setName(e.target.value)}
                maxLength="20"
                required
              />
            </label>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <input type="submit" value="Send" className={styles.sendForm} />
          <button
            type="button"
            className={styles.btnForm}
            onClick={handleReset}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoilerForm;