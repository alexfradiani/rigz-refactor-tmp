export type Page = {
  pageNumber: number;
  size: number;
};

export class Paginator {
  static toSQL(p: Page): string {
    return `limit ${p.pageNumber * p.size}, ${p.size}`;
  }
}

export type Filter = {
  field: string;
  value: string;
};
