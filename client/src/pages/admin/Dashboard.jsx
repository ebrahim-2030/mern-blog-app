import React, { useEffect, useReducer, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";

const Dashboard = () => {
  // state to store dashboard data
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  // fetch dashboard data
  const fetchDashboard = async () => {
    setDashboardData(dashboard_data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-6 bg-blue-50/50">
      {/* cards section */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-56 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} className="" alt="" />
          <div className="">
            <p className="text-xl font-semibold text-zinc-600">
              {dashboardData.blogs}
            </p>
            <p className="text-zinc-400 font-light">Blogs</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-56 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} className="" alt="" />
          <div className="">
            <p className="text-xl font-semibold text-zinc-600">
              {dashboardData.comments}
            </p>
            <p className="text-zinc-400 font-light">Comments</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-56 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} className="" alt="" />
          <div className="">
            <p className="text-xl font-semibold text-zinc-600">
              {dashboardData.drafts}
            </p>
            <p className="text-zinc-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* latest blogs */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-zinc-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>
        <div className="relative max-w-4xl overflow-y-auto bg-white px-4 shadow rounded-lg scroll-auto ">
          <table className="w-full text-sm text-zinc-500">
            <thead className="text-xs text-zinc-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => {
                return (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    index={index + 1}
                    fetchBlogs={fetchDashboard}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
