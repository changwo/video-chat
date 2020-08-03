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
            if (userVideo.current) {
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
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", data => {
            socket.current.emit("callUser", {userToCall: id, signalData: data, from: yourID})
        })
    }

    const acceptCall = () => {

    }

    let UserVideo;
    if (stream) {
        UserVideo = (
            <Video playsInline muted ref={userVideo} autoPlay/>
        );
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
            <Video playsInline ref={partnerVideo} autoPlay/>
        )
    }

    let incomingCall;
    if (receivingCall) {
        incomingCall = (
            <div>
                <h1>{caller} is calling you</h1>
                <button onClick={acceptCall}>Accept</button>
            </div>
        )
    }

    return (
        <Container>
            <Row>
                {UserVideo}
                {PartnerVideo}
            </Row>
            <Row>
                {Object.keys(users.map(key => {
                    if (key === yourID) return null

                    return (
                        <button onClick={() => callPeer(key)}>Call {key}</button>
                    )
                }))}
            </Row>
            <Row>
                {incomingCall}
            </Row>
        </Container>
    )
}

export default VideoRoom