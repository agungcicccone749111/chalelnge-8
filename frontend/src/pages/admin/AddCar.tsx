import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Admin from '../../layouts/admin';
import { useAuth } from '../../AuthenticationContext';

const AddCar: React.FC = () => {
  const { getToken } = useAuth();
  const [car_brand_id, setcar_brand_id] = useState([]);
  const [car_type_id, setcar_types] = useState([]);
  const [car_transmission_id, setcar_transmission] = useState([]);
  useEffect(() => {
    // Fetch car brands from the API
    const fetchCarBrands = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/v1/car-brand', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }) ; 
        setcar_brand_id(response.data['data']);
      } catch (error) {
        console.error('Error fetching car brands:', error.message);
      }
    };

    fetchCarBrands();
  }, []); 
  // Empty dependency array ensures the effect runs once when the component mounts
  useEffect(() => {
    // Fetch car brands from the API
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/v1/car-type', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }) ; 
        setcar_types(response.data['data']);
      } catch (error) {
        console.error('Error fetching car brands:', error.message);
      }
    };

    fetchCarTypes();
  }, []);
  useEffect(() => {
    // Fetch car brands from the API
    const fetchCarTransmisson = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/v1/car-transmission', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }) ; 
        setcar_transmission(response.data['data']);
      } catch (error) {
        console.error('Error fetching car brands:', error.message);
      }
    };

    fetchCarTransmisson();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    year: 0,
    size: '',
    availability: false,
    available_at: new Date(),
    capacity: 0,
    description: '',
    picture_url: null,
    car_transmission_id: '',
    car_brand_id: '',
    car_type_id: '',
  });
  const token = getToken();
  const [submittedData, setSubmittedData] = useState<any>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
    

      // Make an API call to submit the form data
      const response = await axios.post('http://localhost:9000/api/v1/car', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setSubmittedData(response.data);
      console.log('Server Response:', response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log('AxiosError Code:', axiosError.code);
      console.log('AxiosError Config:', axiosError.config);
      console.log('AxiosError Request:', axiosError.request);
      console.log('AxiosError Response:', axiosError.response);
    }
  };

  return (
    <Admin>
      <div className="container">
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
      required
    />
  </div>
  <div className="mb-3">
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
  </div>
  <div className="mb-3">
    <label htmlFor="Tersedia" className="form-label">
      Tersedia
    </label>
    <input
      type="date"
      className="form-control"
      id="date"
      name="available_at"
      value={formData.available_at.toISOString().split('T')[0]}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
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
  </div>
  <div className="mb-3">
    <label htmlFor="ukuran" className="form-label">
      Ukuran
    </label>
    <select
      name="size"
      id="size"
      className="form-control"
      value={formData.size}
      onChange={handleChange}
      required
    >
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option value="Large">Large</option>
    </select>
  </div>
 
          <div className='mb-3'><label htmlFor="carBrand"> Car Brand</label>
          <select
            name="car_brand_id"
            id="carBrand"
            className="form-control"
            value={formData.car_brand_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Car Brand
            </option>
            {car_brand_id ? ( // Check if car_brand_id is defined
              car_brand_id.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select>
          </div>
       
          <div className='mb-3'><label htmlFor="carBrand"> Car Type</label>
          <select
            name="car_type_id"
            id="carTypes"
            className="form-control"
            value={formData.car_type_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Car Brand
            </option>
            {car_type_id ? ( // Check if car_brand_id is defined
              car_type_id.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select>
          </div>
          <div className='mb-3'><label htmlFor="carTrasmission"> Car Transmisson</label>
          <select
            name="car_transmission_id"
            id="carTrasmisssion"
            className="form-control"
            value={formData.car_transmission_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Car Brand
            </option>
            {car_transmission_id ? ( // Check if car_brand_id is defined
              car_transmission_id.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select>
          </div>
  <div className="mb-3">
    <label htmlFor="deskripsi" className="form-label">
      Deskripsi
    </label>
    <textarea
      name="description"
      id="description"
      cols={20}
      rows={5}
      className="form-control"
      value={formData.description}
      onChange={handleChange}
    ></textarea>
    <select name="carBrand" id="carBrand">
      
    </select>
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

export default AddCar;
