import VideoRecording from './src/video-recording.vue';

VideoRecording.install = (App) => {
	App.component(VideoRecording.alanComponentName, VideoRecording);
};

export default VideoRecording;
