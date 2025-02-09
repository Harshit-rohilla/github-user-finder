import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const LanguageChart = ({ repos }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderLegend = (props) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-col gap-1.5">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-1">
            <div 
              className="w-2.5 h-2.5 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-[#2d3748] font-semibold px-4 pt-2">Languages</h1>
      <div className="w-full h-full -mr-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={repos}
              cx="45%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="percentage"
              nameKey="language"
            >
              {repos.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `${value}%`}
              labelStyle={{ color: '#2d3748' }}
            />
            <Legend 
              content={renderLegend}
              layout="vertical" 
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ paddingLeft: '5px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageChart;