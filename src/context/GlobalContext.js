import React from 'react';

export default React.createContext({
    user : null,
    setUser : (value) => {},
    userId : null,
    setUserId : (value) => {},
    userPanier : null,
    setUserPanier : value => {},
})