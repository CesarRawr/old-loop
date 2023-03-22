import {Button} from '@ui/index';
import {useAppDispatch} from '@app/hooks';
import {openAcceptDialog} from '@utils/index';
import type {MouseElementEvent} from '@models/types';
import type {ReturnLoanButtonProps} from '@models/interfaces';
import {returnLoanAction} from './ReturnLoanButtonActions';
import DispositivosList from './ReturnLoanButtonComponents';

export default function ReturnLoanButton(props: ReturnLoanButtonProps) {
  const dispatch = useAppDispatch();
  const deviceList = (<DispositivosList dispositivos={props.dispositivos} />);

  const returnLoanHandler = ({loanID}: ReturnLoanButtonProps) => {
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
