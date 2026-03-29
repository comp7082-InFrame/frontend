import { SnackbarOrigin } from "@mui/material";

export interface ScheduleEventDialogProps {
  openDialog: boolean;
  selectedEvent: any;        
  setOpenDialog: () => void;
  currentSchedule: any;
  setSnackbar: ({open, message, duration}: {open: boolean, message: string, duration: number}) => void
}


export interface State extends SnackbarOrigin {
  open: boolean;
}