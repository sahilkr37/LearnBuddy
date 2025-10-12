import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/login", {
                email, password
            }, { withCredentials: true })
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <>
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" value={email} placeholder="Enter your email" className="input input-bordered" onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="Enter Password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label className="label">
                                    <a href="" className="label-text-alt link link-hover text-primary">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>

                            {/* Login button */}
                            <div className="form-control mt-4">
                                <button className="btn btn-primary" type='submit' onSubmit={handleSubmit}>Login</button>
                            </div>
                        </form>

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
