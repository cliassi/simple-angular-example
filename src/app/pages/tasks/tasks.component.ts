import { Component, OnInit } from '@angular/core';
import { TaskStatus } from 'src/app/shared/enums/task-status';
import { Task } from 'src/app/shared/models/task';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.http.get('tasks').subscribe((res: any) => {
      this.tasks = res.data;
    });
  }

  closeTask(task: Task, st: number) {
    this.http
      .patch('tasks/' + task.id + '/status', {
        status: st == 0 ? TaskStatus.OPEN : TaskStatus.DONE,
      })
      .subscribe((res) => {
        this.reload();
      });
  }
}
