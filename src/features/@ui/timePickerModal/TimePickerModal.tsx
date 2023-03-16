import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Dayjs } from 'dayjs';

import {getDayjsFormatByHour} from '../../utils';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function TimePickerModal(props: TimePickerModalProps) {
  const [initialTime] = useState(getDayjsFormatByHour());
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticTimePicker 
              ampm={props.ampm}
              defaultValue={initialTime}
              minTime={props.minTime}
              maxTime={props.maxTime}
              shouldDisableTime={props.shouldDisableTime}
              onClose={props.handleClose}
              onAccept={props.onAccept} />
          </LocalizationProvider>
        </Box>
      </Modal>
    </div>
  );
}

interface TimePickerModalProps {
  open: boolean;
  ampm: boolean;
  handleClose: () => void;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  shouldDisableTime?: (value: Dayjs, unit: string) => boolean;
  onAccept: (value: Dayjs | null) => void;
}
