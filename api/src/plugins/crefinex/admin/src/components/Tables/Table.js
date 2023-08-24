import React from "react";
import { Flex, Table, TFooter } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { usePagination } from "../../utils/hooks/usePagination";
import { TableFilters, TablePagination, } from "../../components";
import { useModal } from "../../utils/ModalContext";

export default function CustomTable({ paginationData, renderCreateModal, renderDeleteDialog, renderEditModal, children }) {
  const { setShowModal } = useModal();
  const { currentPage, rowsPerPage, history } = usePagination();
  return (
    <Flex gap={4} direction="column" alignItems="stretch">
      <TableFilters />
      <Table
        colCount={6}
        rowCount={rowsPerPage}
        footer={
          <TFooter onClick={() => setShowModal(true)} icon={<Plus />}>
            Add entry
          </TFooter>
        }
      >
        {children}
      </Table>
      <TablePagination
        history={history}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPageCount={paginationData?.pageCount || 1}
      />

      {renderDeleteDialog()}
      {renderEditModal()}
      {renderCreateModal()}

    </Flex>
  );
}
