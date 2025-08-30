'use client';

import { TableHeaderI } from '@/types/types';

import styles from './Table.module.scss';

import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

interface TableProps {
    data: unknown[];
    header: TableHeaderI[];
}

export const Table = ({ data, header }: TableProps) => {
    const columnHelper = createColumnHelper();

    const columns = header.map((item) => {
        return columnHelper.accessor(item.columnName, {
            header: item.tableHeader,
            size: item.size,
            cell: (info) => info.getValue(),
        });
    });

    const table = useReactTable({
        columns: columns as ColumnDef<unknown>[],
        data,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className={styles.responsiveTable}>
            <table className={styles.table}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        {...(header.column.columnDef.size && {
                                            width: header.column.columnDef.size,
                                        })}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
