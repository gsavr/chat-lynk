import { Button } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from "react";

interface GroupFormProps {
  handleSubmit: any; //(e: { preventDefault: () => void }): () => void;
  id?: string | undefined;
  name?: string | undefined;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  disabled: boolean;
  buttonName: string;
  variant?: string | undefined;
}

export const GroupForm: React.FC<GroupFormProps> = (props) => {
  const {
    handleSubmit,
    id = "",
    name = "",
    placeholder = "",
    value,
    setValue,
    disabled,
    buttonName,
    variant,
  } = props;

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="mx-auto flex items-center space-x-3"
    >
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <input
          autoFocus
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`form-1
          ${variant === "groupEdit" && "rounded bg-slate-300"}
          `}
        />
        <Button
          type="submit"
          className={`btn h-12 w-40 text-black
          ${variant === "groupEdit" && "rounded bg-slate-100"}
          `}
          disabled={disabled}
        >
          {buttonName}
        </Button>
      </div>
    </form>
  );
};
