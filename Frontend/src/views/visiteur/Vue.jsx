
import foire from '../../vedio/vue360.mp4';
import TopBarHome from '../visiteur/TopBarHome';


function Vue() {
  return (
    <div>
      < TopBarHome/>
    <h2 color='black' >visiter notre foire !</h2>
    <video width="1530px" height="600px" controls>
        <source src={foire} type="video/mp4" />
       
    </video>

    <div>



    </div>

    
</div>
  )
}

export default Vue;