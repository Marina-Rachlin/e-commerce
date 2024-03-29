import BreadCrumb from "../../../../components/admin/BreadCrumb";
import AdminLayout from "../../../../layout/admin/AdminLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  } from "recharts";
  import {useGetUsersAnalyticsQuery} from '../../../../redux/features/analytics/analyticsApi'



const index = () => {

  const analyticsData = [
    { name: "January 2023", count: 440 },
    { name: "February 2023", count: 8200 },
    { name: "March 2023", count: 4033 },
    { name: "April 2023", count: 4502 },
    { name: "May 2023", count: 2042 },
    { name: "June 2023", count: 3454 },
    { name: "July 2023", count: 356 },
    { name: "Aug 2023", count: 5667 },
    { name: "Sept 2023", count: 1320 },
    { name: "Oct 2023", count: 6526 },
    { name: "Nov 2023", count: 5480 },
    { name: "December 2023", count: 485 },
  ];

  const { data, isLoading } = useGetUsersAnalyticsQuery({});

//  const analyticsData = [];

//   data &&
//     data.users.last12Months.forEach((item) => {
//       analyticsData.push({ name: item.month, count: item.count });
//     });


  return (

    <AdminLayout>
    <div className="admin-section user-dashboard">
        <div className="dashboard-outer">
            <BreadCrumb title="Users Analytics" subtitle="Last 12 months analytics data" />
            {/* breadCrumb */}

            <div className="row" style={{ margin: "0 -24px", marginTop: '100px' }}>
              <ResponsiveContainer width='100%'  height={300}>
             <AreaChart
               data={analyticsData}
               margin={{
                 top: 20,
                 right: 30,
                 left: 0,
                 bottom: 0,
               }}
             >
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Area
                 type="monotone"
                 dataKey="count"
                 stroke="#4d62d9"
                 fill="#4d62d9"
               />
             </AreaChart>
           </ResponsiveContainer>
          </div>
        </div>
    </div>
</AdminLayout>

  );
};

export default index;


