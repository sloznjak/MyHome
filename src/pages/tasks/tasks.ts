import { Component } from '@angular/core';
import {NavController, ModalController, ToastController} from 'ionic-angular';
import {AddTaskModal} from "../shared/modal/addTask/addTask";
import {AuthService} from "../../services/auth.service";
import {TaskService} from "../../services/task.service";
import {Task} from "../../model/Task";

/*
 Generated class for the Tasks page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-tasks',
    templateUrl: 'tasks.html'
})
export class TasksPage {
    isLoading : boolean = false;
    tasks: Task[] = [];
    tasksDates: any[] = [];

    constructor(public navCtrl: NavController, private modalCtrl: ModalController, private authService: AuthService, private taskService: TaskService, private toastCtrl: ToastController) {
        this.loadTasks();
    }

    ionViewDidLoad() {
        console.log('Hello TasksPage Page');
    }

    loadTasks(){
        this.isLoading = true;
        this.tasks = [];
        this.taskService.getTaskForUserOrderByDate(this.authService.loggedInUser.id).subscribe(tasksObj => {
            console.log(tasksObj);

            tasksObj.forEach(taskObj => {
                let newTask = this.taskService.parseObjToTask(taskObj);
                this.tasks.push(newTask);
            });
        }, err => {
            console.log(err);
        }, () => {
            this.countDistinctDates();

            this.isLoading = false;
        });
    }

    presentToast(text, position) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: position
        });

        toast.onDidDismiss(() => {

        });

        toast.present();
    }

    countDistinctDates(){
        this.tasksDates = [];
        this.tasks.forEach(task => {
            let exists = false;
            let tDate = task.date.toISOString().substring(0, 10);
            console.log(tDate.substring(8,10) + " " + tDate.substring(5,7) + " " + tDate.substring(0,4));
            this.tasksDates.forEach(taskDate => {
               if(taskDate.date == tDate){
                   exists = true;
               }
            });
            if(!exists){
                this.tasksDates.push({date:tDate, display: task.date});
            }
        });

        console.log(this.tasksDates);
    }

    addTask(){
        let addTaskModal = this.modalCtrl.create(AddTaskModal, {userId: this.authService.loggedInUser.id});
        addTaskModal.onDidDismiss(task => {
            if(task){
                this.taskService.tasksChanged.emit(this.tasks);
                this.loadTasks();
            }
        });
        addTaskModal.present();
    }

    updateTask(task){
        task.isDone = 1;
        this.taskService.updateTask(task).subscribe(() => {
        }, err => console.log(err), () => {
            this.taskService.tasksChanged.emit(this.tasks);
            this.presentToast("Task \"" + task.description + "\" is finished!", "bottom");
            this.tasks.splice(this.tasks.indexOf(task), 1);
            this.countDistinctDates();
        });
        console.log(task);
    }

    deleteTask(task){
        this.taskService.deleteTask(task).subscribe(() => {
        }, err => console.log(err), () => {
            this.taskService.tasksChanged.emit(this.tasks);
            this.presentToast("Task \"" + task.description + "\" is removed!", "top");
            this.tasks.splice(this.tasks.indexOf(task), 1);
            this.countDistinctDates();
        });
        console.log(task);
    }
}
