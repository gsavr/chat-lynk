import { Dispatch, SetStateAction } from "react";
import { Switch } from "@headlessui/react";

interface GroupDeleteToggleProps {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}

export const GroupDeleteToggle: React.FC<GroupDeleteToggleProps> = (props) => {
  const { enabled, setEnabled } = props;
  console.log(enabled);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-red-600" : "bg-gray-400"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};
