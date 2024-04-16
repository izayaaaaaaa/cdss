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
import { Image, Text } from '@chakra-ui/react';

interface TableFactoryProps {
  fetchData: () => Promise<any>;
  defineColumns: () => MRT_ColumnDef<any>[];
  setIsADPIEModalOpen: (isOpen: boolean) => void;
  setIsVitalSignsModalOpen: (isOpen: boolean) => void;
  setIsEditModalOpen: (isOpen: boolean) => void;
  patientId: number;
  onEditClick: (id: number) => void;
  refreshTable: boolean;
  setRefreshTable: (value: boolean) => void;
}

type Person = {
  id: number;
  name: string;
  age: number;
  gender: string;
  phoneNumber: string;
  emailAddress: string;
  chiefComplaint: string | null;
  medicalHistory: string | null;
  outpatientAdmissionStatus: string | null;
  dateAdmitted: string | null;
  assignedRoomNumber: string | null;
  bedNumber: string | null;
  physicianName: string | null;
  nurseName: string | null;
  nurseNotes: string | null;
  physicianId: number | null;
  nurseId: number | null;
  flowChart: string | null;
};

const PatientsTable: React.FC<TableFactoryProps> = ({ refreshTable, setRefreshTable, fetchData, defineColumns, setIsADPIEModalOpen, setIsVitalSignsModalOpen, setIsEditModalOpen, patientId, onEditClick }) => {
  const [data, setData] = useState<any[]>([]);

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
        chiefComplaint: person.ChiefComplaint ? person.ChiefComplaint : null,
        medicalHistory: person.MedicalHistory ? person.MedicalHistory : null,
        outpatientAdmissionStatus: person.OutpatientAdmissionStatus ? person.OutpatientAdmissionStatus : null,
        dateAdmitted: person.Date_Admitted ? person.Date_Admitted : null,
        assignedRoomNumber: person.AssignedRoomNumber ? person.AssignedRoomNumber : null,
        bedNumber: person.BedNumber ? person.BedNumber : null,
        physicianName: person.physicianName ? person.physicianName.Name : null,
        nurseName: person.nurseName ? person.nurseName.Name : null,
        physicianId: person.PhysicianInCharge,
        nurseId: person.NurseProfileID,
        nurseNotes: person.NurseNotes ? person.NurseNotes : null,
        flowChart: person.FlowChart ? person.FlowChart : null,
      }));
      console.log('useEffect formattedData: ', formattedData);
      
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
      // grouping: 
    },
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    // onEditingRowSave: handleSaveRow,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <ActionIcon
          color="orange"
          onClick={async () => {
            // console.log('edit icon clicked');
            setIsEditModalOpen(true);
            onEditClick(data[row.index].id);
            // console.log('rowProfileID: ', data[row.index].id);
          }}
        >
        <IconEdit />
      </ActionIcon>
        <ActionIcon
          color="red"
          onClick={async () => {
            const rowProfileID = data[row.index].id;
            console.log('Patients Table Delete rowProfileID: ', rowProfileID);
            try {
              await PatientsCRUD.deletePatient(rowProfileID);
              console.log('Patient deleted successfully');
              setRefreshTable(!refreshTable);
            } catch (error) {
              console.error('Failed to delete patient:', error);
            }
          }}
        >
          <IconTrash />
        </ActionIcon>
        <ActionIcon
          onClick={() => {
            console.log('onclick vital signs running');
            setIsADPIEModalOpen(true);
          }}
        >
          <Image src={flipChartIcon} alt="Vital Signs" />
        </ActionIcon>
        <ActionIcon
          onClick={() => {
            console.log('onclick adpie running');
            setIsVitalSignsModalOpen(true);
          }}
        >
          <Image src={heartMonitorIcon} alt="ADPIE" />
        </ActionIcon>
      </Box>
    ),
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: 'grid',
          margin: 'auto',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
        }}
      >
        <Text><strong>PatientID:</strong> {row.original.id}</Text>
        <Text>Chief Complaint: {row.original.chiefComplaint}</Text>
        <Text>Medical History: {row.original.medicalHistory}</Text>
        <Text>Outpatient Admission Status: {row.original.outpatientAdmissionStatus}</Text>
        <Text>Date Admitted: {row.original.dateAdmitted}</Text>
        <Text>Assigned Room Number: {row.original.assignedRoomNumber}</Text>
        <Text>Bed Number: {row.original.bedNumber}</Text>
        <Text>Nurse Notes: {row.original.nurseNotes}</Text>
        <Text>Flow Chart: {row.original.flowChart}</Text>
      </Box>
    ),
  });
  
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <MantineReactTable table={table} />;
    </Box>
  );
};

export default PatientsTable;