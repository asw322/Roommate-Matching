import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithPrimaryBackground.js";
import Footer from "components/footers/FiveColumnDark.js";


const home = () => {
  return (
    <AnimationRevealPage>
      <Hero />
      <Footer />
    </AnimationRevealPage>
  );
}

export default home;