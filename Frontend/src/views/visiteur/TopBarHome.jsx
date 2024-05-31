
import '../../style/Visiteur/topBarHome.css';
import logo from '../../image/3.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Navbar = () => {


    const user = JSON.parse(localStorage.getItem('userData'))

    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.clear()
        toast.warn("Vous étes déconnecté ! ")
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }




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
            <ToastContainer />
            <div className="top-banner">
                <p>Bienvenue sur Futur Event - Votre partenaire pour des foires réussies !</p>
                <p>Participez aux événements en toute simplicité. Inscrivez-vous dès maintenant pour réserver votre stand.</p>
            </div>
            <div className="navbar-box">


                {/* Logo */}
                <div className="navbar-logo">
                    <img src={logo} className="logo-img" alt="Logo" />
                </div>



                {/* Liens */}
                <div className="navbar-section">
                    <a href="/" className="navbar-link">Acceuil</a>
                    <a href="/contact" className="navbar-link">Contact</a>


                    <a href="/eventGallery" className="navbar-link">Événements</a>
                    <a href="/Gallerystand" className="navbar-link">stand</a>

                    <a href="createReservation" className="navbar-link">Réservation</a>
                    <a href="/payer" className="navbar-link">paiement</a>




                </div>




                {
                    !user ? <div className='navbar-button'>
                        <button onClick={handleCreateAccountClick} className="connect-button">créer compte</button>
                        <button onClick={handleLoginClick} className="connect-button">Se connecter</button>
                    </div>

                        : <div className='navbar-button'><button
                            onClick={() => { handleLogout() }}
                            className="login-button mx-2"
                            style={{
                                backgroundColor: '#A8192A',
                                color: 'white',
                                width: '100%',
                                padding: '10px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Déconnection
                        </button>
                        </div>
                }





            </div>
        </nav>
    );
};

export default Navbar;
