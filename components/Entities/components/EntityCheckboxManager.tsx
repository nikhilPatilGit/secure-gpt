import React, { useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';

import CustomCheckbox from './CustomCheckbox';

type CheckboxData = {
  entityLabel: string;
  labels: Array<{ label: string; isChecked: boolean }>;
  isChecked: boolean;
  dropDown: boolean;
};

const entityDataMap = new Map([
  ['Entity1', ['Label 1', 'Label 2', 'Label 1', 'Label 2']],
  ['Entity2', ['Label 3', 'Label 4', 'Label 1', 'Label 2']],
  // ... Add more entities and labels as needed
]);

const EntityCheckboxManager = () => {
  const [pIIDropdown, togglePIIDropDown] = useState(false);
  const initialCheckboxes: CheckboxData[] = Array.from(
    entityDataMap.keys(),
  ).map((entity) => ({
    entityLabel: entity,
    labels: entityDataMap
      .get(entity)!
      .map((label) => ({ label, isChecked: true })),
    isChecked: true,
    dropDown: false,
  }));

  const [checkboxes, setCheckboxes] =
    useState<CheckboxData[]>(initialCheckboxes);

  const handleEntityCheckboxChange = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].isChecked = !newCheckboxes[index].isChecked;

    // Set all labels of the entity to be unchecked when entity checkbox is unchecked
    if (!newCheckboxes[index].isChecked) {
      newCheckboxes[index].labels.forEach((item) => {
        item.isChecked = false;
      });
    } else {
      newCheckboxes[index].labels.forEach((item) => {
        item.isChecked = true;
      });
    }

    setCheckboxes(newCheckboxes);
  };

  const handleLabelCheckboxChange = (index: number, labelIndex: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].labels[labelIndex].isChecked =
      !newCheckboxes[index].labels[labelIndex].isChecked;

    // Update entity checkbox state based on label checkboxes
    const anyUncheckedValue = newCheckboxes[index].labels.find(
      (value) => !value.isChecked,
    );
    if (anyUncheckedValue) {
      newCheckboxes[index].isChecked = false;
    } else {
      newCheckboxes[index].isChecked = true;
    }

    setCheckboxes(newCheckboxes);
  };

  const handleDropdown = (index: number) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].dropDown = !newCheckboxes[index].dropDown;
    setCheckboxes(newCheckboxes);
  };

  const renderDropdown = (index: number) => {
    return checkboxes[index].dropDown ? (
      <MdOutlineKeyboardArrowUp size={28} />
    ) : (
      <MdOutlineKeyboardArrowDown size={28} />
    );
  };

  return (
    <div>
      <div>
        {checkboxes.map((checkbox, index) => (
          <div key={index} className="bg-[#343541]">
            <div className="flex items-center p-2 gap-4">
              <CustomCheckbox
                isChecked={checkbox.isChecked}
                onClick={() => handleEntityCheckboxChange(index)}
              />
              <span className="flex-1">{checkbox.entityLabel}</span>
              <div onClick={() => handleDropdown(index)}>
                <a href="#">{renderDropdown(index)}</a>
              </div>
            </div>
            {checkbox.dropDown &&
              checkbox.labels.map((label, labelIndex) => (
                <div key={labelIndex} className="ml-4">
                  <label className="label cursor-pointer justify-start gap-3">
                    <CustomCheckbox
                      size={4}
                      isChecked={label.isChecked}
                      onClick={() =>
                        handleLabelCheckboxChange(index, labelIndex)
                      }
                    />
                    <span className="label-text text-white">{label.label}</span>
                  </label>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntityCheckboxManager;
