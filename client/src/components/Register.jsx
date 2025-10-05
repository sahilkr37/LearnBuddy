import { useState } from "react";

export default function Register() {
    const [skillsKnown, setSkillsKnown] = useState([]);
    const [skillsWantToLearn, setSkillsWantToLearn] = useState([]);
    const [inputSkill, setInputSkill] = useState("");
    const [inputLearnSkill, setInputLearnSkill] = useState("");

    const addSkill = () => {
        if (inputSkill && !skillsKnown.includes(inputSkill)) {
            setSkillsKnown([...skillsKnown, inputSkill]);
            setInputSkill("");
        }
    };

    const removeSkill = (skill) => {
        setSkillsKnown(skillsKnown.filter((s) => s !== skill));
    };

    const addLearnSkill = () => {
        if (inputLearnSkill && !skillsWantToLearn.includes(inputLearnSkill)) {
            setSkillsWantToLearn([...skillsWantToLearn, inputLearnSkill]);
            setInputLearnSkill("");
        }
    };

    const removeLearnSkill = (skill) => {
        setSkillsWantToLearn(skillsWantToLearn.filter((s) => s !== skill));
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-center text-3xl font-bold">Create Account</h2>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input type="text" placeholder="First Name *" className="input input-bordered w-full" />
                        <input type="text" placeholder="Middle Name" className="input input-bordered w-full" />
                        <input type="text" placeholder="Last Name *" className="input input-bordered w-full" />
                    </div>

                    {/* Email */}
                    <input type="email" placeholder="Email *" className="input input-bordered w-full mt-3" />

                    {/* Password */}
                    <input type="password" placeholder="Password *" className="input input-bordered w-full mt-3" />

                    {/* DOB & Gender */}
                    <div className="grid grid-cols-2 gap-3 mt-3">
                        <input type="date" className="input input-bordered w-full" placeholder="Date of Birth *" />
                        <select className="select select-bordered w-full">
                            <option disabled selected>Gender *</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Role */}
                    <input type="text" placeholder="Role * (e.g. Student, Developer)" className="input input-bordered w-full mt-3" />

                    {/* Bio */}
                    <textarea className="textarea textarea-bordered w-full mt-3" placeholder="Bio"></textarea>

                    {/* Skills Known */}
                    <div className="mt-3">
                        <label className="label">
                            <span className="label-text">Skills You Know</span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputSkill}
                                onChange={(e) => setInputSkill(e.target.value)}
                                placeholder="Add a skill"
                                className="input input-bordered flex-1"
                            />
                            <button type="button" onClick={addSkill} className="btn btn-primary">+</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skillsKnown.map((skill, idx) => (
                                <div key={idx} className="badge badge-primary gap-2">
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-1 text-xs text-white hover:text-red-200"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills to Learn */}
                    <div className="mt-3">
                        <label className="label">
                            <span className="label-text">Skills You Want to Learn</span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputLearnSkill}
                                onChange={(e) => setInputLearnSkill(e.target.value)}
                                placeholder="Add a skill"
                                className="input input-bordered flex-1"
                            />
                            <button type="button" onClick={addLearnSkill} className="btn btn-secondary">+</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skillsWantToLearn.map((skill, idx) => (
                                <div key={idx} className="badge badge-secondary gap-2">
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeLearnSkill(skill)}
                                        className="ml-1 text-xs text-white hover:text-red-200"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Signup Button */}
                    <div className="form-control mt-6">
                        <button className="btn btn-success w-full">Sign Up</button>
                    </div>

                    {/* Already have an account */}
                    <p className="text-center text-sm mt-3">
                        Already have an account?{" "}
                        <a href="/login" className="link link-primary">Log In</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
