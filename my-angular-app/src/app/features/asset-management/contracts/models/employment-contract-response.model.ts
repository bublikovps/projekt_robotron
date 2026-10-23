export interface EmploymentContractResponse {

  id: number;

  employeeId: number;

  employeeNumber: string;

  employeeName: string;

  contractNumber: string;

  contractType: string;

  startDate: string;

  endDate: string | null;

  weeklyHours: number;

  salary: number;

  active: boolean;

}