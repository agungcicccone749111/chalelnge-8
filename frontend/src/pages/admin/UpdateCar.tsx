import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from '../../layouts/admin';
import { useAuth } from '../../AuthenticationContext';
import { useParams } from 'react-router-dom';

const UpdateCar: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    year: 0,
    size: '',
    availability: false,
    available_at: new Date().toISOString().split('T')[0],
    capacity: 0,
    description: '',
    picture_url: null,
    car_transmission_id: '',
    car_brand_id: '',
    car_type_id: '',
  });
  interface FormData {
    name: string;
    price: number;
    year: number;
    size: string;
    availability: boolean;
    available_at: string;
    capacity: number;
    description: string;
    picture_url: File | null;
    car_transmission_id: string;
    car_brand_id: string;
    car_type_id: string;
  }
  
  const { getToken } = useAuth();
  const { carId } = useParams<{ carId: string }>();

 

  const [submittedData, setSubmittedData] = useState<any>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`http://localhost:9000/api/v1/car/${carId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const carData = response.data['data'];
        carData.available_at=carData.available_at.split('T')[0],
        setFormData(carData);
      } catch (error) {
        console.error('Error fetching car details:', error.message);
      }
    };

    fetchData();
  }, [carId, getToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prevData) => ({
      ...prevData,
      picture_url: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataWithFile = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataWithFile.append(key, value);
    });
    
    try {
      const token = getToken();
      await axios.put(`http://localhost:9000/api/v1/car/${carId}`, formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Data Berhasil Diubah')
      setSubmittedData(formData);
    } catch (error) {
      alert(error)
    }
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    
    }));
  };
  return (
    <Admin>
      <div className="container ">
        <h2 className="mt-3">Car Form Page</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="foto" className="form-label">
              Foto
            </label>
            <input
              type="file"
              className="form-control"
              id="picture_url"
              name="picture_url"
              onChange={handleFileChange}
             
            />
            <label htmlFor="kapasitas" className="form-label">
              Kapasitas
            </label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
            <label htmlFor="Tersedia" className="form-label">
              Tersedia
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.available_at}
              onChange={handleChange}
              required
            />
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="number"
              className="form-control"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
            <label htmlFor="ukuran" className="form-label">
              Ukuran
            </label>

             <select
              name="capacity"
              id="capacity"
              className="form-control"
              value={formData.capacity}
              onChange={handleSelectChange} // Use the handleSelectChange function for select elements
              required>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
            <label htmlFor="deskripsi">Deskripsi</label>
            <textarea
              name="description"
              id="description"
              cols={20}
              rows={5}
              className="form-control"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {submittedData && (
          <div className="mt-3">
            <h3>Submitted Data:</h3>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </Admin>
  );
};

export default UpdateCar;
