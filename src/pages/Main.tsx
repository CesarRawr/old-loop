import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import {selectSelectedLoan} from '@loan/slices';
import {useAppSelector, useAppDispatch} from '@app/hooks';

import {
  CreateLoanForm, 
  ActiveLoansList,
  ModifyLoanForm
} from '@loan/index';

import {decodeToken} from '@utils/index';

export function Main() {
  const navigate = useNavigate();
  const loan = useAppSelector(selectSelectedLoan);

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
