

import '../../style/Visiteur/home.css'; // Import du fichier de style CSS
import { Link } from 'react-router-dom';


const HomePage = () => {

    return (
       <div>
       
        


            <div className='container'>
                 
                    <div className="description">
                      <h2>Bienvenue sur notre plateforme de gestion de foires !</h2>
                      
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
