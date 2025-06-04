# WebKit-Issues
The repository with issues found in WebKit

1. Mobile Safari prevents concurrent playback of multiple `<video>` elements with sound even when playback is initiated by user: [demo link](https://mstyura.github.io/webkit-issues/audible-video-concurrent-playback/index.html).
1. When page has many `window.matchMedia` instances too much CPU time is spent within `MediaQueryEvaluator::evaluate` due to transient `RenderStyle` instances: [demo link](https://mstyura.github.io/webkit-issues/many-media-query-list/index.html).
1. Excessive memory copying when attempt to implement video processing pipeline with WebWorkers: [README.md](/video-transform-pipeline/README.md)