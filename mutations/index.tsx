import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation createToDo($content: String, $taskListId: ID!) {
    createToDo(content: $content, taskListId: $taskListId) {
      id
      content
      createdAt
      taskList {
        id
        progress
        todos {
          id
          content
          isCompleted
        }
      }
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateToDo($id: ID!, $content: String, $isCompleted: Boolean) {
    updateToDo(id: $id, content: $content, isCompleted: $isCompleted) {
      id
      createdAt
      content
      taskList {
        id
        title
        todos {
          id
          content
          isCompleted
        }
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteToDo($id: ID!) {
    deleteToDo(id: $id) {
      id
      content
    }
  }
`;
export const CREATE_TASKLIST = gql`
  mutation createTaskList($title: String!) {
    createTaskList(title: $title) {
      id
      title
      createdAt
      progress
      todos {
        id
        content
        isCompleted
      }
    }
  }
`;

export const DELETE_TASKLIST = gql`
  mutation deleteTaskList($id: ID!) {
    deleteTaskList(id: $id) {
      id
      title
    }
  }
`;
