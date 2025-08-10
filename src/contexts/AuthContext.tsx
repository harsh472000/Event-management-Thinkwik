import { createContext, useContext, useMemo, useState, ReactNode, useEffect } from 'react';
import { User } from '@/types/user';
import { uid } from '@/utils/id';
import LS, { load, save } from '@/utils/storage';

const hash = (s: string) => btoa(s);

type AuthCtx = {
  user: User | null;
  signup: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => load<User | null>(LS.SESSION, null));

  useEffect(() => save(LS.SESSION, user), [user]);


  const signup = async (name: string, email: string, password: string) => {
    const users = load<User[]>(LS.USERS, []);
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error('Email already registered');
    const newUser: User = { id: uid(), name, email, passwordHash: hash(password) };
    users.push(newUser);
    save(LS.USERS, users);
    setUser(newUser);
  };


  const value = useMemo(() => ({ user, signup, }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthCtx = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthCtx must be used within AuthProvider');
  return ctx;
};