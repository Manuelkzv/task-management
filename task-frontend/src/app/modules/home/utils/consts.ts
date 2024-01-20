import { DialogType, Status } from './enums';

export const STATUS_OPTIONS = [
  { label: 'Incomplete', value: Status.Incomplete },
  { label: 'Completed', value: Status.Completed },
];

export const DIALOG_TEXTS = {
  [DialogType.Create]: {
    title: 'Create new task',
    okButtonText: 'Create',
  },
  [DialogType.Edit]: {
    title: 'Edit task',
    okButtonText: 'Edit',
  },
  [DialogType.Delete]: {
    title: 'Delete task',
    okButtonText: 'Delete',
  },
};
