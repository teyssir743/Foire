import '../../style/Visiteur/footer.css';

function Footer() {
  
  return (
    <div className='container-footer'>
      <footer>
        <div>
          <div>
            <h2>notre site</h2>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">contact</a>
              </li>
              <li>
                <a href="#">créer compte</a>
              </li>
              <li>
                <a href="#">connecter </a>
              </li>
            </ul>
          </div>
          <div>
            <h2>fonctionalité</h2>

            <ul>
              <li>
                <a href="#">foire</a>
              </li>
              <li>
                <a href="#">événement</a>
              </li>
              <li>
                <a href="#">stand</a>
              </li>
              <li>
                <a href="#">réservation</a>
              </li>
              <li>
                <a href="#">paiement</a>
              </li>
              

              <li>
                <a href="#">connecter exposant</a>
              </li>
            </ul>

          </div>



          <div>
            <h2>Legal</h2>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Licensing</a>
              </li>
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
          
        </div>
        <div>
          <div className='social-icons'>


            <a href="#">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
              </svg>
              <span>Facebook page</span>
            </a><br />


            <br />
          </div>

        </div>
        <div className="copyright">
          <p>© 2024 VotreNom. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
