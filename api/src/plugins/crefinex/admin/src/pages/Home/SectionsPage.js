import React from "react";

import { BaseHeaderLayout, ContentLayout, Button } from "@strapi/design-system";
import { SectionTable, CustomAlert, CustomLoader } from "../../components";

import { Plus } from "@strapi/icons";
import { usePagination } from "../../utils";
import { useModal } from "../../utils/contexts/ModalContext";

//Queries
import { useQuery } from "@tanstack/react-query";
import { querySections } from "../../graphql/queries/section.queries";
import { query } from "../../graphql/client/GraphQLCLient";
import { QUERY_KEYS } from "../../constants/queryKeys.constants";
function SectionsPage() {
  const { currentPage, rowsPerPage } = usePagination();
  const { setShowModal } = useModal();

  const { data, isLoading, error } = useQuery([QUERY_KEYS.sections, currentPage, rowsPerPage], () =>
    query(querySections, {
      start: currentPage,
      limit: rowsPerPage,
    })
  );
  const { sections } = isLoading ? {} : data;

  if (error) return <CustomAlert data={{ type: "error", message: error.name }} />;

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <BaseHeaderLayout
            title="Sections"
            subtitle="Add sections for app worlds here"
            as="h2"
            primaryAction={
              <Button startIcon={<Plus />} onClick={() => setShowModal(true)}>
                Add a section
              </Button>
            }
          />
          <ContentLayout>
            <SectionTable data={sections.data} paginationData={sections.meta.pagination} />
          </ContentLayout>
        </>
      )}
    </>
  );
}

export default SectionsPage;
