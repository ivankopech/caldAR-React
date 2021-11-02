import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import boilerData from '../../data/boiler.json';
import BoilerList from './List';
import BoilerForm from './Form';
import styles from './boiler.module.css';
import Boiler from './Boiler';

function  Boilers() {
  const history = useHistory();
  const [boilers, setBoilers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentBoiler, setCurrentBoiler] = useState({
    id: null,
    fullName: '',
  });

  useEffect(() => {
    const getBoiler = () => {
        setBoilers(boilerData);
    };

    getBoiler();
  }, []);

  const getBoiler = (id) => {
    return boilerData.find((b) => b.id === id);
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

  const addBoiler = (boiler) => {
    boiler.id = generateRandom(24);
    setBoilers([...boilers, boiler]);
  };

  const editBoiler = (boiler) => {
    setUpdate(true);
    history.push(`/boilers/update/${boiler.id}`);
    setCurrentBoiler({
      id: boiler.id,
      fullName: boiler.fullName,
    });
  };

  const updateBoiler = (boiler => {
    setUpdate(false);
    const updatedBoilers = boiler.map((x) =>
      x.id === boiler.id ? boiler : x
    );
    setBoilers(updateBoiler);
    history.push('/boilers');
  });

  const deleteBoiler = (id) => {
    setUpdate(false);
    setBoilers(boilers.filter((boiler) => boiler.id !== id));
    history.replace('/boilers');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Boilers</h2>
      {update ? (
        <div>
          <BoilerForm
            currentBoiler={currentBoiler}
            setUpdate={setUpdate}
            updateBoiler={updateBoiler}
          />
        </div>
      ) : (
        <div>
          <BoilerForm
            onAdd={addBoiler}
            setCurrentBoiler={setCurrentBoiler}
            setUpdate={setUpdate}
            getBoiler={getBoiler}
          />
        </div>
      )}
      <BoilerList
        boilers={boilers}
        onDelete={deleteBoiler}
        editBoiler={editBoiler}
      />
    </div>
  );
}

export default Boilers;