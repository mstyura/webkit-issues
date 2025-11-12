
## Benchmarks of VideoFrame construction from a `Uint8Array` with a pixel data for `1920x1920` frame.
* [VideoFrame from BGRA buffer](https://mstyura.github.io/webkit-issues/video-frame-construction/video-frame-construct-from-pixel-buffer-bgra.html);
* [VideoFrame from BGRX buffer](https://mstyura.github.io/webkit-issues/video-frame-construction/video-frame-construct-from-pixel-buffer-bgrx.html);
* [VideoFrame from RGBA buffer](https://mstyura.github.io/webkit-issues/video-frame-construction/video-frame-construct-from-pixel-buffer-rgba.html);
* [VideoFrame from RGBX buffer](https://mstyura.github.io/webkit-issues/video-frame-construction/video-frame-construct-from-pixel-buffer-rgbx.html);
* [VideoFrame from Canvas](https://mstyura.github.io/webkit-issues/video-frame-construction/video-frame-construct-from-canvas.html) <span style="color:red">*DO NOT OPEN IN CHROME, FOR SOME REASON IT DOES NOT DEALLOCATE MEMORY AND MAKE MacOS crash and reboot*</span>;
* [VideoFrame from OffscreenCanvas](https://mstyura.github.io/webkit-issues/video-frame-construction/video-frame-construct-from-offscreen-canvas.html) <span style="color:red">*DO NOT OPEN IN CHROME, FOR SOME REASON IT DOES NOT DEALLOCATE MEMORY AND MAKE MacOS crash and reboot*</span>;
* [Draw VideoFrame constructed from Canvas](https://mstyura.github.io/webkit-issues/video-frame-construction/drawImageSourceVideoFrameCanvasWebGL.html) <span style="color:red">*DO NOT OPEN IN CHROME, FOR SOME REASON IT DOES NOT DEALLOCATE MEMORY AND MAKE MacOS crash and reboot*</span>;
* [Draw VideoFrame constructed from OffscreenCanvas](https://mstyura.github.io/webkit-issues/video-frame-construction/drawImageSourceVideoFrameOffscreenCanvasWebGL.html) <span style="color:red">*DO NOT OPEN IN CHROME, FOR SOME REASON IT DOES NOT DEALLOCATE MEMORY AND MAKE MacOS crash and reboot*</span>;
