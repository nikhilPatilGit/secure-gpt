import { useCallback, useEffect, useMemo, useState } from 'react';
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
  [
    'Personal Information',
    [
      'Account Number',
      'Age',
      'Date',
      'Date of birth',
      'Date Interval',
      'Driver License',
      'Duration',
      'Email Address',
      'City',
      'Religion',
      'Social Security Number',
      'Phone Number',
    ],
  ],
  [
    'Health Information',
    [
      'Blood Type',
      'Health Condition',
      'Drug',
      'Dosage',
      'Medical Process',
      'Injury',
    ],
  ],
  [
    'Financial Information',
    ['Bank Account', 'Credit Card Number', 'CVV', 'Credit Card Expiration'],
  ],
]);

interface IProps {
  handleUpdateEntity: (entity: string) => void;
}
const EntityCheckboxManager = ({ handleUpdateEntity }: IProps) => {
  const initialCheckboxes: CheckboxData[] = Array.from(
    entityDataMap.keys(),
  ).map((entity) => ({
    entityLabel: entity,
    labels: entityDataMap
      .get(entity)!
      .map((label) => ({ label, isChecked: true })),
    isChecked: true,
    dropDown: false,
    entitiesBundle: '',
  }));

  const [checkboxes, setCheckboxes] =
    useState<CheckboxData[]>(initialCheckboxes);

  const processEntitiesBundle = useCallback(
    (checkboxData: CheckboxData[]): string => {
      return checkboxData
        .reduce((checkedLabels: string[], checkbox) => {
          checkbox.labels.forEach((label) => {
            if (label.isChecked) {
              const words = label.label.split(' ');
              const processedLabel =
                words.length >= 2
                  ? words.map((word) => word.toUpperCase()).join('_')
                  : label.label.toUpperCase();
              checkedLabels.push(processedLabel);
            }
          });
          return checkedLabels;
        }, [])
        .join(',');
    },
    [],
  );

  const handleEntityCheckboxChange = useCallback(
    (index: number) => {
      const newCheckboxes = [...checkboxes];
      newCheckboxes[index].isChecked = !newCheckboxes[index].isChecked;

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
    },
    [checkboxes],
  );

  const handleLabelCheckboxChange = useCallback(
    (index: number, labelIndex: number) => {
      const newCheckboxes = [...checkboxes];
      newCheckboxes[index].labels[labelIndex].isChecked =
        !newCheckboxes[index].labels[labelIndex].isChecked;
      const anyUncheckedValue = newCheckboxes[index].labels.find(
        (value) => !value.isChecked,
      );
      if (anyUncheckedValue) {
        newCheckboxes[index].isChecked = false;
      } else {
        newCheckboxes[index].isChecked = true;
      }
      setCheckboxes(newCheckboxes);
    },
    [checkboxes],
  );

  const handleDropdown = useCallback(
    (index: number) => {
      const newCheckboxes = [...checkboxes];
      newCheckboxes[index].dropDown = !newCheckboxes[index].dropDown;
      setCheckboxes(newCheckboxes);
    },
    [checkboxes],
  );

  const renderDropdown = useCallback(
    (index: number) => {
      return checkboxes[index].dropDown ? (
        <MdOutlineKeyboardArrowUp size={28} />
      ) : (
        <MdOutlineKeyboardArrowDown size={28} />
      );
    },
    [checkboxes],
  );

  const memoizedCheckboxes = useMemo(
    () =>
      checkboxes.map((checkbox, index) => (
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
                    onClick={() => handleLabelCheckboxChange(index, labelIndex)}
                  />
                  <span className="label-text text-white">{label.label}</span>
                </label>
              </div>
            ))}
        </div>
      )),
    [
      checkboxes,
      handleDropdown,
      handleEntityCheckboxChange,
      handleLabelCheckboxChange,
      renderDropdown,
    ],
  );

  useEffect(() => {
    if (checkboxes) {
      handleUpdateEntity(processEntitiesBundle(checkboxes));
    }
  }, [checkboxes, processEntitiesBundle, handleUpdateEntity]);

  return <div>{memoizedCheckboxes}</div>;
};

export default EntityCheckboxManager;
