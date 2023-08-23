import React from "react";
import { Flex, Table, TFooter } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { usePagination } from "../../utils/hooks/usePagination";
import { TableFilters, TablePagination, TableHeaders, EmptyState } from "../../components";

export default function CustomTable({ data, paginationData, actions, children }) {
  const { currentPage, rowsPerPage, history } = usePagination();

  return (
    <Flex gap={4} direction="column" alignItems="stretch">
      <TableFilters />

      {data.isEmpty && <EmptyState message={data.isEmpty} showModal={actions.setShowModal} />}

      {!data.isEmpty && (
        <Table
          colCount={6}
          rowCount={rowsPerPage}
          footer={
            <TFooter onClick={() => actions.setShowModal(true)} icon={<Plus />}>
              Add entry
            </TFooter>
          }
        >
          <TableHeaders data={data.data} />
          {children} {/* Load Rows */}
        </Table>
      )}

      {!data.isEmpty && <TablePagination history={history} currentPage={currentPage} rowsPerPage={rowsPerPage} totalPageCount={paginationData.pageCount} />}
    </Flex>
  );
}
