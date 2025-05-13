import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraficoProductos = ({ nombres, precios }) => {
  const data = {
    labels: nombres,
    datasets: [
      {
        label: 'Precios de Productos',
        data: precios,
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Card className="p-3 m-4 shadow">
      <h5 className="text-center">Estadísticas de Productos</h5>
      <Bar data={data} options={options} />
    </Card>
  );
};

export default GraficoProductos;
