import React, { useEffect, useState } from 'react';
import { Card, Space, Statistic } from 'antd';
import { UserOutlined, CalendarOutlined, ShopOutlined, SolutionOutlined, DollarOutlined } from '@ant-design/icons';
import Dash from '../dash-bord/Dash';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

function DashboardPage() {
    const [userData, setUserData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [standData, setStandData] = useState([]);
    const [reservationData, setReservationData] = useState([]);
    const [paymentData, setPaymentData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/user/listeUser")
            .then(response => {
                setUserData(response.data.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des données des utilisateurs :', error));

        axios.get("http://localhost:5000/api/event/listeEvent")
            .then(response => {
                setEventData(response.data.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des données des événements :', error));

        axios.get("http://localhost:5000/api/stand/listeStand")
            .then(response => {
                setStandData(response.data.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des données des stands :', error));

        axios.get("http://localhost:5000/api/reservation/listeReservation1")
            .then(response => {
                setReservationData(response.data.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des données des réservations :', error));

        axios.get("http://localhost:5000/api/paiement/listePaiement")
            .then(response => {
                setPaymentData(response.data.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des données des paiements :', error));
    }, []);

    const data = [
        { name: 'Users', value: userData.length },
        { name: 'Events', value: eventData.length },
        { name: 'Stands', value: standData.length },
        { name: 'Reservations', value: reservationData.length },
        { name: 'Payments', value: paymentData.length }
    ];

    return (
        <Dash>
            <div className="dashboard" style={{ backgroundColor: '#192a56', color: '#fff', padding: '50px' }}>
                <Space direction="horizontal" size="large">
                <Card style={{ width: 200, backgroundColor: '#192a56', border: '1px solid #ff007f' }}>

                        <Statistic
                            title={<span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>User</span>}
                            value={userData.length}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#fff' }}
                        />
                    </Card>
                    <Card style={{ width: 200, backgroundColor: '#192a56', border: '1px solid #ff007f' }}>

                        <Statistic
                            title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Event</span>}
                            value={eventData.length}
                            prefix={<CalendarOutlined />}
                            valueStyle={{ color: '#fff' }}
                        />
                    </Card>
                    <Card style={{ width: 200, backgroundColor: '#192a56', border: '1px solid #ff007f' }}>

                        <Statistic
                            title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Stand</span>}
                            value={standData.length}
                            prefix={<ShopOutlined />}
                            valueStyle={{ color: '#fff' }}
                        />
                    </Card>
                    <Card style={{ width: 200, backgroundColor: '#192a56', border: '1px solid #ff007f' }}>

                        <Statistic
                            title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Reservation</span>}
                            value={reservationData.length}
                            prefix={<SolutionOutlined />}
                            valueStyle={{ color: '#fff' }}
                        />
                    </Card>
                    <Card style={{ width: 200, backgroundColor: '#192a56', border: '1px solid #ff007f' }}>

                        <Statistic
                            title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Payment</span>}
                            value={paymentData.length}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#fff' }}
                        />
                    </Card>
                </Space>


                <div style={{ marginTop:'50px', display: 'flex', justifyContent: 'space-between' }}>
                   <Card style={{ backgroundColor: 'transparent', border: '1px solid #ff007f' }}>

                        <h2 style={{ color: '#fff' }}>Bar Chart</h2>
                        <BarChart width={400} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#ff007f" />
                        </BarChart>
                    </Card>
                    <Card style={{ backgroundColor: 'transparent', border: '1px solid #ff007f' , margin: '0 10px' }}>

                        <h2 style={{ color: '#fff' }}>Line Chart</h2>
                        <LineChart width={400} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#ff007f" />
                        </LineChart>
                    </Card>
                    <Card style={{ backgroundColor: 'transparent', border: '1px solid #ff007f' }}>

                        <h2 style={{ color: '#fff' }}>Pie Chart</h2>
                        <PieChart width={400} height={300}>
                            <Pie dataKey="value" data={data} cx={200} cy={150} outerRadius={60} fill="#ff007f" label />
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Card>
                </div>
            </div>
        </Dash>
    );
}

export default DashboardPage;
