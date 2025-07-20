import { ArrowUpDownIcon } from "lucide-react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useSortCtx, type Sort } from "./SortProvider";

const sorts: Sort[] = ["title", "date", "author"];

export const SortPanel = () => {
  const { setSortBy, setSortDir, sortBy } = useSortCtx();
  return (
    <div className="px-6">
      <p className="mb-4 space-x-6">
        <span className="font-bold">Sort by:</span>
        <ArrowUpDownIcon
          size={15}
          className="cursor-pointer inline"
          onClick={() => {
            setSortDir((prev) => (prev === "asc" ? "dsc" : "asc"));
          }}
        />
      </p>
      <RadioGroup
        className="justify-center"
        defaultValue={sortBy}
        onValueChange={(val) => {
          setSortBy(val as Sort);
        }}
      >
        {sorts.map((val, ind) => (
          <Label key={ind} className="capitalize space-x-2">
            <RadioGroupItem value={val} />
            <span>{val}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};
