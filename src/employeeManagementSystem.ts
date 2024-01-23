class PayrollService {
    readonly employeeService = new EmployeeService();
    readonly salaryService = new SalaryService();

    public calculatePayroll(): number {
        // Simulation to calculate payroll for all employees
        let totalPayroll = 0;
        
        for (const employee of this.employeeService.getAllEmployees()) {
            totalPayroll += this.salaryService.calculateSalary(employee);
        }
        return totalPayroll;
    }
}

class ReportService {

    public generateReports(): string {
        // Simulation to generate various reports
        return "Employee reports: ...";
    }

}

class EmployeeService {
    private employees: Employee[] = [];

    constructor() { }

    public addEmployee(employee: Employee): void {
        // Real-world code to add employee to the system
        this.employees.push(employee);
    }

    public getAllEmployees(): Employee[] {
        return this.employees;
    }

    public promoteEmployee(employee: Employee): void {
        // Code to handle employee promotion logic
    }
}

class SalaryService {
    calculateSalary(employee: Employee): number {
        const newSalary = employee.getSalary() + 1;
        employee.setSalary(newSalary);
        return newSalary;
    }
}
 
class Employee {
    private name: string;
    private salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    public getSalary(): number {
        return this.salary;
    }

    public setSalary(salary: number): void {
        this.salary = salary;
    }
}
