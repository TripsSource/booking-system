import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

const VisitorChartHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="card-header">
      <div className="d-flex align-items-center justify-content-between">
        <div className="card-header-title">
          <h4>Visitors </h4>
        </div>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Weekly</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Weekly</DropdownItem>
            <DropdownItem>Monthly</DropdownItem>
            <DropdownItem>Yearly</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default VisitorChartHeader;
