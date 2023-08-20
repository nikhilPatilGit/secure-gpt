import { useState } from 'react';

interface IProps {
  onToggle: (isEnabled: boolean) => void;
}
export const Toggle = ({ onToggle }: IProps) => {
  const [isEnable, toggleIsEnable] = useState(true);
  const handleToggle = () => {
    const newState = !isEnable;
    toggleIsEnable(newState);
    onToggle(newState);
  };
  return (
    <div className="form-control">
      <label className="cursor-pointer label justify-start gap-3">
        <span className="label-text text-white">Enable Privacy</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={isEnable}
          onChange={handleToggle}
        />
      </label>
    </div>
  );
};
