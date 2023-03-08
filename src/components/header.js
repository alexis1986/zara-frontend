import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div className="header">
            <Link to="/">Podcasters</Link>
            {props.loading && (<p>Cargando ...</p>)}
        </div>
    );
}

export default Header;