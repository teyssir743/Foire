import './contact.css';

function Contact() {
  return (
    <div className="App">
      <header>
        <h1>Mon Site Web</h1>
      </header>
      <main>
        <p>Bienvenue sur mon site web !</p>
      </main>
      <footer>
        <div className="container">
          <div className="contact-info">
            <h3>Contactez-nous</h3>
            <p>Pour toute question ou information, n'hésitez pas à nous contacter :</p>
            <ul>
              <li>Email: <a href="mailto:contact@monsite.com">contact@monsite.com</a></li>
              <li>Téléphone: +1 234 567 890</li>
              <li>Adresse: 123 Rue de la Ville, Ville, Pays</li>
            </ul>
          </div>
          <div className="social-links">
            <h3>Suivez-nous</h3>
            <ul>
              <li><a href="https://www.facebook.com/monsiteweb" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com/monsiteweb" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://www.instagram.com/monsiteweb" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
