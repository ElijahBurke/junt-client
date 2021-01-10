import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer className="Footer__footer">
      <div className="footer__inner-container">
        <div className="inner-container__text">
          <div className="text__left">
            Elijah Burke &#169;
          </div>
          <div className="text__right">
            See this project on
            {' '}
            <a href="https://github.com/ElijahBurke/junt-client">
              github
            </a>
            ;
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
