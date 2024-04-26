import DashSideMenu from '../dash-bord/Dash-sideMenu';
import  DashHeader from '../dash-bord/Dash-header';
import DashFooter from '../dash-bord/Dash-Footer';

import '../dash-bord/Dash-style/dash.css';
import {Space} from 'antd';


function Dash({children}) {
  return (
    <div className='dash'>
        
        <DashHeader/>

        <Space className='SideMenuAndPageContent'>

            <DashSideMenu/>
            
            {children}
           

        </Space>

        <DashFooter/>
    </div>
  )
}

export default Dash