const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
myVideo.muted = true;

backBtn.addEventListener("click", () => {
  document.querySelector(".main__left").style.display = "flex";
  document.querySelector(".main__left").style.flex = "1";
  document.querySelector(".main__right").style.display = "none";
  document.querySelector(".header__back").style.display = "none";
});

showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  document.querySelector(".header__back").style.display = "block";
});

const user = prompt("Enter your name");

var peer = new Peer(undefined, {
  // key: `-----BEGIN PRIVATE KEY-----
  // MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8KhWit1gzzJG6
  // 3Ew3Tdw1PginEBwfiZU3eN5c7UI1A8P+Js6r4p+kwVfeP3DEBpyprGS51QANEE9F
  // 24njt6YueH3DPKYTB84HdIKrqbt0X0QE9bWEiG3pmcgvvWsCHhBGrqmor7DJhcqO
  // v+0SaZBjyGKLTkd10yhEoFjpr0LxXvwOOFLyeKP1h4GJlJI5+Di6SEDmY/cJpMtk
  // 9gOkSHYbarQAR7ytDxr0GVXH9FHCzbq5ztpq8dDOjLqjgkO0dmJWG1+hatlNXSTS
  // /TOe/0mJ4M9JkLGZ0p4wQ/nU8ggPDTwS5q8NFqY8A4Bty347RJg9ReadJxGzHU5x
  // nD/IT5zRAgMBAAECggEAP4MRBHhQXEObmPANBcnRH2ON9h348Cg3Zp70p3cqFszr
  // ldixf9Ehw7HDH/BX9sKolJjs8tDTkJVFvLWqqGNvw1XGVWUeRWQoBdos1RaYgGI7
  // ilUJbO/D8cqHiJ2uBevx4HnKKHcM/Cidw2tC8SkSpKuZn53PfxTEDc311QLkXKX3
  // PXZRcgT0TanbtoRMGF/Z4St35/FGXJWG1vCl1T+fr3u8B8RU31iQ2/An4KRgROM9
  // 72W4TFXP3gx+I5BU6LUYSLRyOVwZpzF0BtcX9zy/8SzzaMeo9XM3Xov8ONDC/glF
  // 8s0gCR3N65Gb8qHyaZn0sM1yCgUkDWZxgBGVY8TyBQKBgQDvyerlvbetoxxaKcFQ
  // KV0UAXfHJeQ0WaDeVrGBa1MLBe95+1FgAtdiWgBhSWCs2jZ45zf+CBFwEfx6N8pC
  // jf0XplzukOl6p0r2HFL0AIjHatAlcoJxwDPa/rN2JIUiAG54P/Sq0rzj494RrM2W
  // hhRRIVIpDWfN6l0632TmzRLmlwKBgQDI4rEUjiANK8CUR+GT+ADInU1PQI+E3iU9
  // KxEDQmt73+sAZJ5DWPjeCKm7Wci9peE7YXtJYJ5XdPV80W/+XF4tTkIst+C0oW3b
  // 5VMnjjTgmhKcygYj1M3Ly30zxTLXMEJMk/FS9E2GwImclDrSxyggkDLNUXL6A3D9
  // W3ELOGIs1wKBgQDkKiWxZcyZFFOuF30yYamHl735aTyz83T3G1bb5tul6Yftcg4E
  // Za+8jhc+eyvaTej3Mkw9FEBDe1nakauLmL/y+QIEny8K3pSdimYEd12vIxvcBhHJ
  // WzH8d88b47Qqnm5/TZvpz4yc6/4qo1scl4hNin87QN49OXxswJSqaQhLEQKBgDxH
  // 2j+CzpdlM6rLTyOp3gJVQaewheCnEKGkVLyXp81KSiiaCOvIvRVToCs6LATMzCOX
  // gvln5tvzmt7Tsjmv2graWv00SFerwV2lGSjbgX6MfV1TOjhyWTb4Xx+z4yezsZFt
  // K5NrAACZsjGsQWKSpLXwz23RLSFc+wDr+aYWS0+NAoGASWDoE1UeaEkX0SP0q6sj
  // 6I3Y5Q7NKHhSmnq2AMeqJ08ZpMezGZbZWeb0yTBABHSuRPPIgAve+V6UnnmkIy57
  // vd4QX5YVjzsAQXkLRCbJxNiXOc97xVARWUTEdmjrm4obEnN4/v0FX8jHC+NIQjrd
  // h7a8Cxr+/Sg2XenGbBpwa9o=
  // -----END PRIVATE KEY-----
  // `,
  // cert: `-----BEGIN CERTIFICATE REQUEST-----
  // MIICdjCCAV4CAQIwADCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALwq
  // FaK3WDPMkbrcTDdN3DU+CKcQHB+JlTd43lztQjUDw/4mzqvin6TBV94/cMQGnKms
  // ZLnVAA0QT0XbieO3pi54fcM8phMHzgd0gqupu3RfRAT1tYSIbemZyC+9awIeEEau
  // qaivsMmFyo6/7RJpkGPIYotOR3XTKESgWOmvQvFe/A44UvJ4o/WHgYmUkjn4OLpI
  // QOZj9wmky2T2A6RIdhtqtABHvK0PGvQZVcf0UcLNurnO2mrx0M6MuqOCQ7R2YlYb
  // X6Fq2U1dJNL9M57/SYngz0mQsZnSnjBD+dTyCA8NPBLmrw0WpjwDgG3LfjtEmD1F
  // 5p0nEbMdTnGcP8hPnNECAwEAAaAxMC8GCSqGSIb3DQEJDjEiMCAwHgYDVR0RBBcw
  // FYITZG9jdG9yLm1lZGNhcmVzLm5ldDANBgkqhkiG9w0BAQsFAAOCAQEAea4N3tda
  // S5ktpj2K9g8NCWx8LXSdQ2ndKxzKabukIQeavN4UnJsAjOh5UaX4rnw7akJ26p8+
  // F0YF5ZsKs6g1g7Ymp2ZRwm9r7d8g6jbrHVqvCDsnQnuipQxKC3x04Dv7Ww0osZwG
  // uJ4QGv7utrcB58LNovMiJRaC/bXpzmXIff2o0JD9emheWR38weAnH0Dv2FXBnUhb
  // HW1c0C9H1NWUXDTdhvy+Ob9wVth4Y4AG/ljH9lGcv0jw3uvct7vu1IvddP9d6g9G
  // C1DiCg916oBX1z7RbQxNi+u42Bp1xKCIDGeIv8c94XCWN5IDCvtZM11UvUP3YEMw
  // Dj1QPR8Gu05KwQ==
  // -----END CERTIFICATE REQUEST-----
  // `,
  host: 'meet.medcares.net',
    secure: true
});

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      console.log('call');
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

const connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

peer.on("open", (id) => {
  console.log('open')
  socket.emit("join-room", ROOM_ID, id, user);
});

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};

let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", function (e) {
  console.log('e', e);
  // console.log('clicl')
  if (text.value.length !== 0) {
    console.log('emit', text.value)
    socket.emit("message", text.value);
    text.value = "";
  }
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && text.value.length !== 0) {
    socket.emit("message", text.value);
    text.value = "";
  }
});

const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }
});

stopVideo.addEventListener("click", () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    html = `<i class="fas fa-video-slash"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = `<i class="fas fa-video"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

inviteButton.addEventListener("click", (e) => {
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
});

socket.on("createMessage", (message, userName) => {
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${
          userName === user ? "me" : userName
        }</span> </b>
        <span>${message}</span>
    </div>`;
});
