import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import isWhitelisted from "../../../shared/whitelisting_email.domain"
import { createAccountValidator } from "../../../shared/validator.js"
function CreateAccCard() {
    const navigate = useNavigate();
    const initialFormValue = {
        fName: "",
        lName: "",
        username: "",
        age: "",
        gender: "",
        phoneNo: "",
        email: "",
        password: "",
        cnfPassword: ""
    }
    const [myFormData, setMyForm] = useState(initialFormValue);
    const passwordMatch = myFormData.cnfPassword.length > 0 && myFormData.password === myFormData.cnfPassword;
    //returns boolean data type
    function handleChange(e) {
        //hooks of form data
        const { name, value } = e.target;
        setMyForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }
    function handleCancel() {
        //on click the btn cancel return to login page
        setMyForm(initialFormValue);
        navigate("/login");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            ...myFormData,
            age: Number(myFormData.age),
        };

        //prevent submit without match 
        const { error } = createAccountValidator.safeParse(data);
        if (error) {
            // console.log("error is :", error);
            // console.log(success);
            // console.log(success.error);
            // console.log(error.ZodError);

            console.log(error.issues)
            const errors = error.issues[0].message;
            return alert(errors)

        }
        if (!isWhitelisted(myFormData.email)) {
            return alert("Please enter the correct email or use your personal email providers like @google,@outlook, etc");
        }
        //submit the data to backend
        try {
            const req = await api.post(("/create-account"), data);
            if (req.data.success) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", myFormData.username);
                navigate("/profile");
            }
        } catch (error) {
            //optional chaining for clean error
            alert(error.response?.data?.message || "Account creation failed");
        }
    }
    return (
        <div className="container">
            <h2>Create account for Patient</h2>

            <form onSubmit={handleSubmit} method="post">

                <label htmlFor="fName">First Name</label>
                <input
                    id="fName"
                    type="text"
                    name="fName"
                    placeholder="Enter your First name"
                    value={myFormData.fName}
                    required
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="lName">Last Name</label>
                <input
                    id="lName"
                    type="text"
                    name="lName"
                    placeholder="Enter your First name"
                    value={myFormData.lName}
                    required
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter the username"
                        value={myFormData.username}
                        autoComplete="username"
                        required
                        onChange={handleChange}
                />
                <br />

                <label htmlFor="age">Enter Your age</label>
                <input
                    id="age"
                    type="number"
                    min="1"
                    max="100"
                    name="age"
                    placeholder="Enter your age"
                    value={myFormData.age}
                    required
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="gender">
                    Choose Your Gender
                    <select name="gender" id="gender" value={myFormData.gender} onChange={handleChange} required>
                        <option value="" disabled>choose your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Transgender</option>
                    </select>
                </label>
                <br />

                <label htmlFor="phoneNo">Enter Your phone Number</label>
                <input
                    id="phoneNo"
                    type="tel"
                    pattern="[0-9]{10}"
                    name="phoneNo"
                    placeholder="Enter your phone Number"
                    value={myFormData.phoneNo}
                    required
                    onChange={e => {
                        //search this technique using google(stackoverflow) and learn for patterns here input will only will be a number
                        const inputOnlyNumber = e.target.value.replace(/\D/g, "");
                        setMyForm(prev => ({
                            ...prev,
                            phoneNo: inputOnlyNumber
                        }))
                    }}
                />
                <br />

                <label htmlFor="email">Enter Your Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your phone Email"
                    value={myFormData.email}
                    required
                    onChange={handleChange}
                />
                <br />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        value={myFormData.password}
                        required
                        onChange={handleChange}
                />
                <br />
                    <label htmlFor="cnfPassword">Confirm Password</label>
                    <input
                        id="cnfPassword"
                        type="password"
                        name="cnfPassword"
                        placeholder="Enter your password"
                        value={myFormData.cnfPassword}
                        autoComplete="new-password"
                        required
                        onChange={handleChange}
                />
                <br />
                {myFormData.cnfPassword.length > 0 && (passwordMatch ? <p>password match</p> : <p>password does not match</p>)}
                <br />

                <button type="submit">submit</button>
                <button type="button" onClick={handleCancel}>cancel</button>
            </form>
        </div>
    )

}

export default CreateAccCard;