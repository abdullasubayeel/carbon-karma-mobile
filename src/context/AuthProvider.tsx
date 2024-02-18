import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface AuthContextProps {
  auth: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType>>;

  lng: string;
  setLng: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}
type AuthType = {
  ID: string;
  _id: string;
  email: string;
  refresh_token: string;
  role: string;
  token: string;
};
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [auth, setAuth] = useState<AuthType>({
    ID: '',
    _id: '',
    email: '',
    refresh_token: '',
    role: '',
    token: '',
  });
  const [lng, setLng] = useState<string>('en');

  return (
    <AuthContext.Provider value={{auth, setAuth, lng, setLng}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
