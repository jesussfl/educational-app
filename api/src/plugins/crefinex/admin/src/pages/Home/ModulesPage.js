import React, { useState } from "react";

import { BaseHeaderLayout, ContentLayout, Button } from "@strapi/design-system";
import { ModuleTable, ModuleModal, CustomAlert, CustomLoader } from "../../components";

import { Plus } from "@strapi/icons";
import { useAlert, usePagination } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import actionsAPI from "../../api/module/services/moduleServices";
import { useModal } from "../../utils/contexts/ModalContext";
import { gql } from "@apollo/client";
import { useGraphQL } from "../../utils/contexts/GraphqlContext";

const GET_ALL_SECTIONS = gql`
  query {
    crefinexSections {
      data {
        id
        attributes {
          description
          order
          createdAt
          updatedAt
          publishedAt
          lessons {
            data {
              id
              attributes {
                description
                order
              }
            }
          }
          world {
            data {
              id
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;
function HomePage() {
  const { currentPage, rowsPerPage } = usePagination();
  const { setShowModal } = useModal();
  const { graphQLClient } = useGraphQL();

  const { data, isLoading, error } = useQuery(["modules", currentPage, rowsPerPage], () =>
    graphQLClient.request(GET_ALL_SECTIONS, {
      first: 10,
    })
  );

  if (error) return <CustomAlert data={{ type: "error", message: error.name }} />;

  const crefinexSections = data?.crefinexSections;

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <BaseHeaderLayout
            title="Modules"
            subtitle="Add modules for the app here"
            as="h2"
            primaryAction={
              <Button startIcon={<Plus />} onClick={() => setShowModal(true)}>
                Add a module
              </Button>
            }
          />
          <ContentLayout>
            <ModuleTable data={crefinexSections} actions={actionsAPI} />
          </ContentLayout>
        </>
      )}
    </>
  );
}

export default HomePage;
