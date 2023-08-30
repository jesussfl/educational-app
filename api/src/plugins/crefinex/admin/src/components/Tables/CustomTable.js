import React from "react";
import { Flex, Table, TFooter } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { usePagination } from "../../utils/hooks/usePagination";
import { TableFilters, TablePagination, EmptyState } from "..";
import { useModal } from "../../utils/contexts/ModalContext";

export default function CustomTable({ renderCreateModal, renderDeleteDialog, renderEditModal, children, config }) {
  const { setShowModal } = useModal();
  const { currentPage, rowsPerPage, history } = usePagination();
  const isDataEmpty = config.isDataEmpty;
  if (isDataEmpty) return <EmptyState showModal={setShowModal} renderActionModal={config.createModal} message={config.emptyStateMessage} />;
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
        totalPageCount={config.paginationData?.pageCount || 1}
      />

      {renderDeleteDialog()}
      {renderEditModal()}
      {renderCreateModal()}
    </Flex>
  );
}
