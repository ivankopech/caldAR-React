import { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import { getTechnicians as getTechnicianAction, getTechnicians } from '../../../Redux/Actions/technicianActions';

const TechnicianForm = ({
  onAdd,
  updateTechnician,
  currentTechnician,
  setUpdate,
  setCurrentTechnician,
  getTechnician,
}) => {
  const constructions = useSelector((state) => state.constructions.list);
  const history = useHistory();
  const { action, technicianId } = useParams();
  const [fullName, setName] = useState('');
  const [DNI, setDNI] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type.length === 0) {
      return;
    }
    
    if (technician && action === 'update') {
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
    if (action !== 'delete' || !technician){
      history.push('/technicians');
    }
    setName('');
    setDNI('');
    setPhone('');
    setAddress('');
  };

  useEffect(() => {
    if (action === 'update') {
      getTechnicians(technicianId);
    } else {
      handleReset();
    }
  }, [currentTechnician]);

  useEffect(() => {
    if (technician && action === 'update'){
      setUpdate(true);
      setName(currentTechnician.fullName);
      setDNI(currentTechnician.DNI);
      setPhone(currentTechnician.phone);
      setAddress(currentTechnician.address);
    } else {
      handleReset();
    }


  }, [technician]);
      

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
                value={fullName || ''}
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
                value={DNI || ''}
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
                value={phone || ''}
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
                value={address || ''}
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getTechnician: getTechnicianAction,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  technician: state.technicians.technician,
});

export default connect(mapStateToProps, mapDispatchToProps)(TechnicianForm);

