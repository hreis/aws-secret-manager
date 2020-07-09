import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JobException, Job, JobResponse } from 'src/app/shared/models/Jobs';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Devs } from 'src/app/shared/models/Devs';
import { Users, User } from 'src/app/shared/models/Users';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // Need to remove view encapsulation so that the custom tooltip style defined in
  // `tooltip-custom-class-example.css` will not be scoped to this component's view.
})
export class HomeComponent implements OnInit {

  showSpinner = false;

  formGroup = new FormGroup({
    processFormControl: new FormControl('', Validators.required),
    jobFromControl: new FormControl('', Validators.required),
    devFormControl: new FormControl('', Validators.required),
    userFormControl: new FormControl('', Validators.required),
    spendMinutesFormControl: new FormControl('', Validators.required),
    stateFormControl: new FormControl('', Validators.required),
    searchFormControl: new FormControl('')
  });

  processes: JobException[];
  jobs: Job[];
  devs: Devs[];
  users: Users[];
  filteredOptions: Observable<Users[]>;
  idJob: number;

  constructor(private api: ApiService, private _snackBar: MatSnackBar, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    // if(this.authenticated) {

      this.showSpinner = true;

      this.getJobsException();

      this.getUsers();

      this.getDevs();

      // this.filteredOptions = this.formGroup.get('userFormControl').valueChanges
      //   .pipe(
      //     startWith(''),
      //     map(value => this._filter(value))
      //   );

    // }
    // else {
    //   this.router.navigate(['']);
    // }

  }

  get authenticated(): boolean {
    return this.authService.authenticated;
  }
  // The user
  get user(): User {
    return this.authService.user;
  }

  async signOut(): Promise<void> {
    this.router.navigate(['/']);
    // await this.authService.signOut();
  }

  private _filter(value: string): Users[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(option => option.NM_USUARIO.toLowerCase().includes(filterValue));
  }

  getJobsException() {

    this.api.getJobsException().subscribe((res: JobException[]) => {

      this.processes = res;

    });

  }

  getJobs() {

    this.api.getJobs().subscribe((res: Job[]) => {

      this.jobs = res;

    });

  }

  getDevs() {

    this.api.getDevs().subscribe((res: Devs[]) => {

      var sort = res.sort(this.compareDevs);
      this.devs = sort;

    });

  }

  getUsers() {

    // var res = this.api.getUsers().then(res => {

    //   console.log(res);

    //   // var sort = res.sort(this.compareUsers);

    // });


    this.api.getUsers().subscribe((res: Users[]) => {

      var sort = res.sort(this.compareUsers);
      this.users = sort;

      this.showSpinner = false;

    });

  }

  update() {

    debugger

    console.log(this.formGroup.get('spendMinutesFormControl').value + this.formGroup.get('stateFormControl').value + this.formGroup.get('jobFromControl').value)

    if (this.formGroup.get('spendMinutesFormControl').value !== ''
    && this.formGroup.get('stateFormControl').value !== ''
    && this.formGroup.get('jobFromControl').value !== ''
    && this.formGroup.get('processFormControl').value !== '') {

    let job: Job;
    let ativo;

    if(this.formGroup.get('stateFormControl').value === 0) {
      ativo = 'S';
    }
    else {
      ativo = 'N'
    }

    job = {
      id: this.idJob,
      ui: this.formGroup.get('processFormControl').value,
      name: this.formGroup.get('jobFromControl').value,
      devName: this.formGroup.get('devFormControl').value,
      usrName: this.formGroup.get('userFormControl').value,
      ativo: ativo,
      manual: this.formGroup.get('spendMinutesFormControl').value
    }


    this.api.update(job).subscribe((res: any) => {

      debugger

      console.log(res);

    });

    this.openSnackBar('Atualizado com sucesso.', 'OK', 'success-msg');
    this.clearForm();
  }
  else {
    this.openSnackBar('Não há o que atualizar.', 'OK', 'alert-msg');
  }

  }

