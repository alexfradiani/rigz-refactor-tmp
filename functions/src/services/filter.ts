export interface Descriptor {
  currentPage: number;
  resultsPerPage: number;
}

export type SortOrder = "ASC" | "DESC";

export default class Filter<T> {
  results: T[];

  constructor(originalData: T[]) {
    this.results = originalData;
  }

  sortBy(field: keyof T, sorting: SortOrder): Filter<T> {
    // TODO
    return this;
  }

  searchString(field: keyof T, value: string): Filter<T> {
    this.results = this.results.filter((item) => {
      const fieldAsString = item[field] as unknown as string;
      return fieldAsString.toLowerCase().indexOf(value) > -1;
    });

    return this;
  }

  paginate(descriptor: Descriptor): Filter<T> {
    const { resultsPerPage, currentPage } = descriptor;
    const index = resultsPerPage * currentPage;
    this.results = this.results.slice(index, index + resultsPerPage);

    return this;
  }
}
