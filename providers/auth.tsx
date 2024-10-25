'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { refreshToken } from '@/lib/auth';

type AuthContextType = {
  status: AuthStatus;
  session: Session | undefined;
  registerSession: (status: Session) => void;
  unregisterSession: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  status: 'loading',
  session: undefined,
  registerSession: () => null,
  unregisterSession: () => null,
});

export default function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [session, setSession] = useState<Session | undefined>(undefined);

  function registerSession(session: Session) {
    setSession(session);
    setStatus('authenticated');
  }

  function unregisterSession() {
    setSession(undefined);
    setStatus('unauthenticated');
  }

  useEffect(() => {
    refreshToken()
      .then((session) => registerSession(session))
      .catch(() => unregisterSession());
  }, []);

  return (
    <AuthContext.Provider value={{ status, session, registerSession, unregisterSession }}>
      {children}
    </AuthContext.Provider>
  );
}
