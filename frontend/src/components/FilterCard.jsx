import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { MapPin, Code, Filter } from 'lucide-react';

const filterData = [
  {
    filterType: "Location",
    array: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"],
    icon: MapPin
  },
  {
    filterType: "Industry", 
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist"],
    icon: Code
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
          <Filter className="w-5 h-5 text-purple-600" />
        </div>
        <h1 className="font-bold text-xl text-gray-900">Filter Jobs</h1>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        {filterData.map((data, index) => {
          const IconComponent = data.icon;
          
          return (
            <div key={`filter-${index}`} className="mb-6 last:mb-0">
              {/* Filter Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-gray-600" />
                </div>
                <h2 className="font-semibold text-lg text-gray-900">{data.filterType}</h2>
              </div>
              
              {/* Filter Options */}
              <div className="space-y-3 ml-11">
                {data.array.map((item, idx) => {
                  const isChecked = selectedValue === item;
                  
                  return (
                    <div
                      key={`filter-${index}-${idx}`}
                      className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
                      onClick={() => changeHandler(item)}
                    >
                      {/* Custom Radio Button */}
                      <div className="relative">
                        <div
                          className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                            isChecked 
                              ? 'bg-purple-600 border-purple-600 shadow-sm' 
                              : 'border-gray-300 group-hover:border-purple-300'
                          }`}
                        >
                          {isChecked && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Label */}
                      <label 
                        className={`cursor-pointer font-medium transition-colors duration-200 ${
                          isChecked 
                            ? 'text-purple-700' 
                            : 'text-gray-700 group-hover:text-gray-900'
                        }`}
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Clear Filter Option */}
      {selectedValue && (
        <div className="border-t border-gray-200 pt-4 mt-6">
          <button
            onClick={() => changeHandler('')}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterCard;