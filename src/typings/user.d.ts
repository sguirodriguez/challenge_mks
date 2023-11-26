interface CreateUserTypings {
  name: string;
  email: string;
  locale?: string;
}

interface UpdateUserTypings {
  id: number;
  name?: string;
  email?: string;
  locale?: string;
}

interface DeleteUserTypings {
  id: number;
  locale?: string;
}
