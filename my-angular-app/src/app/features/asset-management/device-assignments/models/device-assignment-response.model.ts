export interface DeviceAssignmentResponse {

  id: number;

  deviceId: number;

  inventoryNumber: string;

  employeeId: number;

  employeeName: string;

  assignedByUserId: number;

  assignedByLogin: string;

  assignedDate: string;

  expectedReturnDate: string | null;

  returnedDate: string | null;

  status: string;

  notes: string | null;

}