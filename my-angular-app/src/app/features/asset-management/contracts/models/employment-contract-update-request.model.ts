export interface EmploymentContractUpdateRequest {

  employeeId: number;

  contractNumber: string;

  contractType: string;

  startDate: string;

  endDate: string | null;

  weeklyHours: number;

  salary: number;

}