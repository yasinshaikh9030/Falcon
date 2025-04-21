// src/components/ChartView/ChartView.js
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "react-bootstrap";

const ChartView = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Simulating static data as Firebase is removed
    const data = [
      { date: "2025-04-01", views: 10 },
      { date: "2025-04-02", views: 20 },
      { date: "2025-04-03", views: 30 },
      { date: "2025-04-04", views: 40 },
      { date: "2025-04-05", views: 50 },
    ];
    setChartData(data);
  }, []);

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Body>
        <Card.Title>Engagement Over Time</Card.Title>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#007bff"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default ChartView;
