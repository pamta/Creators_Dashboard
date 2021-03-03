import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const onChange = (e) => {};

const Register = ({ title, isAuthenticated }) => {
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
            background: "linear-gradient(rgba(0,2,34, 0.7), rgba(0,2,34, 0.7))",
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
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="pt-4 text-gray-500 text-center mb-3 font-bold">
                    <small>Sign Up</small>
                  </div>
                  <form>
                    <div className="relative w-full mb-3">
                      <input
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Email Address"
                        name="email"
                        required
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <input
                        placeholder="Username"
                        name="username"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        required
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <input
                        type="password"
                        placeholder="Password"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        name="paswword"
                        minLength="6"
                        required
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <input
                        type="password"
                        placeholder="Confrim Password"
                        name="password2"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        minLength="6"
                        required
                      />
                    </div>
                    <div className="text-center mt-6">
                      <input
                        type="submit"
                        value="Register"
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      />
                    </div>
                  </form>
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
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Register);
