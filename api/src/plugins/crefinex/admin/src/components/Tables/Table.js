import React from "react";
import { Flex, Table, TFooter } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { usePagination } from "../../utils/hooks/usePagination";
import { TableFilters, TablePagination, TableHeaders, CustomLoader } from "../../components";

export default function CustomTable({ data, paginationData, status, actions, children }) {
  const { currentPage, rowsPerPage, history } = usePagination();
  //Status
  const isLoading = status.isLoading;
  const isEmptyData = status.isDataEmpty.value;
  const emptyMessage = status.isDataEmpty.message;
  const showTable = !isLoading && !isEmptyData;
  const showEmptyState = !isLoading && isEmptyData;

  //Pagination Data
  const rowsData = isLoading ? [] : data.data;
  const total = isLoading ? 0 : paginationData?.total;
  const pageCount = isLoading ? 0 : paginationData?.pageCount;

  return (
    <Flex gap={4} direction="column" alignItems="stretch">
      <TableFilters />

      {showEmptyState && <EmptyState message={emptyMessage} showModal={actions.setShowModal} />}

      {isLoading ? (
        <CustomLoader />
      ) : (
        showTable && (
          <Table
            colCount={6}
            rowCount={rowsPerPage}
            footer={
              <TFooter onClick={() => actions.setShowModal(true)} icon={<Plus />}>
                Add entry
              </TFooter>
            }
          >
            <TableHeaders data={rowsData} />

            {/* Load rows through children */}
            {children}
          </Table>
        )
      )}

      {!isLoading && <TablePagination history={history} currentPage={currentPage} rowsPerPage={rowsPerPage} totalPageCount={pageCount} />}
    </Flex>
  );
}
