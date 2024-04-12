import React, { useEffect, useMemo, useState } from 'react';
import {
  MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
// import { DoctorsCRUD } from '../services';

interface TableFactoryProps {
  fetchData: () => Promise<any>;
  defineColumns: () => MRT_ColumnDef<any>[];
  updateEmployee: (id: number, payload: any) => Promise<any>;
  deleteEmployee: (id: number) => Promise<any>;
}

type Person = {
  id: number;
  name: string;
  age: number;
  gender: string;
  phoneNumber: string;
  emailAddress: string;
  availability: string;
};

const EmployeesTable: React.FC<TableFactoryProps> = ({ fetchData, defineColumns, updateEmployee, deleteEmployee }) => {
  const [data, setData] = useState<any[]>([]);
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  
  useEffect(() => {
    fetchData().then((fetchedData) => {
      // console.log('useEffect fetchedData: ', fetchedData);
      
      const formattedData: Person[] = fetchedData.map((person: any) => ({
        id: person.ProfileID,
        name: person.Name,
        age: person.Age,
        gender: person.Gender,
        phoneNumber: person.PhoneNumber,
        emailAddress: person.EmailAddress,
        available: person.Availability.toString(),
      }));
      // console.log('useEffect formattedData: ', formattedData);
      
      setData(formattedData);
    });
  }, [fetchData, refreshTable]);
  
  const columns = useMemo(() => defineColumns(), [defineColumns]);
  
  const handleSaveRow: MRT_TableOptions<any>['onEditingRowSave'] = async ({ values, row, table, exitEditingMode }) => {
    // validation function to be implemented

    console.log('handleSaveRow values: ', values);
    // console.log('handleSaveRow row: ', row);
    // console.log('handleSaveRow table: ', table);

    const rowProfileID = data[row.index].id;
    
    const updatedEmployeeDto = {
      name: values.name,
      age: values.age,
      gender: values.gender,
      phoneNumber: values.phoneNumber,
      emailAddress: values.emailAddress,
      availability: values.available,
    };

    console.log('handleSaveRow updatedEmployeeDto: ', updatedEmployeeDto);
    console.log('handleSaveRow updatedEmployeeID: ', rowProfileID);
    
    try {
      const updatedEmployee = await updateEmployee(rowProfileID, updatedEmployeeDto);
      console.log('Employee updated successfully:', updatedEmployee);
      exitEditingMode();
      setRefreshTable(!refreshTable);
    } catch (error) {
      console.error('Failed to update row:', error);
    }
  };
  
  const table = useMantineReactTable({
    columns,
    data,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
      <ActionIcon
        color="orange"
          onClick={() => {
            table.setEditingRow(row);
          }}
      >
        <IconEdit />
      </ActionIcon>
      <ActionIcon
        color="red"
        onClick={async () => {
          const rowProfileID = data[row.index].id;
          console.log('Delete rowProfileID:', rowProfileID);
          try {
            await deleteEmployee(rowProfileID);
            // Remove the deleted employee from the local state
            const updatedData = data.filter(item => item.id !== rowProfileID);
            setData(updatedData);
          } catch (error) {
            console.error('Failed to delete employee:', error);
            // Optionally, show an error message to the user
          }
       }}
      >
        <IconTrash />
      </ActionIcon>
      </Box>
    ),
    initialState: { pagination: { pageIndex: 0, pageSize: 7 }},
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    onEditingRowSave: handleSaveRow,
  });
  
  return <MantineReactTable table={table} />;
};

export default EmployeesTable;