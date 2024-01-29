import BreadCrumb from "../../../../components/admin/BreadCrumb";
import AdminLayout from "../../../../layout/admin/AdminLayout";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    Label,
    YAxis,
    LabelList,
    AreaChart,
    Area,
    Tooltip,
  } from "recharts";
  import {useGetProductsAnalyticsQuery} from '../../../../redux/features/analytics/analyticsApi'



const index = () => {

    const { data, isLoading } = useGetProductsAnalyticsQuery({});

    const analyticsData = [
        { name: 'Jan 2023', uv: 3 },
        { name: 'Feb 2023', uv: 2 },
        { name: 'Mar 2023', uv: 5 },
        { name: 'Apr 2023', uv: 7 },
        { name: 'May 2023', uv: 2 },
        { name: 'Jun 2023', uv: 5 },
        { name: 'Jul 2023', uv: 7 },
        { name: 'Aug 2023', uv: 5 },
        { name: 'Sep 2023', uv: 7 },
        { name: 'Oct 2023', uv: 2 },
        { name: 'Nov 2023', uv: 5 },
        { name: 'Dec 2023', uv: 7 },
      ];

  
    // const analyticsData = [];
  
    // data &&
    //   data.products.last12Months.forEach((item) => {
    //     analyticsData.push({ name: item.month, uv: item.count });
    //   });
  
    const minValue = 0;



  return (

    <AdminLayout>
    <div className="admin-section user-dashboard">
        <div className="dashboard-outer">
            <BreadCrumb title="Products Analytics" subtitle="Last 12 months analytics data" />
            {/* breadCrumb */}

            <div className="row" style={{ margin: "0 -24px" }}>
                  <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                        <XAxis dataKey="name">
                            <Label offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis domain={[minValue, "auto"]} />
                        <Bar dataKey="uv" fill="#4d97fd">
                            <LabelList dataKey="uv" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
    </div>
</AdminLayout>

  );
};

export default index;


