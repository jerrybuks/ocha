import React from 'react'
import googleLogo from './assets/Glogo.svg'
import './GoogleButton.css'

export default function GoogleButton({view}) {
    return (
        <div class="google-btn">
        <div class="google-icon-wrapper">
          <img class="google-icon" src={googleLogo}/>
        </div>
        <p class="btn-text"><b>{ view} with google</b></p>
      </div>
    )
}
