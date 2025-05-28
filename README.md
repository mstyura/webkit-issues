# WebKit-Issues
The repository with issues found in WebKit

1. Mobile Safari prevents concurrent playback of multiple `<video>` elements with sound even when playback is initiated by user: [demo link](https://mstyura.github.io/webkit-issues/audible-video-concurrent-playback/index.html).
1. When page has many `window.matchMedia` instances too much CPU time is spent within `MediaQueryEvaluator::evaluate` due to transient `RenderStyle` instances: [demo link](https://mstyura.github.io/webkit-issues/many-media-query-list/index.html). E.g. `Chrome` has 2-3% of CPU usage, while `Safari` has `100%` CPU usage on my machine.