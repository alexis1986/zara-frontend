import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

function Header({showSpinner}) {
    return (
        <div className="header border-bottom">
            <Link className="podcasters-link" to="/">Podcasters</Link>
            {showSpinner && <FontAwesomeIcon icon={faArrowsSpin} className="spin"/>}
        </div>
    );
}

export default Header;