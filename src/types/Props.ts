type ApiParams = {
  page: number;
  pageSize: number;
  gender?: string;
  culture?: string;
};

type PaginateProps = {
  count: number;
  rowsPerPage: number[];
};
type FilterChildren = "Culture" | "Gender" | null;

type Filter = {
  name: FilterChildren;
  inputType: "TextField" | "Select" | null;
  options: string[];
};

type FilterModalProps = {
  isOpened: boolean;
  header: string | null;
  filter: Filter;
};

export { ApiParams, Filter, FilterChildren, PaginateProps, FilterModalProps };
