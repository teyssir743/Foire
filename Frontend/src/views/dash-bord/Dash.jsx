import DashSideMenu from '../dash-bord/Dash-sideMenu';
import  DashHeader from '../dash-bord/Dash-header';
import DashContent from '../dash-bord/Dash-content';
import DashFooter from '../dash-bord/Dash-Footer';

import '../dash-bord/Dash-style/dash.css';

import {Space} from 'antd';


function Dash() {
  return (
    <div className='dash'>
        
        <DashHeader/>
        <Space className='SideMenuAndPageContent'>

            <DashSideMenu/>
            <DashContent/>


        </Space>
        <DashFooter/>
    </div>
  )
}

export default Dash