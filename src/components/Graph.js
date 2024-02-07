import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useCourseStore from "../app/courseStore";

const GanttChart = () => {
  const { courses } = useCourseStore((state) => ({
    courses: state.courses,
  }));

  // Assuming tasks have 'start' and 'end' properties
  const chartData = courses.map((task) => ({
    id: task.id,
    title: task.title,
    start: Date.parse(task.createdTime),
    end: task.dueTime,
  }));

  console.log(chartData[0].end)
  const [date, time] = chartData[0].end.split('T');

  console.log(date,time)
  const t = time.slice(0,8)
  console.log(t)

  let final = date + " " +  t;
  console.log(final)

  return (
    <div>
      <h2>Gantt Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="title"
            type="category"
            scale="band"
            tick={{ angle: -45 }}
          />
          <YAxis type="number" domain={['dataMin', 'dataMax']} />
          <Tooltip          />
          <Legend />
          <Bar dataKey="final" stackId="a" fill="#8884d8" />
          <Bar dataKey="start" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GanttChart;
