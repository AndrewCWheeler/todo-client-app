import { gql } from '@apollo/client';

export const GET_PROJECT = gql`
  query getTaskList($id: ID!) {
    getTaskList(id: $id) {
      id
      title
      createdAt
      progress
      todos {
        id
        content
        isCompleted
        taskList {
          id
        }
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
      progress
      todos {
        id
        content
        createdAt
      }
    }
  }
`;
