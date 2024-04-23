
import { FaCalendarAlt, FaGlobe, FaRegCalendarCheck, FaPalette, FaComments, FaEye, FaUsers } from 'react-icons/fa';
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
          <FaCalendarAlt className="icon" />
          <h2>Gestion des expositions</h2>
          <p>Planifiez et gérez vos expositions avec facilité.</p>
        </div>
        {/* Fonctionnalité 2 */}
        <div className="box">
          <FaGlobe className="icon" />
          <h2>Vue à 360 degrés</h2>
          <p>Offrez une expérience immersive avec des vues à 360 degrés de vos expositions.</p>
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
          <h2>Stands virtuels</h2>
          <p>Des stands virtuels personnalisables pour chaque exposant.</p>
        </div>
        {/* Fonctionnalité 5 */}
        <div className="box">
          <FaComments className="icon" />
          <h2>Outils de communication</h2>
          <p>Des outils de communication intégrés pour interagir avec les visiteurs.</p>
        </div>
        {/* Fonctionnalité 6 */}
        <div className="box">
          <FaEye className="icon" />
          <h2>Vue 360</h2>
          <p>Une expérience immersive avec des vues panoramiques à 360 degrés.</p>
        </div>
        {/* Fonctionnalité 7 */}
        <div className="box">
          <FaUsers className="icon" />
          <h2>Contact</h2>
          <p>La possibilité de collecter des leads et des contacts directement en ligne.</p>
        </div>
      </div>
    </div>

    </div>
  );
}

export default Fonctionalite;
