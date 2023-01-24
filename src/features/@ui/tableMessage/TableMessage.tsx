import React, {useEffect, useState} from 'react';
import InputLoading from '../inputLoading/InputLoading';

// Mensaje en la tabla, para esto el tbody debe tener display flex
export default function TableMessage(props: LoadingTableBodyProps) {
  return (
    <tr 
      className="f-center" 
      style={{
        flexGrow: 1
      }}>
      <th>
        {
          props.msg
        }
      </th>
    </tr>
  );
}

interface LoadingTableBodyProps {
  msg: string;
}
