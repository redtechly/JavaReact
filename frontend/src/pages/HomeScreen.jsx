import React, { useRef } from "react";
import SockJsClient from "react-stomp";

function SampleComponent() {
  const clientRef = useRef(null);

  const sendMessage = (msg) => {
    clientRef.current.sendMessage("/topics/all", msg);
  };

  return (
    <div>
      <SockJsClient
        url="http://localhost:8081/ws"
        topics={["/topics/all"]}
        onMessage={(msg) => console.log(msg)}
        ref={clientRef}
      />
    </div>
  );
}

export default SampleComponent;
