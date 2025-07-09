import { readDestinationTitleType } from "@/types/store/destination";
import { Typeahead } from "react-bootstrap-typeahead";
interface MultipleSelectBoxProps {
  desitnations: readDestinationTitleType[];
  destinationSelected?: string[];
  customClass?: string;
  multiSelect: (value: any) => void;
}

const MultipleSelectBox = ({
  desitnations,
  destinationSelected,
  customClass,
  multiSelect,
}: MultipleSelectBoxProps) => {
  const seleted = desitnations.filter((item) =>
    destinationSelected?.includes(item._id)
  );
  return (
    <Typeahead
      id="multiple-typeahead"
      className={`mt-2 ${customClass}`}
      defaultSelected={seleted}
      labelKey="destinationTitle"
      multiple
      options={desitnations}
      onChange={(e) => multiSelect(e)}
      placeholder="Select Cities...."
    />
  );
};

export default MultipleSelectBox;
