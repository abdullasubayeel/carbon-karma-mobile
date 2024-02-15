import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface AuthContextProps {
  auth: any;
  setAuth: Dispatch<SetStateAction<any>>;

  lng: string;
  setLng: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [auth, setAuth] = useState<any>({});
  const [lng, setLng] = useState<string>('en');

  return (
    <AuthContext.Provider value={{auth, setAuth, lng, setLng}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
