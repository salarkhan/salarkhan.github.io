const APPLE_MPEG = "application/vnd.apple.mpegurl";
const SCROLL_OFFSET = 200;

document.addEventListener("DOMContentLoaded", function(){ init(); })

function init() { 
  bindEventListeners();
  loadVideo(); 
}

function bindEventListeners() {
  anchors = document.querySelectorAll(".video-anchor")
  for (let a of anchors) {
    a.addEventListener("click", focus)
  }
}

function loadVideo() {
  for (let videoTag of document.querySelectorAll(".video-item")) {
    let url = "https://stream.mux.com/"+videoTag.dataset.playback+".m3u8";
    // let native hls support handle it if possible (iOS safari)
    if (videoTag.canPlayType(APPLE_MPEG)) {
      videoTag.src = url;
    } else if (Hls.isSupported()) {
      let hls = new Hls();
      hls.loadSource(url);
      let video = document.getElementById(videoTag.id);
      hls.attachMedia(video);
    }
  }
}

function focus(event) {
  event.preventDefault()
  for (let tag of document.querySelectorAll(".video-item")) {
    tag.classList.add("hidden");
    tag.pause();
  }
  let tag = document.getElementById(this.dataset.anchor);
  tag.classList.remove("hidden");
  scrollTo(tag);
}

function scrollTo(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop - SCROLL_OFFSET
  });
}
