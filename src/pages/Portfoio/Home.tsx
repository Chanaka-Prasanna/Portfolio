import { Layout, Menu } from "antd";

import HeroBanner from "../../components/portfolio/hero-banner/hero-banner";
import { NavBar } from "../../components/portfolio/nav-bar/nav-bar";
import RecentPost from "../../components/portfolio/recent-posts/recent-post";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <HeroBanner />
      <RecentPost />
    </div>
  );
};

export default HomePage;
