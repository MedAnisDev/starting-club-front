import { Select, Pagination } from "antd";
import './toolbar.css';
const { Option } = Select;

const Toolbar = ({
  pageNumber,
  onPageNumberChange,
  sortedBy,
  onSortedByChange,
  columns,
}) => {
  return (
    <div className="toolbar-conatiner">
        {/* selecting sorting column */}
      
        <label 
          htmlFor="sortedBySelect" 
          className="sorted-by-label"
        >
          Sorted By:
        </label>
      <Select 
      name="selectedColumn"
      value={sortedBy} 
      onChange={onSortedByChange} 
      style={{ width: 200 }}
      >
        {columns.map((col)=> {
            return (<Option key={col.value} value={col.value}> {col.label}</Option>);
        })}
      </Select>
      {/**<Select 
      name="selectedDirection"
      value={sortDirection} 
      onChange={onSortDirectionChange} 
      style={{ width: 200 }}
      >
        <Option value="ASC">Ascending</Option>
        <Option value="DESC">Descending</Option>
      </Select> */}

      <Pagination 
        current={pageNumber}
        onChange={onPageNumberChange}
        total={50}
        pageSize={5}
        >
      </Pagination>


    </div>
  );
};

export default Toolbar;
