export interface DeviceAssignmentCreateRequest {

  deviceId: number;

  employeeId: number;

  assignedByUserId: number;

  expectedReturnDate: string | null;

  notes: string;

}