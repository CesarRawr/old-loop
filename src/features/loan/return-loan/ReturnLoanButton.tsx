import { Button, CheckboxList } from "@ui/index";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  openAcceptDialog,
  getDayName,
  getDateFromISOFormat,
} from "@utils/index";
import { returnLoanAction } from "./ReturnLoanButtonActions";
import DispositivosList from "./ReturnLoanButtonComponents";

import type { MouseElementEvent, Semana } from "@models/types";
import type { ReturnLoanButtonProps } from "@models/interfaces";

export default function ReturnLoanButton(props: ReturnLoanButtonProps) {
  const dispatch = useAppDispatch();
  const deviceList = <DispositivosList dispositivos={props.dispositivos} />;

  const returnLoanHandler = ({ loanID }: ReturnLoanButtonProps) => {
    const date: Date = getDateFromISOFormat();
    const dayname: Semana = getDayName(date);
    returnLoanAction(dispatch, dayname, loanID as string);
  };

  const onClick = (e: MouseElementEvent) => {
    e.stopPropagation();
    openAcceptDialog(
      "Lista de dispositivos a devolver:",
      <CheckboxList itemList={["hola", "adios", "Hola de nuevo", "asd", "hehehe"]} />,
      returnLoanHandler,
      props
    );
  };

  return <Button text="Devolver" style={{ flexGrow: 1 }} onClick={onClick} />;
}
