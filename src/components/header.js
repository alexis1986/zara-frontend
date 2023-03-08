import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
      }, [location]);

    return (
        <div className="header">
            <Link to="/">Podcasters</Link>
            {loading && (<p>Cargando ...</p>)}
        </div>
    );
}

export default Header;