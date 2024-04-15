import React, { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Image, Text } from '@chakra-ui/react';
import assessmentIcon from '../assets/images/icons8-assessment-100.png';
import { AssessmentsCRUD } from '../services';

interface Test {
  label: string;
  value: string;
 }

interface AssessmentsTableProps {
  fetchData: () => Promise<any>;
  defineColumns: () => any[];
  setIsEditModalOpen: (isOpen: boolean) => void;
  onEditClick: (id: number) => void;
  refreshTable: boolean;
  setRefreshTable: (value: boolean) => void;
}

type Assessment = {
  AssessmentID: number;
  ADPIEID: number;
  HealthHistory: string;
  ChiefComplaint: string;
  HistoryOfPresentIllness: string;
  PastMedicalHistory: string;
  SocialHistory: string;
  NurseNotes: string;
  LaboratoryTests?: any; // Assuming this is a JSON object, adjust the type as necessary
  PhysicalExaminations?: any; // Assuming this is a JSON object, adjust the type as necessary
  DiagnosticTests?: any; // Assuming this is a JSON object, adjust the type as necessary
  ImagingStudies?: any; // Assuming this is a JSON object, adjust the type as necessary
};

const AssessmentsTable: React.FC<AssessmentsTableProps> = ({ refreshTable, setRefreshTable, fetchData, defineColumns, setIsEditModalOpen, onEditClick }) => {
  const [data, setData] = useState<any[]>([]); 
  
  useEffect(() => {
    fetchData().then((fetchedData) => {
      console.log('AssessmentsTable fetchData:', fetchedData);
      const formattedData: Assessment[] = fetchedData.map((assessment: any) => ({
        AssessmentID: assessment.AssessmentID,
        ADPIEID: assessment.ADPIEID,
        HealthHistory: assessment.HealthHistory,
        ChiefComplaint: assessment.ChiefComplaint,
        HistoryOfPresentIllness: assessment.HistoryOfPresentIllness,
        PastMedicalHistory: assessment.PastMedicalHistory,
        SocialHistory: assessment.SocialHistory,
        NurseNotes: assessment.NurseNotes,
        LaboratoryTests: assessment.LaboratoryTests,
        PhysicalExaminations: assessment.PhysicalExaminations,
        DiagnosticTests: assessment.DiagnosticTests,
        ImagingStudies: assessment.ImagingStudies,
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
      grouping: ['ADPIEID'],
    },
    mantinePaginationProps: {
      showRowsPerPage: false,
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <ActionIcon
          color="green"
          onClick={() => {
            console.log('edit icon clicked');
            setIsEditModalOpen(true);
            onEditClick(data[row.index].AssessmentID);
            console.log('rowProfileID: ', data[row.index].AssessmentID);
          }}
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={async () => {
            const rowProfileID = data[row.index].AssessmentID;
            console.log('Delete rowProfileID: ', rowProfileID);
            try {
              await AssessmentsCRUD.removeAssessment(rowProfileID);
              console.log('Assessment deleted successfully');
              setRefreshTable(!refreshTable);
            } catch (error) {
              console.error('Failed to delete assessment:', error);
            }
          }}
        >
          <IconTrash />
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
        <Text>Past Medical History: {row.original.PastMedicalHistory}</Text>
        <Text>Social History: {row.original.SocialHistory}</Text>
        <Text>Nurse Notes: {row.original.NurseNotes}</Text>
        {Array.isArray(row.original.LaboratoryTests) && row.original.LaboratoryTests.map((test: Test, index: number) => (
          <Text key={index}>
            Laboratory Test {index + 1}: <a href={test.value} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'blue' }}>{test.label}</a>
          </Text>
        ))}
        {Array.isArray(row.original.PhysicalExaminations) && row.original.PhysicalExaminations.map((test: Test, index: number) => (
          <Text key={index}>
            Physical Examination {index + 1}: <a href={test.value} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'blue' }}>{test.label}</a>
          </Text>
        ))}
        {Array.isArray(row.original.DiagnosticTests) && row.original.DiagnosticTests.map((test: Test, index: number) => (
          <Text key={index}>
            Diagnostic Test {index + 1}: <a href={test.value} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'blue' }}>{test.label}</a>
          </Text>
        ))}
        {Array.isArray(row.original.ImagingStudies) && row.original.ImagingStudies.map((test: Test, index: number) => (
          <Text key={index}>
            Imaging Study {index + 1}: <a href={test.value} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'blue' }}>{test.label}</a>
          </Text>
        ))}
      </Box>
    ),
  });
  
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
    <MantineReactTable table={table} />
    </Box>
  );
};

export default AssessmentsTable;