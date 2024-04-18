import React, { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ADPIECRUD } from '../services'; // Assuming you have a service for ADPIE

interface ADPIETableProps {
 fetchData: () => Promise<any>;
 defineColumns: () => any[];
 setIsEditModalOpen: (isOpen: boolean) => void;
 AdpieID: number;
 onEditClick: (id: number) => void;
 refreshTable: boolean;
 setRefreshTable: (value: boolean) => void;
}

type ADPIE = {
  AdpieID: number;
  PatientID: number;
  DocumentType: string;
  Content: string;
  DateCreated: string;
  DateModified?: string;
};


const ADPIETable: React.FC<ADPIETableProps> = ({ fetchData, defineColumns, setIsEditModalOpen, AdpieID, onEditClick, refreshTable, setRefreshTable }) => {
  const [data, setData] = useState<any[]>([]); 

  useEffect(() => {
    fetchData().then((fetchedData) => {
      const formattedData: ADPIE[] = fetchedData.map((adpie: any) => ({
        AdpieID: adpie.ADPIEID,
        PatientID: adpie.PatientID,
        DocumentType: adpie.DocumentType,
        Content: adpie.Content,
        DateCreated: adpie.DateCreated,
        DateModified: adpie.DateModified,
      }));
      setData(formattedData);
      console.log('formatted adpie data: ', formattedData);
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
          color="orange"
          onClick={() => {
            setIsEditModalOpen(true);
            onEditClick(data[row.index].AdpieID);
          }}
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={async () => {
            const rowId = data[row.index].AdpieID;
            console.log('delete adpie rowId:', rowId);
            try {
              await ADPIECRUD.deleteADPIE(rowId); // Assuming you have a delete method
              setRefreshTable(!refreshTable);
            } catch (error) {
              console.error('Failed to delete ADPIE:', error);
            }
          }}
        >
          <IconTrash />
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