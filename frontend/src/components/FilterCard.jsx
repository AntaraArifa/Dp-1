import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import React from 'react'
const filterData = [
  {
    filterType: "Location",
    array: ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lac", "1lac-5lac"]
  }
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h3 className='font-bold text-lg'>Filter Jobs</h3>
      <hr className='mt-3' />
      <RadioGroup>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h3 className='font-bold text-lg'>{data.filterType}</h3>
              {
                data.array.map((item, index) => {
                  return (
                    <div key={index} className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} className="custom-radio" />
                      <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard