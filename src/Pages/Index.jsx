import React, { useState } from "react";
import lib from "../../src/lib/lib";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import libaray from "../lib/lib";
import { HashLoader } from "react-spinners";

const SingUp = () => {
  const auth = getAuth();
  const { SucessToast, ErorrToast, InfoToast } = libaray;
  const data = lib.singUpdata();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  // erro state
  const [emailErorr, setEmailErorr] = useState("");
  const [fullNameErorr, setFullNameErorr] = useState("");
  const [passwordErorr, setPasswordErorr] = useState("");
  // loading
  const [loading, setLoading] = useState(false);

  // const handleinput = (e)=>{
  //   if (e.target.name == "email") {

  //   }email = e.target.value;
  // }

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  /**
   * todo:handleChange funtion im;lement
   * @param({event})
   * return void
   */

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name == "fullName") {
      setFullName(value);
    } else if (name == "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSingUp = () => {
    if (!fullName) {
      setFullNameErorr("full Name Missing");
    } else if (!email) {
      setEmailErorr("email Missing");
    } else if (!password) {
      setPasswordErorr("password Missing");
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          SucessToast("registration secessfull");

          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL:
              "https://images.pexels.com/photos/9072343/pexels-photo-9072343.jpeg?auto=compress&cs=tinysrgb&w=600",
          });
        })
        .then(() => {
          // send email for authenticate user
          return sendEmailVerification(auth.currentUser);
        })
        .then((mailData) => {
          InfoToast("🦄mail send sucesssfull check your email");
          
        })
        .catch((err) => {
          ErorrToast(err.code);
          
        })
        .finally(()=>{
          setLoading(false);
          setFullName(" ");
           setEmail(" ");
           setPassword(" ")
        })
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 h-screen flex items-center justify-center">
        <div>
          <h2>Get started with easily register</h2>
          <p>Free register and you can enjoy it</p>

          <form
            action="#"
            className="mt-10"
            onSubmit={(e) => e.preventDefault()}
          >
            {data?.map(({ name, id }) => (
              <div
                className="flex flex-col gap-y-1 items-start mb-5 relative"
                key={id}
              >
                <label htmlFor="Email">{`type ${name}`}</label>
                <input
                  type={
                    name == "email"
                      ? "email"
                      : name == "password"
                      ? "password"
                      : "text"
                  }
                  placeholder={`type your ${name}`}
                  name={name}
                  onChange={handleChange}
                  
                  className="border rounded-[3px] border-gray-500 py-1 px-2"
                />

                {name == "email" && email == "" ? (
                  <span className="text-red-500">{emailErorr}</span>
                ) : (
                  ""
                )}

                {name == "fullName" && fullName == "" ? (
                  <span className="text-red-500">{fullNameErorr}</span>
                ) : (
                  ""
                )}

                {name == "password" && password == "" ? (
                  <span className="text-red-500">{passwordErorr}</span>
                ) : (
                  ""
                )}
              </div>
            ))}
            {loading ? (
              <button
                onClick={handleSingUp}
                className="px-5 py-2 bg-blue-600 text-white text-lg rounded cursor-pointer"
              >
                <HashLoader
                  color={"#ffff"}
                  loading={loading}
                  cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </button>
            ) : (
              <button
                onClick={handleSingUp}
                className="px-5 py-2 bg-blue-600 text-white text-lg rounded cursor-pointer"
              >
                Sing UP
              </button>
            )}
          </form>
          <p className="mt-5">
            Already have an account ? <span>Sing In</span>
          </p>
        </div>
      </div>
      <div className="w-1/2 bg-yellow-500 h-screen">
        <h2>two</h2>
      </div>
    </div>
  );
};

export default SingUp;
