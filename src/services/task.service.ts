import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Task} from "../model/Task";

@Injectable()
export class TaskService {
    tasksChanged = new EventEmitter<Task[]>();

    private baseUrl : string = "http://192.168.1.31:8000/api";

    constructor(public http: Http){
    }

    setTask(task){
        let body = task;
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.baseUrl + '/tasks', body, headers)
            .map(res => res.json());
    }

    updateTask(task){
        let body = this.parseTaskToObj(task);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.put(this.baseUrl + '/task/' + task.id, body, headers)
            .map(res => res.json());
    }

    deleteTask(task){
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.delete(this.baseUrl + '/task/' + task.id, headers)
            .map(res => res.json());
    }

    getTaskForUserOrderByDate(id: number){
        return this.http.get(this.baseUrl + '/tasks/?userId=' + id + "&isDone=0&sort=date")
            .map(res => res.json());
    }

    parseObjToTask(obj): Task{
        return new Task(obj.id, obj.userId, obj.description, new Date(obj.date.toString()), obj.isDone);
    }

    parseTaskToObj(task:Task): any{
        return {
            id: task.id,
            userId: task.userId,
            description: task.description,
            date: task.date.valueOf(),
            isDone: task.isDone
        }
    }
}
