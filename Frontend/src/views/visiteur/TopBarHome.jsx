
import '../../style/Visiteur/topBarHome.css';
import logo from '../../image/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
   
   
    
    const navigate = useNavigate();

    

    


    // Fonction pour gérer le clic sur les liens
const handleLinkClick = (e) => {
  // Supprimer la classe "clicked" de tous les liens
  const links = document.querySelectorAll('.navbar-link');
  links.forEach(link => {
      link.classList.remove('clicked');
  });

  // Ajouter la classe "clicked" uniquement au lien cliqué
  e.target.classList.add('clicked');
};

// Ajouter un écouteur d'événements à chaque lien
document.querySelectorAll('.navbar-link').forEach(link => {
  link.addEventListener('click', handleLinkClick);
});


const handleCreateAccountClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };



    return (
        <nav className="navbar-container">
            <div className="navbar-box">
               
               
                {/* Logo */}
                <div className="navbar-logo">
                    <img src={logo} className="logo-img" alt="Logo" />
                </div>

                

                {/* Liens */}
                <div className="navbar-section">
                    <a href="/" className="navbar-link">Acceuil</a>
                    <a href="/contact" className="navbar-link">Contact</a>
                    <a href="/fonctionalité" className="navbar-link">Fonctionalité</a>
                    <a href="/Vue" className="navbar-link">Foire</a>
                    <a href="/eventGallery" className="navbar-link">Événements</a>
                    <a href="/Gallerystand" className="navbar-link">stand</a>
                    <a href="#" className="navbar-link">vue 360</a>
                    <a href="createReservation" className="navbar-link">Réservation</a>
                    <a href="/payer" className="navbar-link">paiement</a>

                   
        
                   
                </div>



            {/* button*/ }    

           <div className='navbar-button'>
                <button  onClick={handleCreateAccountClick} className="connect-button">créer compte</button>
                <button  onClick={handleLoginClick} className="connect-button">Se connecter</button>
            </div>


            </div>
        </nav>
    );
};

export default Navbar;
