import React, { Component } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { getProviders } from "next-auth/react"

function Test() {

    const { data } = useSession()
    console.log(data);
    console.log(process.env.REACT_APP_AUTH0_CLIENT_ID)
    return (
        <>
            Not signed in <br />
            <button onClick={signIn}>Sign in</button>
        </>
    )
}
export default Test