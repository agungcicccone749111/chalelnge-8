import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

interface CarType {
  id: string;
  name: string;
}

interface CarBrand {
  id: string;
  name: string;
}

interface CarTransmission {
  id: string;
  name: string;
}

interface CarData {
  id: string;
  name: string;
  price: string;
  year: number;
  size: string;
  availability: boolean;
  capacity: number;
  description: string;
  picture_url: string;
  available_at: string;
  updated_at: string;
  is_deleted: boolean;
  car_brand_id: string;
  car_type_id: string;
  car_transmission_id: string;
  carType: CarType;
  carBrand: CarBrand;
  carTransmission: CarTransmission;
}

function FormSearchCar() {
  const [apiData, setApiData] = useState<CarData[] | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');

// ...

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Access form data
    const formData = new FormData(event.currentTarget);
  
    // Construct the URL with query parameters
    const apiUrl = 'http://localhost:9000/user/car';
    const queryString = new URLSearchParams(formData as any).toString();
    const urlWithParams = `${apiUrl}?${queryString}`;
   
    try {
      const response = await axios.get<CarData[]>(urlWithParams);
  
      if (response.status !== 200) {
        throw new Error(`API request failed with status: ${response.status}`);
        setErrorModalMessage(`Error fetching data from the API: ${error.message}`);
        setShowErrorModal(true);
      }
  
      const data = response.data;
      if(data['data'].length===0){
        alert(`Mohon Maaf Data Tidak Ada`);
        setApiData([]);
        
      }
      else{
        setApiData(data['data']);
      }
   
    } catch (error) {
      console.error('Error fetching data from the API:', error.message);
    }
  };
  
  // ...
  

  useEffect(() => {
    // Fetch initial data on component mount (if needed)
    handleSubmit(new Event('submit') as FormEvent<HTMLFormElement>);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
  
    <div className="container z-2">
      <div className="row">
        <div className="col-10 p-3 offset-1 search-panel">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="driver">Tipe Driver</label>
                  <select name="driver" id="driver" className="form-select">
                    <option value="" disabled selected hidden>
                      Pilih Tipe Driver
                    </option>
                    <option value="dengan-supir">Dengan Supir</option>
                    <option value="tanpa-supir">Tanpa Supir</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="tanggal">Tanggal</label>
                  <input type="date" name="avability" id="tanggal" className="form-control" />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="jemput">Waktu Jemput/Ambil</label>
                  <input type="time" name="jemput" id="jemput" className="form-control" />
                </div>
              </div>
              <div className="col-lg-3">
            <div className="form-group">
                <label htmlFor="size">Ukuruna Mobil</label>
                <input type="number" className='form-control' name='size' id="size" />
              </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="form-group">
                  <button type="submit" className="btn btn-success col-12"  id="btn-search">
                    Cari Mobil
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showErrorModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowErrorModal(false)}>&times;</span>
            <h2>Error</h2>
            <p>{errorModalMessage}</p>
          </div>
        </div>
      )}
      {/* Display all fetched data in cards */}
      <div className="row mt-3">
  {apiData && Array.isArray(apiData) ? (
    <div className="col-12 offset-1 d-flex flex-row flex-wrap">
      {apiData.map((car, index) => (
        <div className="card col-3 p-3 m-2 mb-3" key={index}>
          <img src={car.picture_url} className="card-img-top" alt={car.name} />
          <div className="card-body">
            <h5 className="card-title">{car.name}</h5>
            <p className="card-text">{car.description}</p>
            <p className="card-text">{`Price: $${car.price}`}</p>
            <p className="card-text">{`Year: ${car.year}`}</p>
            <p className="card-text">{`Capacity: ${car.capacity}`}</p>
            <p className='text-left'>
  <div className='d-flex flex-row-reverse'>
  <button className=' btn-primary btn'>Details</button>
  <button className='success btn-success btn'>Book</button>
  </div>
</p>
         {/* Add more properties as needed */}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No data available</p>
  )}
</div>

    </div>
  );
}

export default FormSearchCar;
