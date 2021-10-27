import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import technicianData from '../../data/technician.json';
import TechnicianList from './List';
import TechnicianForm from './Form';
import styles from './technicians.module.css';
import Technician from './Technician';

function Technicians() {
  const history = useHistory();
  const [technicians, setTechnicians] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentTechnician, setCurrentTechnician] = useState({
    id: null,
    fullName: '',
    DNI: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const getTechnicians = () => {
        setTechnicians(technicianData);
    };

    getTechnicians();
  }, []);

  const getTechnician = (id) => {
    return technicianData.find((b) => b.id === id);
  };

  const randomId = (array) => {
    let actualPosition = array.length;
    while (actualPosition !== 0) {
      const randomPosition = Math.floor(Math.random() * actualPosition);
      actualPosition -= 1;
      [array[actualPosition], array[randomPosition]] = [
        array[randomPosition],
        array[actualPosition],
      ];
    }
    return array;
  };

  const generateRandom = (amount) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
        ''
      );
    randomId(characters);
    return characters.slice(0, amount).join('');
  };

  const addTechnician = (technician) => {
    technician.id = generateRandom(24);
    setTechnicians([...technicians, technician]);
  };

  const editTechnician = (technician) => {
    setUpdate(true);
    history.push(`/technicians/update/${technician.id}`);
    setCurrentTechnician({
      id: technician.id,
      fullName: technician.fullName,
      DNI: technician.DNI,
      phone: technician.phone,
      address: technician.address,
    });
  };

  const updateTechnician = (technician) => {
    setUpdate(false);
    const updatedTechnicians = technician.map((x) =>
      x.id === technician.id ? technician : x
    );
    setTechnicians(updatedTechnicians);
    history.push('/technicians');
  };

  const deleteTechnician = (id) => {
    setUpdate(false);
    setTechnicians(technicians.filter((technician) => technician.id !== id));
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
            updateTechnician={updateTechnician}
          />
        </div>
      ) : (
        <div>
          <TechnicianForm
            onAdd={addTechnician}
            setCurrentTechnician={setCurrentTechnician}
            setUpdate={setUpdate}
            getTechnician={getTechnician}
          />
        </div>
      )}
      <TechnicianList
        technicians={technicians}
        onDelete={deleteTechnician}
        editTechnician={editTechnician}
      />
    </div>
  );
}

export default Technicians;
