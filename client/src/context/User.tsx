import {
  createContext, useMemo, useState, useEffect,
} from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { User, UserContex, Props } from '../interfaces';

export const UserContext = createContext<UserContex>({});

function UserMemo({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/v1/user');
        setUser(data.data);
        setLoading(false);
      } catch (err) {
        setUser(null);
        setLoading(false);
      }
    };
    getUser();
  }, []);
  const memo = useMemo(() => ({
    user, setUser,
  }), [user]);
  if (loading) {
    return (
      <div className="spinner">
        <CircularProgress color="inherit" />
        {' '}
      </div>
    );
  }
  return (
    <div>
      <UserContext.Provider value={memo}>
        {children}
      </UserContext.Provider>
    </div>
  );
}

export default UserMemo;
