import React from 'react'

export const Error = ({message}) => {
    return (
        <div className="col-5 mt-4 alert alert-dark">
            {message}
        </div>
    )
}
