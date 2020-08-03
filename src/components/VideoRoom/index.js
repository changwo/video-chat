import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import io from "socket.io-client";

const Container = styled.div`
   height: 100vh;
   width: 100%;
   display: flex;
   flex-direction: column;
`

const Row = styled.div`
  display: flex;
  width: 100%;
`
const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`

const VideoRoom = (props) => {
    const [yourID, setYourID] = useState("")
    const [users, setUsers] = useState({})
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState()
    const [callerSiglnal, setCallerSiglnal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io.connect("/")
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => {
            setStream(stream);
            if (userVideo.current){
                userVideo.current.srcObject = stream;
            }
        })

        socket.current.on("yourID", (id) => {
            setYourID(id)
        })

        socket.current.on("allUsers", (users) => {
            setUsers(users)
        })

        socket.current.on("hey", (data) => {

        })
    }, [])

    const callPeer = id => {

    }

    const acceptCall = () => {

    }

    let UserVideo;
    if(stream)

    return (
        <Container>
            HI
        </Container>
    )
}

export default VideoRoom