import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './components/manage-task-dialog/manage-task-dialog.component';
import { Task } from './utils/interfaces';
import { ManageTasksService } from './services/apis/manage-tasks.service';
import { DialogType, Status } from './utils/enums';
import { NotificationsService } from 'src/app/_shared/notifications/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly status = Status;
  tasks: Task[] = [];
  newTask: Task = {
    title: '',
    status: 0,
    assignedTo: undefined,
  };
  title: string = '';

  constructor(
    protected manageTasksService: ManageTasksService,
    protected notificationsService: NotificationsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.manageTasksService.get().subscribe(
      (response) => {
        this.tasks = response?.data;
      },
      (_error) => {
        this.notificationsService.openSnackbar('Error loading tasks!');
      },
    );
  }

  filterBy(event: any): void {
    switch (event.value) {
      case Status.Completed:
        this.manageTasksService.get().subscribe((response) => {
          this.tasks = response?.data;
          this.tasks = this.tasks.filter(
            (task) => task.status == Status.Completed,
          );
        });
        break;

      case Status.Incomplete:
        this.manageTasksService.get().subscribe((response) => {
          this.tasks = response?.data;
          this.tasks = this.tasks.filter(
            (task) => task.status == Status.Incomplete,
          );
        });
        break;

      default:
        this.getTasks();
        break;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: { type: DialogType.Create, id: '', ...this.newTask },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newTask.title = result?.title;
        this.newTask.status = result?.status;

        this.manageTasksService.create(this.newTask).subscribe(
          (tasks) => {
            this.getTasks();
            this.notificationsService.openSnackbar(
              'Task created successfully!',
            );
          },
          (_error) => {
            this.notificationsService.openSnackbar(
              'Error creating successfully!',
            );
          },
        );
      }
      this.newTask.title = '';
      this.newTask.status = 0;
    });
  }
}
