import React from "react";
import { Flex, SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { Pagination, PreviousLink, PageLink, NextLink } from "@strapi/design-system/v2";

export default function TablePagination({ history, currentPage, rowsPerPage, totalPageCount }) {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <SingleSelect
        placeholder={`Show ${rowsPerPage}`}
        onChange={(value) => {
          history.push(`?page=1&pageSize=${value}&sort=id:ASC`);
        }}
      >
        <SingleSelectOption value={10}>10</SingleSelectOption>
        <SingleSelectOption value={20}>20</SingleSelectOption>
        <SingleSelectOption value={50}>50</SingleSelectOption>
        <SingleSelectOption value={100}>100</SingleSelectOption>
      </SingleSelect>

      <Pagination activePage={currentPage} pageCount={totalPageCount}>
        {currentPage > 1 && <PreviousLink onClick={history.goBack}>Go to previous page</PreviousLink>}
        {totalPageCount > 1 && currentPage > 3 && (
          <PageLink number={1} onClick={() => history.push(`?page=${1}&pageSize=${rowsPerPage}&sort=id:ASC`)}>
            Go to page 1
          </PageLink>
        )}
        {totalPageCount > 1 && currentPage > 4 && <Dots>And 23 other links</Dots>}
        {totalPageCount > 1 && currentPage > 2 && (
          <PageLink number={currentPage - 1} onClick={() => history.push(`?page=${currentPage - 1}&pageSize=${rowsPerPage}&sort=id:ASC`)}>
            Go to page {currentPage - 1}
          </PageLink>
        )}
        <PageLink number={currentPage} onClick={() => history.push(`?page=${currentPage}&pageSize=${rowsPerPage}&sort=id:ASC`)}>
          Go to page {currentPage}
        </PageLink>
        {totalPageCount > 1 && currentPage < totalPageCount - 1 && (
          <PageLink number={currentPage + 1} onClick={() => history.push(`?page=${currentPage + 1}&pageSize=${rowsPerPage}&sort=id:ASC`)}>
            Go to page {currentPage + 1}
          </PageLink>
        )}
        {totalPageCount > 1 && currentPage < totalPageCount - 3 && <Dots>And 23 other links</Dots>}
        {totalPageCount > 1 && currentPage < totalPageCount - 2 && (
          <PageLink number={totalPageCount} onClick={() => history.push(`?page=${totalPageCount}&pageSize=${rowsPerPage}&sort=id:ASC`)}>
            Go to page {totalPageCount}
          </PageLink>
        )}
        {currentPage < totalPageCount && <NextLink onClick={() => history.push(`?page=${totalPageCount}&pageSize=${rowsPerPage}&sort=id:ASC`)}>Go to next page</NextLink>}
      </Pagination>
    </Flex>
  );
}
