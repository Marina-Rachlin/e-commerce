import BreadCrumb from "../../../../components/admin/BreadCrumb";
import AdminLayout from "../../../../layout/admin/AdminLayout";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  import {useGetOrdersAnalyticsQuery} from '../../../../redux/features/analytics/analyticsApi';
  import LineChartDiagram from "./LineChartDiagram";



const index = () => {

    const {data, isLoading } = useGetOrdersAnalyticsQuery({});

    // const analyticsData = [];
  
    // data &&
    //   data.orders.last12Months.forEach((item) => {
    //     analyticsData.push({ name: item.name, Count: item.count });
    //   });

      const analyticsData = [
  {
    name: "Jan",
    Count: 4000,
  },
  {
    name: "Feb",
    Count: 3000,
  },
  {
    name: "Mar",
    Count: 5000,
  },
  {
    name: "April",
    Count: 1000,
  },
  {
    name: "May",
    Count: 4000,
  },
  {
    name: "June",
    Count: 800,
  },
  {
    name: "July",
    Count: 200,
  },
  {
    name: "Aug",
    Count: 4000,
  },
  {
    name: "Sept",
    Count: 800,
  },
  {
    name: "Oct",
    Count: 200,
  },
  {
    name: "Nov",
    Count: 800,
  },
  {
    name: "Dec",
    Count: 200,
  },
];



  return (

    <AdminLayout>
    <div className="admin-section user-dashboard">
        <div className="dashboard-outer">
            <BreadCrumb title="Orders Analytics" subtitle="Last 12 months analytics data" />
            {/* breadCrumb */}


            <div className="row" style={{ margin: "0 -24px", marginTop: '100px' }}>
            {/* <ResponsiveContainer
              width={ "100%" }
              height={300}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {<Legend />}
                <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer> */}
            <LineChartDiagram data={analyticsData} />
          </div>

           
        </div>
    </div>
</AdminLayout>

  );
};

export default index;


