import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '@core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
  ],
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  constructor(private snackBar: MatSnackBar) {

  }

  registerForm = this.fb.nonNullable.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      fullName: ['', ],
      address: ['', ],
      email: ['', ],
      phone: ['', ],
    },
  );

  handleSignUp(){
    const body = this.registerForm.value;
    console.log('body:', body);
    if (this.registerForm.valid) {

      this.loginService.signUp(body).subscribe(data => {
        this.snackBar.open('signup success', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.router.navigateByUrl('/auth/login');
        this.registerForm.reset();
      },(error)=>{
        console.log(error);
        this.snackBar.open(error.error, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar','error']
        });
      });
    }
  }

  matchValidator(source: string, target: string) {
    return (control: AbstractControl) => {
      const sourceControl = control.get(source)!;
      const targetControl = control.get(target)!;
      if (targetControl.errors && !targetControl.errors.mismatch) {
        return null;
      }
      if (sourceControl.value !== targetControl.value) {
        targetControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        targetControl.setErrors(null);
        return null;
      }
    };
  }
}
