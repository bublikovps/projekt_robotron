export interface LicenseAssignmentResponse {

  id: number;

  employeeId: number;

  employeeName: string;

  licenseId: number;

  softwareName: string;

  assignedByLogin: string;

  assignedDate: string;

  expirationDate: string | null;

  revokedDate: string | null;

  status: string;

  notes: string | null;

}