import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import {CreateLoanForm, ActiveLoansList} from '../features/loan';

import {decodeToken} from '../features/utils';

export function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData: any = decodeToken();

    if (!userData) {
      localStorage.clear();
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <UserLayout>
      <div style={{
        height: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}>
        <CreateLoanForm />
        <ActiveLoansList />
      </div>
    </UserLayout>
  );
}
