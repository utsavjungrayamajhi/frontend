import "./dashHome.css";
import FeaturedInfo from "../../components/featuredInfo/featuredInfo";
import LatestTransactions from "../../components/latestTransactions/LatestTransactions";
export default function DashHome() {
  return (
    <div className="dashHome">
      <LatestTransactions />
    </div>
  );
}
