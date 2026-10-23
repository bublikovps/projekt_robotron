package com.robotron.server.mapper;

import com.robotron.server.dto.contract.EmploymentContractResponse;
import com.robotron.server.model.EmploymentContract;

public class EmploymentContractMapper {

    private EmploymentContractMapper() {
    }

    public static EmploymentContractResponse toResponse(
            EmploymentContract contract) {

        return new EmploymentContractResponse(

                contract.getId(),

                contract.getEmployee().getId(),

                contract.getEmployee().getEmployeeNumber(),

                contract.getEmployee().getFirstName()
                        + " "
                        + contract.getEmployee().getLastName(),

                contract.getContractNumber(),

                contract.getContractType(),

                contract.getStartDate(),

                contract.getEndDate(),

                contract.getWeeklyHours(),

                contract.getSalary(),

                contract.isActive()
        );
    }

}