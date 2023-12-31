import React, { useState, useEffect } from 'react';
import Admin from '../../layouts/admin';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthenticationContext';
import Modal from '../../components/Modals'; // Adjust the import path

const MobilPage = () => {
  const [mobilList, setMobilList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMobilId, setSelectedMobilId] = useState(null); // Track the selected mobil ID
  const [successMessage, setSuccessMessage] = useState(null); // Add successMessage state

  const { getToken } = useAuth();
  const token = getToken();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get('http://localhost:9000/api/v1/car', { headers });
        setMobilList(response.data['data']);
      } catch (error) {
        console.error('Error fetching car data:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (mobilId) => {
    // Show the delete confirmation modal
    setSelectedMobilId(mobilId);
    setShowModal(true);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get('http://localhost:9000/api/v1/car', { headers });
      setMobilList(response.data['data']);
    } catch (error) {
      console.error('Error fetching car data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleConfirmDelete = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Send DELETE request to the /api/v1/car/id endpoint
      await axios.delete(`http://localhost:9000/api/v1/car/${selectedMobilId}`, { headers });
  
      // After successful deletion, hide the modal
      setShowModal(false);
      setSelectedMobilId(null);
  
      // Display success message in the modal
      alert('Car deleted successfully');
      setShowModal(false);
      // Fetch updated car list (if needed)
      fetchData();
    } catch (error) {
      console.error('Error deleting car:', error.message);
    }
  };
  

  const handleCancelDelete = () => {
    // Hide the delete confirmation modal
    setShowModal(false);
    setSelectedMobilId(null);
  };

  return (
    <Admin>
      <div className="container">
        <h2 className="mt-3">Halaman Mobil</h2>
        <Link to="/admin/car/add">
          <button className="btn btn-primary mb-3">Tambah Mobil</button>
        </Link>

        {/* Loading indicator */}
        {loading && <p>Loading...</p>}

        {/* Error message */}
        {error && <p>Error: {error}</p>}

        <div className="card-deck">
          {mobilList.map((mobil, index) => (
            <React.Fragment key={mobil.id}>
              <div className="card p-5" style={{ width: '18rem', margin: '10px' }}>
                <div className="card-body">
                  <center><h3>{mobil.name}</h3></center>
                  <img width="100%" alt="" />
                  <p>Model: {mobil.capacity}</p>
                  <p>Tahun: {mobil.year}</p>
                  <p className='text-center'>
                    <Link to={`/admin/car/update/${mobil.id}`}>
                      <button className='btn btn-md mr-5  mr-0 btn-success'>Edit</button>
                    </Link>
                    <button className='btn btn-md ml-5  mr-0 btn-danger' onClick={() => handleDeleteClick(mobil.id)}>Delete</button>
                  </p>
                </div>
              </div>
              {index % 3 === 2 && <div className="w-100"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal show={showModal} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
    </Admin>
  );
};

export default MobilPage;
