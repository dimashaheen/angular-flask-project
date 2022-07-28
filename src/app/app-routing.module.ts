import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component'
import { AddEmployeeComponent } from './components/add-employee/add-employee.component'


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-employee' },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employee', component: EmployeeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
