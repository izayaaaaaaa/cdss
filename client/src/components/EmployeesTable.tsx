import React, { useEffect, useMemo, useState } from 'react';
import {
  MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable,
  // useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface TableFactoryProps {
  fetchData: () => Promise<any>;
  defineColumns: () => MRT_ColumnDef<any>[];
}

type Person = {
  name: string;
  age: number;
  gender: string;
  phoneNumber: string;
  emailAddress: string;
  available: string;
};

const EmployeesTable: React.FC<TableFactoryProps> = ({ fetchData, defineColumns }) => {
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    fetchData().then((fetchedData) => {
      console.log('useEffect fetchedData: ', fetchedData);
      
      const formattedData: Person[] = fetchedData.map((person: any) => ({
        name: person.Name,
        age: person.Age,
        gender: person.Gender,
        phoneNumber: person.PhoneNumber,
        emailAddress: person.EmailAddress,
        available: person.Availability.toString(),
      }));
      console.log('useEffect formattedData: ', formattedData);
      
      setData(formattedData);
    });
  }, [fetchData]);
  
  const columns = useMemo(() => defineColumns(), [defineColumns]);
  
  const handleSaveRow: MRT_TableOptions<any>['onEditingRowSave'] = async ({
    table,
    row,
    values,
  }) => {
    const updatedData = [...data];
    updatedData[row.index] = values;
    setData(updatedData);
    table.setEditingRow(null);
    // api call to update the row in the database
  }
  
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
          onClick={() => {
            data.splice(row.index, 1); //assuming simple data table
            setData([...data]);
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
  });
  
  return <MantineReactTable table={table} />;
};

export default EmployeesTable;