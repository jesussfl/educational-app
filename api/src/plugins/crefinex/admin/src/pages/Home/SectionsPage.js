import React from "react";

import { BaseHeaderLayout, ContentLayout, Button } from "@strapi/design-system";
import { SectionTable, CustomAlert, CustomLoader } from "../../components";

import { Plus } from "@strapi/icons";
import { usePagination } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "../../utils/contexts/ModalContext";
import { useGraphQL } from "../../utils/contexts/GraphqlContext";
import { getSections } from "../../queries/sections";
import actionsAPI from "../../api/module/services/moduleServices";

function SectionsPage() {
  const { currentPage, rowsPerPage } = usePagination();
  const { setShowModal } = useModal();
  const { graphQLClient } = useGraphQL();

  const { data, isLoading, error } = useQuery(["sections", currentPage, rowsPerPage], () =>
    graphQLClient.request(getSections(currentPage, rowsPerPage))
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
            <SectionTable data={sections.data} paginationData={sections.meta.pagination} actions={actionsAPI} />
          </ContentLayout>
        </>
      )}
    </>
  );
}

export default SectionsPage;
