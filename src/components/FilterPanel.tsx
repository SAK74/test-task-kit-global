import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFilterCtx } from "./FilterProvider";

export const filters = ["author", "content"] as const;

export const FilterPanel = () => {
  const {
    setFilterByAuthor,
    setFilterByContent,
    setAuthorValue,
    setContentValue,
    authorValue,
    contentValue,
    filterByAuthor,
    filterByContent,
  } = useFilterCtx();

  //   const [author, setAuthor] = useState("");
  //   const [content, setContent] = useState("");

  //   const [byAuthor, setByAuthor] = useState<CheckedState>(false);
  //   const [byContent, setByContent] = useState<CheckedState>(false);

  return (
    <div className="px-6">
      <p className="mb-4 space-x-6">
        <span className="font-bold">Filter by:</span>{" "}
      </p>
      <div className="space-y-2">
        {filters.map((val, ind) => (
          <div key={ind} className="flex gap-2 items-center">
            <Label className="" htmlFor={val}>
              <span className="capitalize">{val}</span>
            </Label>
            <Input
              className=""
              value={val === "author" ? authorValue ?? "" : contentValue ?? ""}
              onChange={({ target: { value } }) => {
                const fn = val === "author" ? setAuthorValue : setContentValue;
                fn(value);
              }}
            />
            <Checkbox
              id={val}
              checked={val === "author" ? filterByAuthor : filterByContent}
              onCheckedChange={(checked: boolean) => {
                const fn =
                  val === "author" ? setFilterByAuthor : setFilterByContent;
                fn(checked);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
