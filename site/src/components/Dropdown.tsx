import {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown } from "./icons";

interface Props extends PropsWithChildren {
  buttonContent: ReactNode;
  className: string;
}

export const DropdownButton: FC<Props> = ({
  buttonContent,
  children,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      visible && setVisible(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [visible, setVisible, menuRef]);

  return (
    <div>
      <button onClick={() => setVisible(!visible)} className={className}>
        <div className="flex items-center justify-between">
          <div>{buttonContent}</div>
          <ChevronDown width={16} height={16} />
        </div>
      </button>

      <div
        ref={menuRef}
        className={`${
          !visible ? "hidden" : ""
        } z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
      >
        {children}
      </div>
    </div>
  );
};
