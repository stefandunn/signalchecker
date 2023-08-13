import { Map } from "@/components/Map/Map";
import { Sidebar } from "@/components/Sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-stretch md:flex-nowrap">
      <Sidebar />
      <div className="flex-grow flex flex-col md:block">
        <Map />
      </div>
    </div>
  );
};

export default Home;
