import React, { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ADPIECRUD } from '../services'; // Assuming you have a service for ADPIE
import { Image } from '@chakra-ui/react';
import assessmentIcon from '../assets/images/icons8-assessment-100.png';

interface ADPIETableProps {
 fetchData: () => Promise<any>;
 defineColumns: () => any[];
//  setIsEditModalOpen: (isOpen: boolean) => void;
//  patientId: number;
//  onEditClick: (id: number) => void;
//  refreshTable: boolean;
//  setRefreshTable: (value: boolean) => void;
}

type ADPIE = {
  PatientID: number;
  Diagnosis: string;
  Planning: string;
  InterventionImplementation: string;
  Evaluation: string;
};


const ADPIETable: React.FC<ADPIETableProps> = ({ fetchData, defineColumns }) => {
  const [data, setData] = useState<any[]>([]); 
  const [refreshTable, setRefreshTable] = useState<boolean>(false);


  useEffect(() => {
    fetchData().then((fetchedData) => {
      const formattedData: ADPIE[] = fetchedData.map((adpie: any) => ({
        PatientID: adpie.PatientID,
        Diagnosis: adpie.Diagnosis,
        Planning: adpie.Planning,
        InterventionImplementation: adpie.InterventionImplementation,
        Evaluation: adpie.Evaluation,
      }));
      setData(formattedData);
    });
  }, [fetchData, refreshTable]);

 const columns = useMemo(() => defineColumns(), [defineColumns]);

 const table = useMantineReactTable({
    columns,
    data,
    enableGrouping: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    initialState: { 
      pagination: { pageIndex: 0, pageSize: 8 },
      grouping: ['PatientID'],
    },
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <ActionIcon
          color="red"
          onClick={() => {
            // setIsEditModalOpen(true);
            // onEditClick(data[row.index].id);
          }}
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={async () => {
            // const rowId = data[row.index].id;
            // try {
            //   await ADPIECRUD.deleteADPIE(rowId); // Assuming you have a delete method
            //   setRefreshTable(!refreshTable);
            // } catch (error) {
            //   console.error('Failed to delete ADPIE:', error);
            // }
          }}
        >
          <IconTrash />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={async () => {
            // const rowId = data[row.index].id;
            // try {
            //   await ADPIECRUD.deleteADPIE(rowId); // Assuming you have a delete method
            //   setRefreshTable(!refreshTable);
            // } catch (error) {
            //   console.error('Failed to delete ADPIE:', error);
            // }
          }}
        >
          <Image src={assessmentIcon} alt="Assessments" />
        </ActionIcon>
      </Box>
    ),
 });

 return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <MantineReactTable table={table} />
    </Box>
 );
};

export default ADPIETable;