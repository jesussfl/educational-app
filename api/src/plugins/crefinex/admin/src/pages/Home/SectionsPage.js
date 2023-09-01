import React from "react";

import { BaseHeaderLayout, ContentLayout, Button } from "@strapi/design-system";
import { CustomAlert, CustomLoader, ModuleModal, DeleteDialog, CustomTable } from "../../components";
import { SectionRows } from "../../components/Tables/ByPages/SectionRows";
import {
  createSectionMutation as createMutation,
  updateSectionMutation as updateMutation,
  deleteSectionMutation as deleteMutation,
} from "../../graphql/mutations/section.mutations";

import { Plus } from "@strapi/icons";
import { usePagination, useModal } from "../../utils";

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
            <CustomTable
              config={{
                tableName: "sections",
                emptyStateMessage: "There are no sections yet",
                createModal: () => <ModuleModal mainAction={createMutation} />,
                editModal: () => <ModuleModal mainAction={updateMutation} />,
                deleteDialog: () => <DeleteDialog mainAction={deleteMutation} section={"sections"} />,
              }}
              data={sections.data}
              paginationData={sections.meta.pagination}
            >
              <SectionRows data={sections.data} />
            </CustomTable>
          </ContentLayout>
        </>
      )}
    </>
  );
}

export default SectionsPage;
