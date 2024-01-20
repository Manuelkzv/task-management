import { DialogType, Status } from './enums';

export interface Task {
  id?: string;
  title: string;
  status: Status;
  creationDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  assignedTo: string | undefined;
}

export interface DialogData {
  type: DialogType;
  id?: string;
  title?: string;
  status: Status;
  assignedTo: string | undefined;
}
