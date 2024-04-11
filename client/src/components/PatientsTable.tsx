import React, { useEffect, useMemo, useState } from 'react';
import {
  MRT_TableOptions,
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PatientsCRUD } from '../services';
import heartMonitorIcon from '../assets/images/icons8-heart-monitor-80.png';
import flipChartIcon from '../assets/images/icons8-flip-chart-100.png';
import { Image } from '@chakra-ui/react';

interface TableFactoryProps {
  fetchData: () => Promise<any>;
  defineColumns: () => MRT_ColumnDef<any>[];
  setIsADPIEModalOpen: (isOpen: boolean) => void;
  setIsVitalSignsModalOpen: (isOpen: boolean) => void;
}

type Person = {
  name: string;
  age: number;
  gender: string;
  phoneNumber: string;
  emailAddress: string;
  physicianName: string | null;
  nurseName: string | null;
};

const PatientsTable: React.FC<TableFactoryProps> = ({ fetchData, defineColumns, setIsADPIEModalOpen, setIsVitalSignsModalOpen }) => {
  const [data, setData] = useState<any[]>([]);
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  
  useEffect(() => {
    fetchData().then((fetchedData) => {
      console.log('useEffect fetchedData: ', fetchedData);
      
      const formattedData: Person[] = fetchedData.map((person: any) => ({
        id: person.ProfileID,
        name: person.Name,
        age: person.Age,
        gender: person.Gender,
        phoneNumber: person.PhoneNumber,
        emailAddress: person.EmailAddress,
        physicianName: person.physicianName ? person.physicianName.Name : null,
        nurseName: person.nurseName ? person.nurseName.Name : null,
      }));
      console.log('useEffect formattedData: ', formattedData);
      
      setData(formattedData);
    });
  }, [fetchData, refreshTable]);
  
  const columns = useMemo(() => defineColumns(), [defineColumns]);
  
  const handleSaveRow: MRT_TableOptions<any>['onEditingRowSave'] = async ({ values, row, table, exitEditingMode }) => {
    try {
      const rowProfileID = data[row.index].id;
      console.log('handleSaveRow rowProfileID: ', rowProfileID);

      // const updatedData = [...data];
      // updatedData[row.index] = values;

      const updatedData = {
        // Name: values.name,
        // Age: values.age,

      }

      // setData(updatedData);
      // table.setEditingRow(null);
      
      // api call to update the row in the database
      const updatedPatient = await PatientsCRUD.updatePatient(rowProfileID, updatedData);
      console.log('handleSaveRow updatedPatient: ', updatedPatient);
      exitEditingMode();
      setRefreshTable(!refreshTable);
    } catch (error) {
      console.error('Failed to update row:', error);
    }
  }
  
  const table = useMantineReactTable({
    columns,
    data,
    enableGrouping: true,
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

            data.splice(row.index, 1);
            setData([...data]);
          }}
        >
          <IconTrash />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={() => {
            console.log('onclick vital signs running');
            setIsADPIEModalOpen(true);
          }}
        >
          <Image src={heartMonitorIcon} alt="Vital Signs" />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={() => {
            console.log('onclick adpie running');
            setIsVitalSignsModalOpen(true);
          }}
        >
          <Image src={flipChartIcon} alt="ADPIE" />
        </ActionIcon>
      </Box>
    ),
    initialState: { 
      pagination: { pageIndex: 0, pageSize: 8 },
      // grouping: 
    },
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    onEditingRowSave: handleSaveRow,
  });
  
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <MantineReactTable table={table} />;
    </Box>
  );
};

export default PatientsTable;