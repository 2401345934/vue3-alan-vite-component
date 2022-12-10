import VideoRecording from './src/video-recording.vue';

VideoRecording.install = (App) => {
  App.component(VideoRecording.name, VideoRecording);
};

export default VideoRecording;
