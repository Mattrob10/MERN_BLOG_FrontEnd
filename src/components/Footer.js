import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='footer__content'>
        <p>Created by Matthew Robinson {`@ ${date}`}</p>
        <div className='footer__icons'>
          <a
            href='https://github.com/Mattrob10'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub />
          </a>
          <a
            href='https://twitter.com/MayoCodes'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTwitter />
          </a>
          <a
            href='https://www.linkedin.com/in/matthewrobinson-web-developer/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
