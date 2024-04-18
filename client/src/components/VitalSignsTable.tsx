import React, { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { VitalSignsCRUD } from '../services'; // Assuming you have a service for Vital Signs

interface VitalSignsTableProps {
 fetchData: () => Promise<any>;
 defineColumns: () => any[];
//  setIsEditModalOpen: (isOpen: boolean) => void;
//  patientId: number;
//  onEditClick: (id: number) => void;
//  refreshTable: boolean;
//  setRefreshTable: (value: boolean) => void;
}

type VitalSign = {
  PatientID: number;
  VitalSignID: number;
  DateTime: string;
  Temperature: number;
  PulseRate: number;
  BloodPressure: string;
  PainScale: number;
  OxygenSaturation: number;
}

const VitalSignsTable: React.FC<VitalSignsTableProps> = ({ fetchData, defineColumns }) => {
  const [data, setData] = useState<any[]>([]);
  const [refreshTable, setRefreshTable] = useState<boolean>(false);

  useEffect(() => {
    fetchData().then((fetchedData) => {
      console.log('VitalSignsTable useEffect fetchedData: ', fetchedData);
      const formattedData: VitalSign[] = fetchedData.map((vitalsign: any) => ({
        PatientID: vitalsign.PatientID,
        VitalSignID: vitalsign.VitalSignID,
        DateTime: vitalsign.DateTime,
        Temperature: vitalsign.Temperature,
        BloodPressure: vitalsign.BloodPressure,
        PulseRate: vitalsign.PulseRate,
        OxygenSaturation: vitalsign.OxygenSaturation,
        PainScale: vitalsign.PainScale,
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
          color="orange"
          onClick={() => {}}
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={async () => {
            const rowId = data[row.index].VitalSignID;
            try {
              await VitalSignsCRUD.deleteVitalSigns(rowId); // Assuming you have a delete method
              setRefreshTable(!refreshTable);
            } catch (error) {
              console.error('Failed to delete Vital Signs:', error);
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

export default VitalSignsTable;