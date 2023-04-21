import { gql } from '@apollo/client';

export const GET_PROJECT = gql`
  query getTaskList($id: ID!) {
    getTaskList(id: $id) {
      id
      title
      createdAt
      todos {
        id
        content
        isCompleted
      }
    }
  }
`;

export const MY_PROJECTS = gql`
  query myTaskLists {
    myTaskLists {
      id
      title
      createdAt
      todos {
        id
        content
        isCompleted
      }
    }
  }
`;
