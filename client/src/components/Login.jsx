import { Link } from 'react-router-dom'
const Login = () => {
    return (
        <>
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Login</h2>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Enter your email" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Enter Password" className="input input-bordered" />
                            <label className="label">
                                <a href="" className="label-text-alt link link-hover text-primary">
                                    Forgot password?
                                </a>
                            </label>
                        </div>

                        {/* Login button */}
                        <div className="form-control mt-4">
                            <button className="btn btn-primary">Login</button>
                        </div>

                        {/* Divider */}
                        <div className="divider">OR</div>

                        {/* Signup option */}
                        <p className="text-center text-sm">
                            Don’t have an account?{" "}
                            <Link to='/register'><button className="link link-hover text-primary">
                                Sign up
                            </button></Link>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
