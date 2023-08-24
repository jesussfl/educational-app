import React from "react";
import { Flex, Table, TFooter } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { usePagination } from "../../utils/hooks/usePagination";
import { TableFilters, TablePagination, TableHeaders, EmptyState } from "../../components";

export default function CustomTable({ data, paginationData, actions, children }) {
  const isDataEmpty = data.isEmpty || data.data.length === 0;
  const { currentPage, rowsPerPage, history } = usePagination();
console.log("paginationData", rowsPerPage);
  return (
    <Flex gap={4} direction="column" alignItems="stretch">
      <TableFilters />

      {isDataEmpty && <EmptyState message={"There are no entries yet"} showModal={actions.setShowModal} />}

      {!isDataEmpty && (
        <>
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
          <TablePagination
            history={history}
            currentPage={currentPage }
            rowsPerPage={rowsPerPage}
            totalPageCount={paginationData.pageCount}
          />
        </>
      )}
    </Flex>
  );
}
