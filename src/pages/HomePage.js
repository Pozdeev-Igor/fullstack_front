import React from 'react';
import { useLocalState } from '../util/useLocalState';


const HomePage = () => {
    const jwt = useLocalState("", 'jwt');
    
    
    return (
        <div>
            <h1>Home page</h1>
            
        </div>
    );
};

export default HomePage;