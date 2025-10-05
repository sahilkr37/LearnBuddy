import bgImage from "../assets/bg1.png";
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="min-h-screen flex flex-wrap">
            {/* Left: Quote + Actions */}
            <div className="flex-1 flex items-center justify-center  text-white sm:px-6">
                <div className=" text-center sm:space-y-6 space-y-3">
                    <h1 className="sm:text-4xl text-2xl md:text-5xl font-bold">
                        Match, Learn & Grow Together
                    </h1>
                    <p className="sm:text-lg text-sm opacity-90">
                        “Great things begin with a single step.”
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to='/login'><button className="btn btn-primary">Log In</button></Link>
                        <Link to='/register'><button className="btn btn-accent">Sign Up</button></Link>
                    </div>
                </div>
            </div>

            {/* Right: Background Image */}
            <div>
                <img src={bgImage} alt="" className="sm:w-200 sm:m-20" />

            </div>
        </div>
    );
}

export default Home;
