

# WebKit performance demos

The live demos hosted via GitHub Pages.
Each demo is static HTML file with either embedded or included static js file.
The performance data collected on MacBook Pro 16" with Apple M2 Pro and 32 GB RAM.
The version of Safari Technology Preview used is Release 219 (Safari 18.4, WebKit 20622.1.12).
The version of XCode Instruments is 16.
XCode Instrument profiles were recorded twice once with CPU profiler preset, another with Time profiler preset.
Each XCode trace file has 2 sessions one with data for GPU process and one with data for WebContent process.
The trace files produce by Time Profiler were converted to format accepted by https://profiler.firefox.com/ with [instruments-to-gecko](https://github.com/benjaminRomano/instruments-to-gecko) tool.

## Single H264 encoded 4k video with 60 FPS played from file

**Goal**: Estimate how much browser consumes CPU resources to play high resolution high frame rate video.

The demo is video playback of 4k@60 fps video via `<video>` element.

* [Open](https://mstyura.github.io/webkit-issues/video-transform-pipeline/00-one-video/index.html) demo; 
* [View source of `index.html`](https://github.com/mstyura/webkit-issues/blob/main/video-transform-pipeline/00-one-video/index.html);
* [Open](https://share.firefox.dev/440aoPu) WebGPU profile;
* [Open](https://share.firefox.dev/4jqTmOV) WebContent profile;
* [Download](https://mstyura.github.io/webkit-profiler-data/cpu-profiler/00-one-video.trace.tar.gz) XCode trace file (CPU profiler);
* [Download](https://mstyura.github.io/webkit-profiler-data/time-profiler/00-one-video.trace.tar.gz) XCode trace file (Time profiler);

<details>
<summary>
Activity Monitor screenshot
</summary>

![Activity Monitor](./00-one-video/resources/activity-monitor.png)
</details>


## Render video captured by local camera in 1080p 30fps

**Goal**: Estimate how much CPU resources consumed by browser to capture and render high resolution video from camera;

The demo request camera when user clicks on button and renders captured `MediaStream` via `<video>` element;

* [Open](https://mstyura.github.io/webkit-issues/video-transform-pipeline/01-one-camera-video/index.html) demo;
* [View source of `index.html`](https://github.com/mstyura/webkit-issues/blob/main/video-transform-pipeline/01-one-camera-video/index.html);
* [Open](https://share.firefox.dev/4juw2A5) WebGPU profile;
* [Open](https://share.firefox.dev/3SvQOUT) WebContent profile;
* [Download](https://mstyura.github.io/webkit-profiler-data/cpu-profiler/01-one-camera-video.trace.tar.gz) XCode trace file (CPU profiler);
* [Download](https://mstyura.github.io/webkit-profiler-data/time-profiler/01-one-camera-video.trace.tar.gz) XCode trace file (Time profiler);

<details>
<summary>
Activity Monitor screenshot
</summary>
![Activity Monitor](./01-one-camera-video/resources/activity-monitor.png)
</details>


## Render moving triangle on 4k `<canvas>` via `WebGL` on main thread;

**Goal**: Estimate how much CPU resources consumed rendering one of the simplest `WebGL` program when rendering in 4k with 60 FPS.

The demo renders spinning triangle on 4k `<canvas>`.

* [Open](https://mstyura.github.io/webkit-issues/video-transform-pipeline/02-triangle-canvas-main/index.html) demo;
* [View source of `index.html`](https://github.com/mstyura/webkit-issues/blob/main/video-transform-pipeline/02-triangle-canvas-main/index.html);
* [Open](https://share.firefox.dev/4klHxe9) WebGPU profile;
* [Open](https://share.firefox.dev/43v7ZfG) WebContent profile;
* [Download](https://mstyura.github.io/webkit-profiler-data/cpu-profiler/02-triangle-canvas-main.trace.tar.gz) XCode trace file (CPU profiler);
* [Download](https://mstyura.github.io/webkit-profiler-data/time-profiler/02-triangle-canvas-main.trace.tar.gz) XCode trace file (Time profiler);

<details>
<summary>
Activity Monitor screenshot
</summary>

![Activity Monitor](./02-triangle-canvas-main/resources/activity-monitor.png)
</details>


## Mirror 4k `<canvas>` to `<video>` element via `HTMLCanvasElement.captureStream`

**Goal**: Estimate overhead of `HTMLCanvasElement.captureStream` implementation;

The demo renders spinning triangle on 4k `<canvas>` which is then captured as `MediaStream` which is displayed on neighbor `<video>` on page.

* [Open](https://mstyura.github.io/webkit-issues/video-transform-pipeline/03-triangle-canvas-main-capture-stream-mirror/index.html) demo;
* [View source of `index.html`](https://github.com/mstyura/webkit-issues/blob/main/video-transform-pipeline/03-triangle-canvas-main-capture-stream-mirror/index.html);
* [Open](https://share.firefox.dev/4jufNTp) WebGPU profile;
* [Open](https://share.firefox.dev/3SB1amu) WebContent profile;
* [Download](https://mstyura.github.io/webkit-profiler-data/cpu-profiler/03-triangle-canvas-main-capture-stream-mirror.trace.tar.gz) XCode trace file (CPU profiler);
* [Download](https://mstyura.github.io/webkit-profiler-data/time-profiler/03-triangle-canvas-main-capture-stream-mirror.trace.tar.gz) XCode trace file (Time profiler);

<details>
<summary>
Activity Monitor screenshot
</summary>

![Activity Monitor](./03-triangle-canvas-main-capture-stream-mirror/resources/activity-monitor.png)
</details>


## Render moving triangle on 4k `OffscreenCanvas` via `WebGL` on worker;

**Goal**: Estimate the CPU overhead of magic behind keeping in sync the content of `<canvas>` which has associated `OffscreenCanvas`.

The demo has regular `<canvas>` which has associated `OffscreenCanvas` obtained with `transferControlToOffscreen`. The `OffscreenCanvas` is transferred to `Worker` and used to render spinning triangle in 4k 60 FPS.

* [Open](https://mstyura.github.io/webkit-issues/video-transform-pipeline/04-triangle-canvas-worker/index.html) demo;
* [View source of `index.html`](https://github.com/mstyura/webkit-issues/blob/main/video-transform-pipeline/04-triangle-canvas-worker/index.html);
* [View source of `worker.js`](https://github.com/mstyura/webkit-issues/blob/main/video-transform-pipeline/04-triangle-canvas-worker/worker.js);
* [Open](https://share.firefox.dev/45CKsKU) WebGPU profile;
* [Open](https://share.firefox.dev/4kPkZT8) WebContent profile;
* [Download](https://mstyura.github.io/webkit-profiler-data/cpu-profiler/04-triangle-canvas-worker.trace.tar.gz) XCode trace file (CPU profiler);
* [Download](https://mstyura.github.io/webkit-profiler-data/time-profiler/04-triangle-canvas-worker.trace.tar.gz) XCode trace file (Time profiler);

<details>
<summary>
Activity Monitor screenshot
</summary>

![Activity Monitor](./04-triangle-canvas-worker/resources/activity-monitor.png)
</details>


## Produce `MediaStreamTrack` via `VideoTrackGenerator` from `OffscreenCanvas` rendered in `Worker`.

**Goal**: Estimate the CPU usage of producing `MediaStreamTrack` from `OffscreenCanvas` rendered in `Worker`.

The demo creates `OffscreenCanvas` within `Worker` and use it to render rotating triangle. The `VideoTrackGenerator` is used to produce the frames rendered by canvas as `MediaStreamTrack` by using `VideoTrackGenerator` to produce `new VideoFrame(offscreenCanvas)`.

**Observations**: Amount of copying done is astonishing

* [Open](https://mstyura.github.io/webkit-issues/video-transform-pipeline/05-triangle-offscreen-video-track-generator/index.html) demo;
* [View source of `index.html`](https://github.com/mstyura/webkit-issues/blob/main/video-transform-pipeline/05-triangle-offscreen-video-track-generator/index.html);
* [View source of `worker.js`](https://github.com/mstyura/webkit-issues/blob/main/video-transform-pipeline/05-triangle-offscreen-video-track-generator/worker.js);
* [Open](https://share.firefox.dev/4jy8DO6) WebGPU profile;
* [Open](https://share.firefox.dev/3SyPUa5) WebContent profile;
* [Download](https://mstyura.github.io/webkit-profiler-data/cpu-profiler/05-triangle-offscreen-video-track-generator.trace.tar.gz) XCode trace file (CPU profiler);
* [Download](https://mstyura.github.io/webkit-profiler-data/time-profiler/05-triangle-offscreen-video-track-generator.trace.tar.gz) XCode trace file (Time profiler);

<details>
<summary>
Activity Monitor screenshot
</summary>

![Activity Monitor](./05-triangle-offscreen-video-track-generator/resources/activity-monitor.png)
</details>
