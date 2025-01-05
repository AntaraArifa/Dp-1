import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
const filterData = [
  {
    filterType: "Location",
    array: ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer","Data Scientist"]
  }/*,
  {
    filterType: "Salary",
    array: ["0-40000", "42000-100000", "100000-500000"]
  }*/
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const changeHandler = (value) => {
      setSelectedValue(value);
  }
  useEffect(()=>{
      dispatch(setSearchedQuery(selectedValue));
  },[selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
    <h1 className="font-bold text-lg">Filter Jobs</h1>
    <hr className="mt-3" />
    {filterData.map((data, index) => (
      <div key={`filter-${index}`}>
        <h1 className="font-bold text-lg mt-4">{data.filterType}</h1>
        <div className="space-y-2">
          {data.array.map((item, idx) => {
            const isChecked = selectedValue === item; // Check if the radio is selected
            return (
              <div
                key={`filter-${index}-${idx}`}
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => changeHandler(item)}
              >
                {/* Custom Radio Button */}
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    isChecked ? 'bg-black border-black' : 'border-gray-400'
                  }`}
                ></div>
                {/* Label */}
                <label className="cursor-pointer">{item}</label>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
  )
}

export default FilterCard