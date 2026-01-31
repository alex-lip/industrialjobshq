'use client';

import { useState } from 'react';

interface FilterSidebarProps {
  className?: string;
}

const jobTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'part-time', label: 'Part-time' },
];

const salaryRanges = [
  { value: '0-75000', label: 'Under $75,000' },
  { value: '75000-100000', label: '$75,000 - $100,000' },
  { value: '100000-150000', label: '$100,000 - $150,000' },
  { value: '150000+', label: '$150,000+' },
];

const industries = [
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'automation', label: 'Automation & Robotics' },
  { value: 'industrial-equipment', label: 'Industrial Equipment' },
  { value: 'materials', label: 'Raw Materials' },
  { value: 'packaging', label: 'Packaging & Processing' },
];

export default function FilterSidebar({ className = '' }: FilterSidebarProps) {
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<string>('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const handleJobTypeChange = (value: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleIndustryChange = (value: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSelectedJobTypes([]);
    setSelectedSalary('');
    setSelectedIndustries([]);
  };

  return (
    <aside className={`bg-white border border-steel-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-steel-800">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-steel-700 mb-3">Job Type</h3>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedJobTypes.includes(type.value)}
                  onChange={() => handleJobTypeChange(type.value)}
                  className="w-4 h-4 text-blue-600 border-steel-300 rounded focus:ring-blue-500"
                />
                <span className="text-steel-600">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-steel-200 pt-6">
          <h3 className="text-sm font-semibold text-steel-700 mb-3">Salary Range</h3>
          <div className="space-y-2">
            {salaryRanges.map((range) => (
              <label key={range.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="salary"
                  checked={selectedSalary === range.value}
                  onChange={() => setSelectedSalary(range.value)}
                  className="w-4 h-4 text-blue-600 border-steel-300 focus:ring-blue-500"
                />
                <span className="text-steel-600">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-steel-200 pt-6">
          <h3 className="text-sm font-semibold text-steel-700 mb-3">Industry</h3>
          <div className="space-y-2">
            {industries.map((industry) => (
              <label key={industry.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedIndustries.includes(industry.value)}
                  onChange={() => handleIndustryChange(industry.value)}
                  className="w-4 h-4 text-blue-600 border-steel-300 rounded focus:ring-blue-500"
                />
                <span className="text-steel-600">{industry.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full mt-6 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
        Apply Filters
      </button>
    </aside>
  );
}
