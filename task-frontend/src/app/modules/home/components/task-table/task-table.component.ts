import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ManageTasksService } from '../../services/apis/manage-tasks.service';
import { Task } from '../../utils/interfaces';
import { DialogType, Status } from '../../utils/enums';
import { CreateTaskDialogComponent } from '../manage-task-dialog/manage-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/_shared/notifications/notifications.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent {
  @Input() set data(tasks: Task[]) {
    this.tasks = tasks;
  }

  readonly dialogType = DialogType;
  tableColumns: string[] = ['title', 'status', 'action'];
  tasks: Task[] = [];

  @ViewChild(MatTable) table: MatTable<Task> | undefined;

  constructor(
    protected manageTasksService: ManageTasksService,
    protected notificationsService: NotificationsService,
    public dialog: MatDialog,
  ) {}

  getTasks(): void {
    this.manageTasksService.get().subscribe((response) => {
      this.tasks = response?.data;
    });
  }

  openDialog(type: DialogType, selectedTask: Task): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {
        type,
        id: selectedTask.id,
        title: selectedTask.title,
        status: selectedTask.status,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('TaskTableComponent:openDialog():closed:result:', result);

      if (result) {
        switch (type) {
          case DialogType.Delete:
            this.manageTasksService.delete(result.id).subscribe(
              () => {
                this.notificationsService.openSnackbar(
                  'Task deleted successfully!',
                );
                this.getTasks();
              },
              (_error) => {
                this.notificationsService.openSnackbar(
                  "Task couldn't be deleted!",
                );
              },
            );
            break;

          case DialogType.Edit:
            this.manageTasksService.edit(result).subscribe(
              () => {
                this.notificationsService.openSnackbar(
                  'Task edited successfully!',
                );
                this.getTasks();
              },
              (_error) => {
                this.notificationsService.openSnackbar(
                  "Task couldn't be edited!",
                );
              },
            );
            break;

          default:
            break;
        }
      }
    });
  }

  changeStatus(task: Task, event: any): void {
    if (event.isUserInput) {
      task.status = this.toggleStatus(task.status);
      this.manageTasksService.edit(task).subscribe({
        error: () => {
          this.notificationsService.openSnackbar("Task couldn't be edited!");
          task.status = this.toggleStatus(task.status);
        },
      });
    }
  }

  toggleStatus(status: Status): Status {
    return status == Status.Completed ? Status.Incomplete : Status.Completed;
  }

  isDeleted(status: Status): boolean {
    return status == Status.Deleted;
  }
}
