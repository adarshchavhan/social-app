import React from 'react'
import { Loader } from 'react-ig-icons'

const LoadingButton = ({label, type='button', loading=false, sx={}}) => {
  return (
    <button className="btn" type={type} disabled={loading ? true : false} style={sx}>
        {loading ? <Loader w='18px' h='18px'/> : label}
    </button>
  )
}

export default LoadingButton