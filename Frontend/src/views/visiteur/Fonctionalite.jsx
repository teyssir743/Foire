
import { FaCalendarAlt, FaUser, FaRegCalendarCheck, FaPalette, FaComments,FaCreditCard } from 'react-icons/fa';
import '../../style/Visiteur/Fonctionalite.css'
import TopBarHome from '../visiteur/TopBarHome';



function Fonctionalite() {
  return (
    <div>
       <TopBarHome/>
    <div className="main-container">
      <div className="features-container">
        {/* Fonctionnalité 1 */}
        <div className="box">
          <FaUser className="icon" />
          <h2>Gestion des expositions</h2>
          <p>Planifiez et gérez vos expositions avec facilité.</p>
        </div>
        {/* Fonctionnalité 2 */}
        <div className="box">
        <FaCalendarAlt className="icon" />
        <h2>Événements</h2>
        <p>Organisez et gérez vos événements avec des fonctionnalités complètes de planification et de suivi.</p>
      </div>
        {/* Fonctionnalité 3 */}
        <div className="box">
          <FaRegCalendarCheck className="icon" />
          <h2>Réservation en ligne</h2>
          <p>Permettez aux visiteurs de réserver leurs places en ligne en toute simplicité.</p>
        </div>
        {/* Fonctionnalité 4 */}
        <div className="box">
          <FaPalette className="icon" />
          <h2>Stands </h2>
          <p>Des stands  personnalisables pour chaque exposant.</p>
        </div>
        {/* Fonctionnalité 5 */}
        <div className="box">
          <FaComments className="icon" />
          <h2>Outils de communication</h2>
          <p>Des outils de communication intégrés pour interagir avec les exposants.</p>
        </div>
        {/* Fonctionnalité 6 */}
        
        {/* Fonctionnalité 7 */}
        <div className="box">
        <FaCreditCard className="icon" />
        <h2>Paiement en ligne</h2>
        <p>La possibilité de collecter des paiements directement en ligne de manière sécurisée et efficace.</p>
        </div>
      </div>
    </div>

    </div>
  );
}

export default Fonctionalite;
