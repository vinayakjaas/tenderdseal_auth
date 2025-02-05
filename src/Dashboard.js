import React from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { userId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
      <p className="text-gray-700 mt-4">User ID: {userId}</p>
    </div>
  );
};

export default Dashboard;
