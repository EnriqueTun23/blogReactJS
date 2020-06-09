import React from 'react'

// style
import '../../css/spinner.css'

const Spinner = (props) => (
    <div className="center">
        <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
)

export default Spinner;