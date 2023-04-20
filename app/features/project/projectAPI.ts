import { gql, useQuery } from '@apollo/client';

const MY_PROJECTS = gql`
  query myTaskLists {
    myTaskLists {
      id
      title
      createdAt
    }
  }
`;
export const fetchProjects = () => {
  const { data, error } = useQuery(MY_PROJECTS);
  if (data) return data;
  if (error) return error;
};
