'use client';

import React from 'react';
import { Table } from './Table';
import * as SubframeCore from "@subframe/core";

interface ClientTableProps {
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ClientTable({ header, children, className }: ClientTableProps) {
  return (
    <Table header={header} className={className}>
      {children}
    </Table>
  );
}

// Export separate components for Table subcomponents
export function ClientTableRow(props: React.ComponentProps<typeof Table.Row>) {
  return <Table.Row {...props} />;
}

export function ClientTableCell(props: React.ComponentProps<typeof Table.Cell>) {
  return <Table.Cell {...props} />;
}

export function ClientTableHeaderRow(props: React.ComponentProps<typeof Table.HeaderRow>) {
  return <Table.HeaderRow {...props} />;
}

export function ClientTableHeaderCell(props: React.ComponentProps<typeof Table.HeaderCell>) {
  return <Table.HeaderCell {...props} />;
}

// Add these properties for backward compatibility
ClientTable.Row = ClientTableRow;
ClientTable.Cell = ClientTableCell;
ClientTable.HeaderRow = ClientTableHeaderRow;
ClientTable.HeaderCell = ClientTableHeaderCell; 