import React, { useState, FormEvent, useEffect } from 'react';

interface Patients {
  _id: string;
  name_and_surname: string;
  address: string;
  phone_number: string;
  date_of_birth: string;
}

const CreatePatient: React.FC = () => {
  const [newName, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');

  const [patients, setPatients] = useState<Patients[]>(() => {
    const storagedPatients = localStorage.getItem('@clinicDatabase:patients');

    if (storagedPatients) {
      return JSON.parse(storagedPatients);
    }
    return [];
  });

  async function getPatients(): Promise<void> {
    /**
     *  Func get patients from the API in order to
     *  display it in the screen.
     */
    const response = await fetch('http://localhost:5000/patients');
    const data = await response.json();
    setPatients(data);
  }

  useEffect(() => {
    getPatients();
  }, []);

  async function handleSubmit(
    /**
     *  Func responsible for get the api and add patient submited
     *  in the input.
     */
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/patients', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name_and_surname: newName,
        address,
        phone_number: number,
        date_of_birth: date,
      }),
    });
    const data = await response.json();
    console.log(data);
    getPatients();
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h1>Create Patient</h1>
          <form onSubmit={handleSubmit} className="card card-body">
            <div className="form-group">
              <h2>Name and Surname</h2>
              <input
                type="text"
                onChange={e => setName(e.target.value)}
                value={newName}
                className="form-control"
                placeholder="Name and surname"
              />
            </div>

            <div className="form-group">
              <h2>Address</h2>
              <input
                type="text"
                onChange={e => setAddress(e.target.value)}
                value={address}
                className="form-control"
                placeholder="Adress"
              />
            </div>
            <div className="form-group">
              <h2>Phone Number</h2>
              <input
                type="number"
                onChange={e => setNumber(e.target.value)}
                value={number}
                className="form-control"
                placeholder="Phone number"
              />
            </div>
            <div className="form-group">
              <h2>Date of Birth</h2>
              <input
                type="date"
                onChange={e => setDate(e.target.value)}
                value={date}
                className="form-control"
                placeholder="Date-of-bird"
              />
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePatient;
