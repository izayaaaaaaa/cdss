import { useEffect, useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { DoctorsCRUD } from '../services';

type Person = {
  name: string;
  age: number;
  gender: string;
  phoneNumber: string;
  emailAddress: string;
};

const TableComponent = () => {
  const [data, setData] = useState<Person[]>([]); //data can be fetched from an API, etc.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctors = await DoctorsCRUD.getAllDoctors();
        console.log('response: ', doctors);

        const formattedData: Person[] = doctors.map((doctor: any) => ({
          name: doctor.Name,
          age: doctor.Age,
          gender: doctor.Gender,
          phoneNumber: doctor.PhoneNumber,
          emailAddress: doctor.EmailAddress,
        }));
        console.log('formattedData: ', formattedData);
        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };

    fetchData();
 }, []);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'gender', 
        header: 'Gender',
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
      },
      {
        accessorKey: 'emailAddress',
        header: 'Email Address',
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MantineReactTable table={table} />;
};

export default TableComponent;