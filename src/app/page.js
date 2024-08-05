import HomeMain from "@/components/HomeComponents/HomeMain";
import TopBarComponent from "@/components/TopBarComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-slate-100">
      <TopBarComponent/>
      <div className="h-[100vh]">
        <HomeMain />
      </div>
    </div>
  );
}
