import React from "react";
import { Flex, Table, TFooter } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { usePagination } from "../../utils/hooks/usePagination";
import { TableFilters, TablePagination, EmptyState, TableHeaders } from "..";
import { useModal } from "../../utils/contexts/ModalContext";
export default function CustomTable({ config, data, paginationData, children }) {
  const { setShowModal, idToEdit, idToDelete, showModal } = useModal();
  const { currentPage, rowsPerPage, history } = usePagination();

  const isDataEmpty = data.length === 0;
  const showDeleteDialog = idToDelete !== null;
  const showEditModal = showModal && idToEdit;
  const showCreateModal = showModal && !idToEdit;

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
        <TableHeaders data={data} />

        {children}
      </Table>
      <TablePagination
        history={history}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPageCount={paginationData?.pageCount || 1}
      />

      {showDeleteDialog && config.deleteDialog()}
      {showEditModal && config.editModal()}
      {showCreateModal && config.createModal()}
    </Flex>
  );
}
