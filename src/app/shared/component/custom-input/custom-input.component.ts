import { Component, input,OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  @Input() control!:FormControl;
  @Input() type!:String;
  @Input() label!:String;
  @Input() autocomplete!:String;
  @Input() icon!:String;

  isPassword!: boolean;
  hide:boolean=true;
  constructor() { }

  ngOnInit() {}

   showOrHidePassword(){
    this.hide= !this.hide;
  
    if (this.hide) this.type='password';
    else this.type='text';
   }
}