  compareUsers( a, b ) {
    if ( a.NM_USUARIO < b.NM_USUARIO ){
      return -1;
    }
    if ( a.NM_USUARIO > b.NM_USUARIO ){
      return 1;
    }
    return 0;
  }

  compareDevs( a, b ) {
    if ( a.NM_DESENV < b.NM_DESENV ){
      return -1;
    }
    if ( a.NM_DESENV > b.NM_DESENV ){
      return 1;
    }
    return 0;
  }

  selectProcess(event: Event) {

    this.formGroup.get('jobFromControl').setValue(String(event).replace('_Production', ''));

  }

  search() {

    const job = {
      ui: this.formGroup.get('searchFormControl').value,
    }

    this.api.search(job).subscribe((res: Job[]) => {

      try {


        if (res.length <= 0) {
          this.openSnackBar('Nenhum dado encontrado.', 'OK', 'alert-msg');
        }
        else {
          res.forEach((e) => {

            this.idJob = e.id;

            if (!this.processes.find(x => x.process === e.ui)) {

              this.processes.push({
                process: e.ui
              });

            }

            this.formGroup.get('processFormControl').setValue(e.ui);
            this.formGroup.get('jobFromControl').setValue(e.name);
            this.transformState(e.ativo);
            this.formGroup.get('devFormControl').setValue(e.devName);
            this.formGroup.get('spendMinutesFormControl').setValue(e.manual);
            this.formGroup.get('userFormControl').setValue(e.usrName);

          });
        }

      } catch (error) {

        this.openSnackBar('Erro ao pesquisar.', 'OK', 'error-msg');

      }

    })

  }

  transformState(ativo: string) {

    switch (ativo) {

      case 'S':
        this.formGroup.get('stateFormControl').setValue(0);
        break;
      case 'N':
        this.formGroup.get('stateFormControl').setValue(1);
        break;
      default:
        break;

    }

  }

  insert(job: Job) {

    this.api.postJob(job).subscribe((res: JobResponse) => {

      try {
        const id = JSON.parse(String(res));
        this.openSnackBar(`Inserido com sucesso. ID: ${id}`, 'OK', 'success-msg');
        this.clearForm();

      } catch (error) {
        this.openSnackBar('Erro ao inserir.', 'OK', 'error-msg');
      }

    });

  }

  delete(id: number) {

    if (this.idJob !== undefined) {

      this.api.delete(this.idJob).subscribe((res: number) => {

        if (res > 0) {
          this.openSnackBar('Deletado com sucesso.', 'OK', 'success-msg');

          this.clearForm();
        }
        else {
          this.openSnackBar('Erro ao deletar.', 'OK', 'error-msg');
        }

      });

    }
    else {
      this.openSnackBar('Não há o que deletar.', 'OK', 'alert-msg');
    }

  }

  onFormSubmit() {

    if (this.formGroup.valid) {

      let job: Job;
      let ativo = '';

      if(this.formGroup.get('stateFormControl').value === 0) {
        ativo = 'S';
      }
      else {
        ativo = 'N'
      }

      job = {
        id: 0,
        ui: this.formGroup.get('processFormControl').value,
        name: this.formGroup.get('jobFromControl').value,
        devName: this.formGroup.get('devFormControl').value,
        usrName: this.formGroup.get('userFormControl').value,
        ativo: ativo,
        manual: this.formGroup.get('spendMinutesFormControl').value
      }

      this.insert(job);

    }
    else {
      this.openSnackBar('Preencha todos os campos necessários.', 'OK', 'alert-msg');
    }

  }

  clearForm() {

    this.formGroup.get('processFormControl').setValue('');
    this.formGroup.get('jobFromControl').setValue('');
    this.formGroup.get('devFormControl').setValue('');
    this.formGroup.get('userFormControl').setValue('');
    this.formGroup.get('spendMinutesFormControl').setValue('');
    this.formGroup.get('stateFormControl').setValue('');
    this.formGroup.reset();

    this.getJobsException();

  }

  openSnackBar(message: string, action: string, css: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: [css]
    });
  }

}
