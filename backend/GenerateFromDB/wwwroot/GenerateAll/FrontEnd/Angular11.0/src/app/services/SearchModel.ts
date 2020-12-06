import { Pagination } from './Pagination';
import { OrderBy } from './OrderBy';
import { SearchField } from './SearchField';

export class SearchModel {

  
  public SearchFields: SearchField[] = [];
  public Pagination: Pagination;
  public OrderBys: OrderBy[] = [];


}
