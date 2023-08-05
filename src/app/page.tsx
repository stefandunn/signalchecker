import { Map } from "@/components/Map/Map";
import { Sidebar } from "@/components/Sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-row items-stretch flex-nowrap min-h-screen">
      <Sidebar />
      <div className="flex-grow">
        <Map />
      </div>
    </div>
  );
};

export default Home;
