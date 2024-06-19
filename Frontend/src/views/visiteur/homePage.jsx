

import '../../style/Visiteur/home.css'; // Import du fichier de style CSS
import { Link } from 'react-router-dom';



const HomePage = () => {

    return (
       <div>
       
       <div className='stand-front'>
       <div className="des">
       <h2>Bienvenue dans notre plateforme Futur Event </h2>
       <Link to="/login">
                      <button    className="get-started-button">get-started</button>
                     </Link>
                      
                      
                     </div>
       </div>
       


            <div className='container'>
                 
                    <div className="description">
                     
                      
                      <p>Planifiez, gérez et réservez en ligne vos expositions avec facilité.</p>
                      <Link to="/vue">
                      <button    className="get-started-button">entrez dans la foire virtuelle </button>
                     </Link>
                   
                
                    </div>



                    <div  className='imageFront'>  

                   </div>
                 

            </div>


            <div className='container1'>

                    <div className='image-font-2'> </div>

                     <div className='contenu'>
                          <h3>explorer notre événements </h3>
                          <p>Découvrez dès maintenant tous nos événements à venir !</p>
                          <Link to="/eventGallery">
                          <button className='consulter-button'> Découvrez événements </button>
                     
                          </Link>

                           
                     </div>

            </div>

            

            




    
          


        </div>
        
            
    );
};

export default HomePage;
