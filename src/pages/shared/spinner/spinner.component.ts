import {Component} from "@angular/core";

@Component({
    selector: 'my-spinner',
    template: `
        <div style=" background:rgba(0,0,0,0.8); width: 100%; text-align: center; height: 100%; position:fixed; left:0px; top:0px; z-index:99;">
            <i style="margin-top: 80%; z-index: 101; color:#79B343;" class="fa fa-spinner fa-pulse fa-4x"></i>
        </div>     
    `
})

export class SpinnerComponent{

}
