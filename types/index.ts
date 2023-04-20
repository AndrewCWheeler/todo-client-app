export interface UserType {
  user: {
    id: string | null | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
    avatar: string | null | undefined;
  };
}

export interface ToDoType {
  todo: {
    id: string | null | undefined;
    content: string | null | undefined;
    isCompleted: boolean;
    createdAt: string | null;
    taskList: ProjectType['project']['id'] | null;
  };
}

export interface ProjectType {
  project: {
    id: string | null | undefined;
    createdAt: string | null | undefined;
    title: string | null | undefined;
    progress: number;
    users: UserType['user'][];
    todos: ToDoType['todo'][];
  };
  status: string;
}

export interface ProjectInitialStateType {
  projects: ProjectType['project'][];
  status: string;
}

export const ProjectInitialState: ProjectInitialStateType = {
  projects: [],
  status: 'idle',
};
