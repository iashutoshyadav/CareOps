import { useOutletContext } from 'react-router-dom';


import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import SolutionSection from './sections/SolutionSection';
import FeaturesSection from './sections/FeaturesSection';
import HowItWorksSection from './sections/HowItWorksSection';
import AudienceSection from './sections/AudienceSection';
import SocialProofSection from './sections/SocialProofSection';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';

const Home = () => {
    const { openLogin, openRegister } = useOutletContext();

    return (
        <div className="bg-white font-sans text-slate-900 selection:bg-indigo-50 selection:text-indigo-700">
            <HeroSection openRegister={openRegister} />
            <div id="problem"><ProblemSection /></div>
            <div id="solutions"><SolutionSection /></div>
            <div id="features"><FeaturesSection /></div>
            <div id="how-it-works"><HowItWorksSection /></div>
            <div id="audience"><AudienceSection /></div>
            <div id="reviews"><SocialProofSection /></div>
            <CTASection openRegister={openRegister} />
            <Footer />
        </div>
    );
};

export default Home;
