import { ApiService } from './../../shared/api.service';
import { Employee } from 'src/app/shared/employee';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  EmployeeData: any = [];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'title'
  ];
  constructor(private employeeApi: ApiService) {

  }

  ngOnInit() {    
    this.employeeApi.GetEmployeess().subscribe((data) => {  
    this.EmployeeData = data;
    console.log(data)
    this.dataSource = new MatTableDataSource<Employee>(this.EmployeeData);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  });}

 
  }




