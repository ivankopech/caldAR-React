import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import technicianData from '../../data/technician.json';
import Modal from '../Shared/Modal';
import TechnicianList from './List';
import TechnicianForm from './Form';
import styles from './technicians.module.css';
import Technician from './Technician';
import {
  getTechnician as getTechnicianAction,
  addTechnician as addTechnicianAction,
  updateTechnician as updateTechnicianAction,
  deleteTechnician as deleteTechnicianAction,
} from '../../Redux/Actions/technicianActions';

const Technicians = ({
  technicians,
  getTechnician,
  addTechnician,
  updateTechnician,
  deleteTechnician
}) => {
  const history = useHistory();
  const {action, buildingId} = useParams();
  const [update, setUpdate] = useState(false);
  const [currentTechnician, setCurrentTechnician] = useState({
    _id: null,
    fullName: '',
    DNI: '',
    phone: '', 
    address: '',
  }),

  const editTechnician = (technician) => {
    setUpdate(true);
    const id = technician._id;
    history.push(`/technicians/update/${id}`);
    setCurrentTechnician({
      _id: technician._id,
      fullName: technician.fullName,
      DNI: technician.DNI,
      phone: technician.phone,
      address: technician.address,
    });
};

const updateATechnician = (technician) => {
  setUpdate(false);
  updateTechnician(technician, technicianId);
  history.push('/technicians');
};

const handleCancel = () => {
  setUpdate(false);
  history.push('/technicians');
};

const deleteATechnician = (technician) => {
  deleteTechnician(technician);
  history.replace('/technicians');
};


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Technicians</h2>
      {update ? (
        <div>
          <TechnicianForm
            currentTechnician={currentTechnician}
            setUpdate={setUpdate}
            updateATechnician={updateATechnician}
          />
        </div>
      ) : (
        <div>
          <TechnicianForm
            onAdd={addTechnician}
            setUpdate={setUpdate}
          />
        </div>
      )}
      {technicians.isLoading ? <h3>Loading</h3> : null}
      <TechnicianList
        technicians={technicians}
        onDelete={(id) =>
        getTechnician(id) && history.replace(`/technicians/delete/${id}`)
      }
        editTechnician={editTechnician}
      />
      {action === 'delete' && (
        <Modal
          onSubmit={() => deleteATechnician(technicianId)}
          onClose={() => handleCancel()}
          item="technician"
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getTechnician: getTechnicianAction,
      addTechnician: addTechnicianAction,
      updateTechnician: updateTechnicianAction,
      deleteTechnician: deleteTechnicianAction,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  buildings: state.buildings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Technicians);

