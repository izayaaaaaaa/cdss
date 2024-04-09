import React, { useEffect, useMemo, useState } from 'react';
import {
 MantineReactTable,
 useMantineReactTable,
 type MRT_ColumnDef,
} from 'mantine-react-table';

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
};

const TableFactory: React.FC<TableFactoryProps> = ({ fetchData, defineColumns }) => {
 const [data, setData] = useState<any[]>([]);

 useEffect(() => {
    fetchData().then((fetchedData) => {
      // console.log('useEffect fetchedData: ', fetchedData);

      const formattedData: Person[] = fetchedData.map((person: any) => ({
        name: person.Name,
        age: person.Age,
        gender: person.Gender,
        phoneNumber: person.PhoneNumber,
        emailAddress: person.EmailAddress,
      }));
      // console.log('useEffect formattedData: ', formattedData);

      setData(formattedData);
    });
 }, [fetchData]);

 const columns = useMemo(() => defineColumns(), [defineColumns]);

 const table = useMantineReactTable({
    columns,
    data,
 });

 return <MantineReactTable table={table} />;
};

export default TableFactory;