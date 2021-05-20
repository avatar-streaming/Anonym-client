import { socket } from "./socket";

const pc_config = {
  "iceServers": [
    {
      urls: "stun:stun.l.google.com:19302",
    }
  ],
};
const peer = {
  sendPC: RTCPeerConnection,
  receivePCs: {},
};

const createSenderPeerConnection = (socket, localStream, avatarRef) => {
  const pc = new RTCPeerConnection(pc_config);

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("senderCandidate", {
        candidate: event.candidate,
        senderSocketID: socket.id
      });
    }
  };

  if (localStream) {
    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream);
    });
  }

  const dc = pc.createDataChannel("sender");
  dc.onopen = () => {
    console.log("channel open");

    peer.intervalID = setInterval(() => {
      const imageUri = avatarRef.current.toDataURL("image/jpeg", 1.0);
      dc.send(imageUri);
    }, 100);
  };

  return pc;
};

const createSenderOffer = async (socket, roomID) => {
  try {
    const senderSdp = await peer.sendPC.createOffer({
      offerToReceiveAudio: false,
      offerToReceiveVideo: false,
    });
    await peer.sendPC.setLocalDescription(new RTCSessionDescription(senderSdp));

    socket.emit("senderOffer", {
      senderSdp,
      senderSocketID: socket.id,
      roomID,
    });
  } catch (error) {
    console.log(error);
  }
};

const createReceiverPeerConnection = (socketID, socket, setStream, imageRef) => {
  const pc = new RTCPeerConnection(pc_config);
  peer.receivePCs[socketID] = pc;

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("receiverCandidate", {
        candidate: event.candidate,
        receiverSocketID: socket.id,
        senderSocketID: socketID,
      });
    }
  };

  pc.ontrack = (event) => {
    if (setStream) {
      setStream(event.streams[0]);
    }
  };

  const dc = pc.createDataChannel("receiver");
  dc.onopen = () => {
    console.log("channel open");
  };
  dc.onmessage = (event) => {
    imageRef.current = event.data;
  };

  return pc;
}

const createReceiverOffer = async (pc, senderID, roomID, socket) => {
  try {
    const sdp = await pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await pc.setLocalDescription(new RTCSessionDescription(sdp));

    socket.emit("receiverOffer", {
      receiverSdp: sdp,
      receiverSocketID: socket.id,
      senderSocketID: senderID,
      roomID,
    });
  } catch (error) {
    console.log(error);
  }
}

const createReceivePC = (senderID, roomID, socket, setStream, imageRef) => {
  try {
    const pc = createReceiverPeerConnection(senderID, socket, setStream, imageRef);
    createReceiverOffer(pc, senderID, roomID, socket);
  } catch (error) {
    console.log(error);
  }
};

export const receiveStreaming = (updateStream, imageRef) => {
  socket.on("receive streaming", ({ streamerID, roomID }) => {
    createReceivePC(streamerID, roomID, socket, updateStream, imageRef);
  });
};

export const sendStreaming = (localStream, roomID, avatarRef) => {
  peer.sendPC = createSenderPeerConnection(socket, localStream, avatarRef);
  createSenderOffer(socket, roomID);
};

socket.on("getSenderCandidate", async ({ candidate }) => {
  try {
    if (!candidate) {
      return;
    }

    peer.sendPC.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (error) {
    console.log(error);
  }
});

socket.on("getReceiverCandidate", async ({ id, candidate }) => {
  try {
    const pc = peer.receivePCs[id];

    if (!candidate) {
      return;
    }

    pc.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (error) {
    console.log(error);
  }
});

socket.on("getSenderAnswer", async ({ sdp }) => {
  try {
    await peer.sendPC.setRemoteDescription(new RTCSessionDescription(sdp));
  } catch (error) {
    console.log(error);
  }
});

socket.on("getReceiverAnswer", async ({ id, sdp }) => {
  try {
    const pc = peer.receivePCs[id];
    await pc.setRemoteDescription(sdp);
  } catch (error) {
    console.log(error);
  }
});
