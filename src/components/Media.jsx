import { useEffect, useRef, useState } from 'react'

const VIDEO_EXT = /\.(mp4|webm|mov)$/i
const YOUTUBE_PREFIX = 'youtube:'
const YOUTUBE_URL = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

function getYouTubeId(src) {
  if (!src) return null
  if (src.startsWith(YOUTUBE_PREFIX)) return src.slice(YOUTUBE_PREFIX.length)
  const match = src.match(YOUTUBE_URL)
  return match ? match[1] : null
}

let apiPromise = null
function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    const prevReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prevReady?.()
      resolve(window.YT)
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  })
  return apiPromise
}

function ControlBar({ playing, muted, progress, onTogglePlay, onToggleMute, onSeek }) {
  return (
    <div className="player__bar">
      <button className="player__btn" onClick={onTogglePlay} aria-label={playing ? 'Pausar' : 'Reproducir'}>
        {playing ? '❚❚' : '▶'}
      </button>
      <input
        className="player__seek"
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={Number.isFinite(progress) ? progress : 0}
        onChange={onSeek}
        aria-label="Progreso del video"
      />
      <button className="player__btn" onClick={onToggleMute} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>
        {muted ? '🔇' : '🔊'}
      </button>
    </div>
  )
}

function YouTubeEmbed({ id, alt, autoPlay }) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const intervalRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(!!autoPlay)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let cancelled = false

    loadYouTubeAPI().then((YT) => {
      if (cancelled || !containerRef.current) return
      playerRef.current = new YT.Player(containerRef.current, {
        videoId: id,
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          fs: 0,
          loop: 1,
          playlist: id,
        },
        events: {
          onReady: () => {
            setReady(true)
            if (autoPlay && playerRef.current) {
              playerRef.current.mute()
              playerRef.current.playVideo()
              setPlaying(true)
              setMuted(true)
            }
          },
          onStateChange: (e) => {
            setPlaying(e.data === window.YT.PlayerState.PLAYING)
          },
        },
      })
    })

    return () => {
      cancelled = true
      if (intervalRef.current) clearInterval(intervalRef.current)
      try {
        playerRef.current?.destroy?.()
      } catch {
        // ya destruido, no pasa nada
      }
    }
  }, [id, autoPlay])

  useEffect(() => {
    if (!ready) return
    intervalRef.current = setInterval(() => {
      const p = playerRef.current
      if (!p || typeof p.getDuration !== 'function') return
      const d = p.getDuration()
      if (d) setProgress(p.getCurrentTime() / d)
    }, 250)
    return () => clearInterval(intervalRef.current)
  }, [ready])

  const togglePlay = () => {
    const p = playerRef.current
    if (!p) return
    if (playing) {
      p.pauseVideo()
      setPlaying(false)
    } else {
      p.playVideo()
      setPlaying(true)
    }
  }

  const toggleMute = () => {
    const p = playerRef.current
    if (!p) return
    if (muted) {
      p.unMute()
      setMuted(false)
    } else {
      p.mute()
      setMuted(true)
    }
  }

  const onSeek = (e) => {
    const p = playerRef.current
    if (!p) return
    const fraction = Number(e.target.value)
    const d = p.getDuration()
    p.seekTo(fraction * d, true)
    setProgress(fraction)
  }

  return (
    <div className="player">
     <div ref={containerRef} className="media" aria-label={alt} />
      <ControlBar
        playing={playing}
        muted={muted}
        progress={progress}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        onSeek={onSeek}
      />
    </div>
  )
}

function VideoPlayer({ src, alt, poster, autoPlay }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(!!autoPlay)
  const [muted, setMuted] = useState(!!autoPlay)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => setPlaying(false))
    }
  }, [autoPlay])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress(v.currentTime / v.duration)
  }

  const onLoadedMetadata = () => setDuration(videoRef.current?.duration || 0)

  const onSeek = (e) => {
    const v = videoRef.current
    if (!v || !duration) return
    const fraction = Number(e.target.value)
    v.currentTime = fraction * duration
    setProgress(fraction)
  }

  return (
    <div className="player">
      <video
        ref={videoRef}
        className="media"
        src={src}
        poster={poster || undefined}
        playsInline
        loop
        muted={muted}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onClick={togglePlay}
        aria-label={alt}
      />
      <ControlBar
        playing={playing}
        muted={muted}
        progress={progress}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        onSeek={onSeek}
      />
    </div>
  )
}

export default function Media({ src, alt, label, autoPlay, poster }) {
  const youtubeId = getYouTubeId(src)
  if (youtubeId) {
    return <YouTubeEmbed id={youtubeId} alt={alt} autoPlay={autoPlay} />
  }

  if (src && VIDEO_EXT.test(src)) {
    return <VideoPlayer src={src} alt={alt} poster={poster} autoPlay={autoPlay} />
  }

  if (src) {
    return <img className="media" src={src} alt={alt} loading="lazy" />
  }

  return (
    <div className="media media--placeholder" role="img" aria-label={alt}>
      <span className="media__label">{label || 'reemplazar imagen/video'}</span>
    </div>
  )
}