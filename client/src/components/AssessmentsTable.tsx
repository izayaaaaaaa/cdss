import React, { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import AssessmentsCRUD from '../services/AssessmentsCRUD';
import { Image } from '@chakra-ui/react';
import assessmentIcon from '../assets/images/icons8-assessment-100.png';

interface AssessmentsTableProps {
  fetchData: () => Promise<any>;
  defineColumns: () => any[];
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
  // LaboratoryTests?: any; // Assuming this is a JSON object, adjust the type as necessary
  // PhysicalExaminations?: any; // Assuming this is a JSON object, adjust the type as necessary
  // DiagnosticTests?: any; // Assuming this is a JSON object, adjust the type as necessary
  // ImagingStudies?: any; // Assuming this is a JSON object, adjust the type as necessary
};

const AssessmentsTable: React.FC<AssessmentsTableProps> = ({ fetchData, defineColumns }) => {
  const [data, setData] = useState<any[]>([]); 
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  
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
        // more fields here
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
      color="red"
      onClick={() => {
        // Implement edit functionality here
      }}
      >
      <IconEdit />
      </ActionIcon>
      <ActionIcon
      color="red"
      onClick={async () => {
        // Implement delete functionality here
      }}
      >
      <IconTrash />
      </ActionIcon>
      <ActionIcon
      color="red"
      onClick={async () => {
        // Implement additional action functionality here
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

export default AssessmentsTable;