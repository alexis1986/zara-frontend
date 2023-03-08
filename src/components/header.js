import React from 'react';

function Header(props) {
    return (
        <>
            {props.loading && (<p>Cargando ...</p>)}
        </>
    );
}

export default Header;