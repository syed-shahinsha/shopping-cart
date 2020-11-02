
import { FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';

export class PasswordValidator{

    
    static passwordMatch(ac:FormGroup):ValidationErrors | null {
        if(ac.controls.confirmPassword.touched || ac.controls.confirmPassword.dirty){

            const cp = ac.controls.confirmPassword.value;
            const p = ac.controls.password.value;

            if(p.length >= 8 && cp.length > 0 && cp !== p)
                ac.get('confirmPassword').setErrors({ matchError:true});           
            else  
                return null;

         }
         else{
             return null;
        }
    }
}

