import { Card, Space, Statistic } from 'antd';
import { BookOutlined, UserOutlined, SolutionOutlined, CalendarOutlined, ShopOutlined } from '@ant-design/icons';
import Dash from '../dash-bord/Dash';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, RadialBarChart, RadialBar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DashbordPage() {

  
  const [eventData, setEventData] = useState([]);
  const [userData, setUserData] = useState([]);
  // Ajoutez des states similaires pour les autres données

  useEffect(() => {
    axios.get("http://localhost:5000/api/event/listeEvent1")
        .then(response => {
            setEventData(response.data);
        })
        .catch(error => console.error('Erreur lors de la récupération des données des événements :', error));

    axios.get("http://localhost:5000/api/user/listeUser1")
        .then(response => {
            setUserData(response.data.data); // Utilisez response.data.data pour accéder aux données d'utilisateur
        })
        .catch(error => console.error('Erreur lors de la récupération des données des utilisateurs :', error));
}, []);

  const dataBar = [
    { name: 'Jan', users: 1000, events: 240, stands: 320 },
    { name: 'Feb', users: 1300, events: 340, stands: 350 },
    { name: 'Mar', users: 1400, events: 350, stands: 370 },
    { name: 'Apr', users: 1600, events: 380, stands: 400 },
    { name: 'May', users: 1700, events: 400, stands: 420 },
    { name: 'Jun', users: 1900, events: 420, stands: 440 },
  ];

  const dataLine = [
    { name: 'Jan', users: 1000, events: 240, stands: 320 },
    { name: 'Feb', users: 1300, events: 340, stands: 350 },
    { name: 'Mar', users: 1400, events: 350, stands: 370 },
    { name: 'Apr', users: 1600, events: 380, stands: 400 },
    { name: 'May', users: 1700, events: 400, stands: 420 },
    { name: 'Jun', users: 1900, events: 420, stands: 440 },
  ];

  const dataPie = [
    { name: 'Users', value: 1234 },
    { name: 'Events', value: 523 },
    { name: 'Stands', value: 5157 },
  ];

  const dataRadialBar = [
    { name: 'Users', uv: 1234 },
    { name: 'Events', uv: 523 },
    { name: 'Stands', uv: 5157 },
  ];

  return (
    <Dash>
      <div style={{ padding: '50px' }}>
        <Space direction="horizontal" size="large">
          <Card style={{ width: 200, backgroundColor: '#e6f7ff' }}>
            <Statistic
              title={<span style={{ fontSize: '18px', fontWeight: 'bold', color: '#5784BA' }}>User</span>}
              value={userData ? userData.length : 0} 
              prefix={<UserOutlined />}
              valueStyle={{ color: '#5784BA' }}
            />
          </Card>
          <Card style={{ width: 200, backgroundColor: '#FFE9D5' }}>
            <Statistic
              title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#FC4100' }}>Event</span>}
              value={eventData ? eventData.length : 0} // Utilisez les données récupérées
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#FC4100' }}
            />
          </Card>
          <Card style={{ width: 200, backgroundColor: '#C0F2C3' }}>
            <Statistic
              title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#3f8600' }}>Stand</span>}
              value={5157}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
          <Card style={{ width: 200, backgroundColor: '#DCB9F9' }}>
            <Statistic
              title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#722ed1' }}>Foir</span>}
              value={3}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
          <Card style={{ width: 200, backgroundColor: '#fce4ec' }}>
            <Statistic
              title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#CA3C66' }}>Reservation</span>}
              value={20}
              prefix={<SolutionOutlined />}
              valueStyle={{ color: '#CA3C66' }}
            />
          </Card>
        </Space>
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
          <Card>
            <h2>Bar Chart</h2>
            <BarChart width={400} height={300} data={dataBar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#5784BA" />
              <Bar dataKey="events" fill="#FC4100" />
              <Bar dataKey="stands" fill="#3f8600" />
            </BarChart>
          </Card>
          <Card>
            <h2>Line Chart</h2>
            <LineChart width={400} height={300} data={dataLine}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#5784BA" />
              <Line type="monotone" dataKey="events" stroke="#FC4100" />
              <Line type="monotone" dataKey="stands" stroke="#3f8600" />
            </LineChart>
          </Card>
        </div>
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
          <Card>
            <h2>Pie Chart</h2>
            <PieChart width={400} height={300}>
              <Pie data={dataPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
            </PieChart>
          </Card>
          <Card>
            <h2>Radial Bar Chart</h2>
            <RadialBarChart width={400} height={300} cx="50%" cy="50%" innerRadius={20} outerRadius={140} barSize={10} data={dataRadialBar}>
              <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
              <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={{ left: 10 }} />
              <Tooltip />
            </RadialBarChart>
          </Card>
        </div>
      </div>
    </Dash>
  );
}

export default DashbordPage;
