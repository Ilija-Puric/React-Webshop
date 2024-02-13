import DashboardGrid from '../../components/DashboardGrid/DashboardGrid';
import SearchWrapper from '../../components/SearchWrapper/SearchWrapper';

const Dashboard = (): JSX.Element => {
  return (
    <div className="dashboard">
      <SearchWrapper />
      <DashboardGrid />
    </div>
  );
};

export default Dashboard;
