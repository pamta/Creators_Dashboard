import PropTypes from 'prop-types'
import background from '../../assets/img/background.jfif'

const Login = ({title}) => {
    return (
        <>
            <main>
            <section className="absolute w-full h-full">
            <div
                className="absolute top-0 w-full h-full bg-gray-900"
                style={{
                background: "linear-gradient(rgba(0,2,34, 0.7), rgba(0,2,34, 0.7)), url(" + background + ")",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat"
                }}
            ></div>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative py-10 text-center text-white text-5xl font-medium">
                            {title}
                        </div>
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">                    
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <div className="pt-4 text-gray-500 text-center mb-3 font-bold">
                                    <small>Log in with credentials</small>
                                    </div>
                                <form>
                                    <div className="relative w-full mb-3">
                                        <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                        >
                                        Username
                                        </label>
                                        <input
                                        type="email"
                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                        placeholder="Username"
                                        style={{ transition: "all .15s ease" }}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                        >
                                        Password
                                        </label>
                                        <input
                                        type="password"
                                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                        placeholder="Password"
                                        style={{ transition: "all .15s ease" }}
                                        />
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                                            style={{ transition: "all .15s ease" }}
                                        />
                                        <span className="ml-2 text-sm font-semibold text-gray-700">
                                            Remember me
                                        </span>
                                        </label>
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        >
                                        Log In
                                        </button>
                                    </div>
                                </form>

                                <div className="flex flex-wrap mt-3">
                                    <div className="w-1/2">
                                        <a
                                        href="#humberto"
                                        onClick={e => e.preventDefault()}
                                        className="font-bold text-sm text-blue-500 hover:text-blue-800"
                                        >
                                        Forgot password?
                                        </a>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <a
                                        href="#humberto"
                                        onClick={e => e.preventDefault()}
                                        className="font-bold text-sm text-blue-500 hover:text-blue-800"
                                        >
                                        Create new account
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
            </section>
        </main>
        </>
    )   
}

Login.defaultProps = {
    title: "Creator's Dashboard",
}

Login.propTypes = {
    title: PropTypes.string,
}

export default Login