import {Component} from "@angular/core";
import {ViewController, NavParams, ToastController} from "ionic-angular";
import {TaskService} from "../../../../services/task.service";
import {Task} from "../../../../model/Task";

@Component({
    selector: 'my-add-task',
    templateUrl: 'addTask.html'
})
export class AddTaskModal{
    event = {
        date: '2016-12-18',
        time: '12:00'
    };
    description : string = "";
    isLoading : boolean = false;

    date = new Date();
    maxDate = "2020";

    constructor(public viewCtrl: ViewController, public params: NavParams, public taskService : TaskService, private toastCtrl: ToastController){
        let timeString = "";
        console.log(this.date);
        this.maxDate = (this.date.getFullYear() + 5).toString();
        let ssTime = this.date.getHours() + 1;
        console.log(ssTime);
        if(+ssTime < 10){
            console.log(ssTime);
            timeString = "0" + ssTime;
            console.log(timeString);
        }else{
            timeString = ssTime.toString();
        }
        this.event.time = timeString + ":00:00";
        this.event.date = this.date.toISOString().substring(0,10);
        console.log(this.event);
    }

    dismiss() {
        console.log(this.date);
        this.viewCtrl.dismiss(null);
    }

    addTask(){
        if(this.description == ""){
            this.presentToast("Please enter description...");
        }else{
            this.isLoading = true;
            console.log(this.event.date + " " + this.event.time + ":00");
            console.log("2016-12-18 12:00:00");
            console.log("User: ", this.params.get('userId'));
            let obj = {
                userId : this.params.get('userId'),
                description: this.description,
                date: this.event.date + " " + this.event.time + ":00",
                isDone: 0
            };
            this.taskService.setTask(obj).subscribe(res => {
                let task = new Task(res.id, res.userId, res.description, res.date, res.isDone);
                console.log(task);
                this.isLoading = false;
                this.viewCtrl.dismiss(task);
            });
        }
    }

    cancle(){
        this.viewCtrl.dismiss(null);
    }

    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });

        toast.onDidDismiss(() => {

        });

        toast.present();
    }
}
