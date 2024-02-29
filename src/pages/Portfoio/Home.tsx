import { ConfigProvider, Layout, Menu } from "antd";

import HeroBanner from "../../components/portfolio/hero-banner/hero-banner";
import { NavBar } from "../../components/portfolio/nav-bar/nav-bar";
import RecentPost from "../../components/portfolio/recent-posts/recent-post";
import Footer from "../../components/portfolio/footer/footer";
import ReachMe from "../../components/portfolio/reach-me/reach-me";
import { backgroundColor } from "../../antd-config/config";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <HeroBanner />
      <RecentPost />
      <ReachMe />
      <Footer />
    </div>
  );
};

export default HomePage;
