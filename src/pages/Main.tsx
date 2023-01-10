import React from 'react';
import UserLayout from './layouts/UserLayout';
import {CreateLoanForm} from '../features/loan';

export function Main() {
  return (
    <UserLayout>
      <div style={{
        height: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}>
        <CreateLoanForm />
      </div>
    </UserLayout>
  );
}
