import React from 'react'

const NavigationLoginReg = ({ isLoginPage = false, ...props }) => {
    return (
        <div className="text-center mt-4" {...props}>
            <p>
                {isLoginPage
                    ? "Don't have an account? "
                    : "Already have an account? "}
                <a
                    href={isLoginPage ? "/register" : "/login"}
                    className="text-blue-500 hover:underline"
                >
                    {isLoginPage ? "Register" : "Login"}
                </a>
            </p>
        </div>
    )
}

export default NavigationLoginReg