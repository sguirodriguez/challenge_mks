interface CreateVideoTypings {
  name: string;
  url: string;
  locale?: string;
}

interface UpdateVideoTypings {
  id: number;
  name?: string;
  url?: string;
  locale?: string;
}

interface DeleteVideoTypings {
  id: number;
  locale?: string;
}
