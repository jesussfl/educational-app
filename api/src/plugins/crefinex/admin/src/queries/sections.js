import { gql } from "@apollo/client";

export function getSections(start, limit) {
  return gql`
    query {
      sections(start: ${start}, limit: ${limit}) {
        data {
          id
          attributes{
            description
            order
            createdAt
            updatedAt
            publishedAt
            lessons{
                data{
                    id
                    attributes{
                      description
                      order
                    }
                }
            }
            world{
                data{
                    id
                    attributes{
                        name
                    }
                }
            }
          }
        }
        meta{
          pagination{
            total
            pageCount
          }
        }    
            
        }
    }
    
  `;
}
