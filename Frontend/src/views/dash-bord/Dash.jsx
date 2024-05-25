import React from 'react';
import { Space } from 'antd';
import DashSideMenu from '../dash-bord/Dash-sideMenu';
import DashHeader from '../dash-bord/Dash-header';
import '../dash-bord/Dash-style/dash.css';

function Dash({ children }) {
    return (
        <div className='dash'>
            <DashHeader />
            <Space className='SideMenuAndPageContent'>
                <DashSideMenu />
                <div className='PageContent'>
                    {children}
                </div>
            </Space>
        </div>
    );
}

export default Dash;
