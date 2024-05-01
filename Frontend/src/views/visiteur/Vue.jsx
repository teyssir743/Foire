
import foire from '../../vedio/vue360.mp4';
import TopBarHome from '../visiteur/TopBarHome';
import Footer from '../visiteur/Footer'


function Vue() {

  const pdfUrl = 'chemin/vers/votre/pdf.pdf'; // Remplacez 'chemin/vers/votre/pdf.pdf' par le chemin de votre PDF


  return (
    <div>
      < TopBarHome/>
    <h2 color='black' >visiter notre foire !</h2>
    <video width="1530px" height="600px" controls>
        <source src={foire} type="video/mp4" />
       
    </video>


    <div>

    <a href={pdfUrl}
     target="_blank" 
     rel="noopener noreferrer"
     style={{
      color: 'blue', // Couleur du texte
      textDecoration: 'none', // Pas de soulignement
      fontSize: '16px', // Taille de la police
      fontWeight: 'bold', // Graisse de la police
      margin: '20px 0', // Marge supérieure et inférieure
      display: 'block' // Afficher comme bloc pour occuper toute la largeur disponible
    }}
    >cliquer pour voir detail de cette Foire</a>

    </div>

   <Footer/> 
    
</div>
  )
}

export default Vue;