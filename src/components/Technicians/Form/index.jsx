import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';

const TechnicianForm = ({
  onAdd,
  updateTechnician,
  currentTechnician,
  setUpdate,
  setCurrentTechnician,
  getTechnician,
}) => {
  const history = useHistory();
  const { action, technicianId } = useParams();
  const [fullName, setName] = useState('');
  const [DNI, setDNI] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // const options = [
  //   { value: '', label: '' },
  //   { value: 'particular', label: 'Particular' },
  //   { value: 'construction company', label: 'Construction company' },
  // ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentTechnician) {
      updateTechnician({
        fullName,
        DNI,
        phone,
        address,
        id: currentTechnician.id,
      });
    } else {
      onAdd({ fullName, DNI, phone, address });
    }

    setName('');
    setDNI('');
    setPhone('');
    setAddress('');
  };

  const handleReset = () => {
    if (currentTechnician) {
      setUpdate(false);
    }
    history.push('/technicians');
    setName('');
    setDNI('');
    setPhone('');
    setAddress('');
  };

  useEffect(() => {
    if (currentTechnician) {
      setName(currentTechnician.fullName);
      setDNI(currentTechnician.DNI);
      setPhone(currentTechnician.phone);
      setAddress(currentTechnician.address);
    } else if (action === 'update') {
      const TechnicianToBeUpdated = getTechnician(technicianId);
      if (TechnicianToBeUpdated) {
        setUpdate(true);
        history.push(`/technician/update/${TechnicianToBeUpdated.id}`);
        setCurrentTechnician({
          id: TechnicianToBeUpdated.id,
          fullName: TechnicianToBeUpdated.fullName,
          DNI: TechnicianToBeUpdated.DNI,
          phone: TechnicianToBeUpdated.phone,
          address: TechnicianToBeUpdated.address,
        });
      } else {
        history.replace('/technicians');
      }
    } else {
      handleReset();
    }
  }, [currentTechnician]);

  return (
    <div>
      <h3 className={styles.subtitle}>
        {currentTechnician ? 'Update Technician' : 'Add Technician'}
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
          <div>
            <label htmlFor="DNI">
              DNI:
              <input
                type="text"
                placeholder="Add DNI"
                value={DNI}
                onChange={(e) => setDNI(e.target.value)}
                maxLength="8"
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="phone">
              Phone:
              <input
                type="text"
                placeholder="Add Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="address">
              Address:
              <input
                type="text"
                placeholder="Add Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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

export default TechnicianForm;
