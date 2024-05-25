import foire from '../../vedio/vue360.mp4';
import foir1 from '../../image/foir1.png';
import foir2 from '../../image/foir2.png';
import foir3 from '../../image/foir3.png';
import '../../style/Visiteur/vue.css'

function Vue() {
  return (
    <div>
      <div>
        <video width="100%" height="auto" loop controls>
          <source src={foire} type="video/mp4"  />
        </video>
      </div>

      <div className='container-foir'>
        <div className='foir1'>  
          <img src={foir2} alt="foir2" />
        </div>

        <div className='des'>
          <h2>Plongez dans une expérience immersive et trouvez tout ce dont vous avez besoin !</h2>
          <h4>Que vous soyez à la recherche de bonnes affaires, d’idées cadeaux originales, d’idées inspirantes ou simplement d’une expérience immersive, la Foire Virtuelle  est l’endroit parfait pour vous. Connectez-vous depuis chez vous et découvrez un monde virtuel dynamique et engageant qui regorge de surprises.</h4>
        </div>
      </div>

      <div className='container-foir'>
      <div className='des'>
          <h2>Qu’est-ce que vous trouverez à la Foire Virtuelle ?</h2>
          <h4>Parcourez les stands virtuels des exposants et découvrez une vaste sélection de produits et services de qualité à des prix avantageux. Que vous soyez à la recherche de vêtements, d’électronique, d’articles de maison, de produits alimentaires, pour la rénovation de votre maison, de votre jardin ou de bien-être, vous trouverez des offres spéciales et des réductions attractives qui sauront vous séduire. Découvrez leurs produits et services uniques, échangez avec eux et établissez des relations commerciales solides.</h4>
        </div>

        <div className='foir1' >  
          <img src={foir1} alt="foir1" />
        </div>

       
      </div>

      <div className='container-foir'> 

        <div className='foir1' >  
          <img src={foir3} alt="foir3" />
        </div>

        <div className='des'>
          <h2>Une multitude de secteurs représentés dans cette foire expo .</h2>
          <h4>Quel que soit votre domaine d’intérêt, la Foire Virtuelle  saura répondre à vos attentes. Du bâtiment aux services à la personne, en passant par l’artisanat, le tourisme, l’immobilier, la santé, l’éducation et bien plus encore, explorez une variété de secteurs représentés par des professionnels passionnés et engagés. </h4>
        </div>
      </div>
    </div>
  );
}

export default Vue;
