interface CreateProductTypings {
  name: string;
  description: string;
  value: number;
  locale?: string;
}

interface UpdateProductTypings {
  id: number;
  name: string;
  description: string;
  value: number;
  locale?: string;
}

interface DeleteProductTypings {
  id: number;
  locale?: string;
}

interface ProductResponseTypings {
  id: number;
  name: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}
