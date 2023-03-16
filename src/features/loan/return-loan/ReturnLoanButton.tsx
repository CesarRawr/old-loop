import {Button} from '../../@ui';
import {openAcceptDialog} from '../../utils';
import type {MouseElementEvent} from '../../../types';
import {useAppDispatch} from '../../../app/hooks';
import type {MetaDispositivo} from '../../../datatest/models';
import DispositivosList from './ReturnLoanButtonComponents';

import {
  reloadAll,
  returnLoanAction
} from './ReturnLoanButtonActions';

export default function ReturnLoanButton(props: ReturnLoanButton) {
  const dispatch = useAppDispatch();
  const deviceList = (<DispositivosList dispositivos={props.dispositivos} />);

  const returnLoanHandler = ({loanID}: ReturnLoanButton) => {
    returnLoanAction(loanID as string, dispatch);
  }

  const onClick = (e: MouseElementEvent) => {
    e.stopPropagation();
    openAcceptDialog(
      'Lista de dispositivos a devolver:',
      deviceList,
      returnLoanHandler,
      props
    );
  }

  return (
    <Button 
      text="Devolver"
      style={{flexGrow: 1}}
      onClick={onClick} />
  );
}

interface ReturnLoanButton {
  loanID?: string;
  dispositivos: MetaDispositivo[];
}
