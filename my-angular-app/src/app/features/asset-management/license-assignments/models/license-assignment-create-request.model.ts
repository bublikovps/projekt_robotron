export interface LicenseAssignmentCreateRequest {

  employeeId: number;

  licenseId: number;

  assignedByUserId: number;

  expirationDate: string | null;

  notes: string;

}