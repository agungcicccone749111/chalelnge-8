// DashboardPage.js
import React from 'react';
import Admin from '../../layouts/admin'
const Home = () => {
  return (
  <Admin>
      <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <Card title="Card 1" content="Content for Card 1" />
        <Card title="Card 2" content="Content for Card 2" />
        <Card title="Card 3" content="Content for Card 3" />
        <Card title="Card 4" content="Content for Card 4" />
      </div>
    </div>
  </Admin>
  );
};

const Card = ({ title, content }) => {
  return (
    <div className="col-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
