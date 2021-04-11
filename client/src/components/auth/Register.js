import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import background from "../../assets/img/background.jfif";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert"
import { connect } from "react-redux";

const Register = ({ title, register, setAlert, isAuthenticated }) => {
  const [name, setName] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const handleSubmit = (e) => {

    e.preventDefault();
    if (password == password2){
      register(name, username, email, password);
    }else{
      setAlert("Please use the same password in both fields", "danger");
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <section className="absolute w-full h-full">
        <div
          className="absolute top-0 w-full h-full bg-gray-900"
          style={{
            background:
              "linear-gradient(rgba(0,2,34, 0.7), rgba(0,2,34, 0.7)), url(" +
              background +
              ")",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative py-10 text-center text-white text-5xl font-medium">
                {title}
              </div>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="pt-4 text-gray-600 text-center mb-3 font-bold">
                  Sign Up
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Full Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Email Address"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Password"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        name="password"
                        minLength="8"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        minLength="8"
                        onChange={(e) => setPassword2(e.target.value)}
                        
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style={{ transition: "all .15s ease" }}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="flex flex-wrap mt-3">
                    <div className="w-1/2">
                      <Link to="/login" className="font-bold text-sm text-blue-500 hover:text-blue-800">
                        I already have an account
                      </Link>
                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

Register.defaultProps = {
  title: "Creator's Dashboard",
};

Register.propTypes = {
  title: PropTypes.string,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
