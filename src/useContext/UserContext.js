import React, { createContext, useContext, useState } from 'react';

// creating a UserContext to manage the user and username state globally, this conext will pass the user and username state to all components.
export const UserContext = createContext({
  user: null,
  setUser: (user) => {},
  username: '',
  setUsername: (username) => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
