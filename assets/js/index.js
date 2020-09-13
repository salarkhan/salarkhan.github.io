document.addEventListener("DOMContentLoaded", function(){ init(); })

function init() { 
  bindEventListeners();
  loadHls(); 
}

function bindEventListeners() {
  anchors = document.querySelectorAll(".video-anchor")
  for (let a of anchors) {
    a.addEventListener("click", focus)
  }
}

function loadHls() {
  for (let videoTag of document.querySelectorAll(".video-item")) {
    let url = "https://stream.mux.com/"+videoTag.dataset.playback+".m3u8";
    if (Hls.isSupported()) {
      let hls = new Hls();
      hls.loadSource(url);
      let video = document.getElementById(videoTag.id);
      hls.attachMedia(video);
    }
  }
}

// pause & hide the video, then make the selected one visible & scroll to it
function focus(event) {
  event.preventDefault()
  for (let tag of document.querySelectorAll(".video-item")) {
    tag.classList.add("hidden");
    tag.pause()
  }
  let tag = document.getElementById(this.dataset.anchor);
  tag.classList.remove("hidden");
  scrollTo(tag);
}

function scrollTo(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop - 200
  });
}
