// Create a new file named UserContext.js
import React from 'react';

const UserContext = React.createContext({
    username: '',
    setUsername: () => { },
    authChecked: false,
    setAuthChecked: () => { }
});


export default UserContext;
