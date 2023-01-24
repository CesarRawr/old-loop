import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import {selectedLoan} from '../features/loan/slices';
import {useAppSelector, useAppDispatch} from '../app/hooks';

import {
  CreateLoanForm, 
  ActiveLoansList,
  ModifyLoanForm
} from '../features/loan';

import {decodeToken} from '../features/utils';

export function Main() {
  const navigate = useNavigate();
  const loan = useAppSelector(selectedLoan);

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
        {
          !loan ? <CreateLoanForm />: <ModifyLoanForm />
        }
        <ActiveLoansList />
      </div>
    </UserLayout>
  );
}
