
import { AbstractControl } from '@angular/forms';
export class PasswordValidator{

    static passwordMatch(ac:AbstractControl){
        if(ac.get('confirmPassword').touched || ac.get('confirmPassword').dirty){
           const cp = ac.get('confirmPassword').value;
           const p = ac.get('password').value;
           if(cp !== p){
               ac.get('confirmPassword').setErrors( { matchError:true})
           }else{
               return null;
           }
        }else{
            return null;
        }
    }
}