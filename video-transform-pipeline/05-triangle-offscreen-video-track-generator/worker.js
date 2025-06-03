let animationWorker = null;

self.onmessage = function(e) {
    switch (e.data.msg) {
    case 'init':
        self.onmessage = null;
        runRotatingTriangle();
        break;
    }
};

const runRotatingTriangle = () => {
  const canvas = new OffscreenCanvas(3840, 2160);
  const gl = canvas.getContext('webgl');
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    throw new Error("WebGL not supported");
  }

  const vertexShaderSource = `
    attribute vec2 a_position;
    uniform float u_angle;
    void main() {
      float c = cos(u_angle);
      float s = sin(u_angle);
      gl_Position = vec4(
        c * a_position.x - s * a_position.y,
        s * a_position.x + c * a_position.y,
        0, 1
      );
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(0.0, 1.0, 0.5, 1.0);
    }
  `;

  function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile failed:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program failed to link:", gl.getProgramInfoLog(program));
    throw new Error("Program link error");
  }

  gl.useProgram(program);

  const vertices = new Float32Array([
    0, 0.5,
   -0.5, -0.5,
    0.5, -0.5
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const angleLocation = gl.getUniformLocation(program, "u_angle");

  gl.clearColor(0, 0, 0, 1);

  const { track: videoTrack, writable } = new VideoTrackGenerator();
  const framesWriter = writable.getWriter();

  let renderCount = 0;
  let lastNow = performance.now();
  let lastRenderCount = 0;

  async function render(time) {
    renderCount += 1;

    const angle = time * 0.002; // radians per ms

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(angleLocation, angle);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    const now = performance.now();
    if (now - lastNow > 1000) {
        const renderedFrames = (renderCount - lastRenderCount);
        const elapsedTime = (now - lastNow);

        const fps = 1000 * (renderedFrames / elapsedTime);

        self.postMessage({msg: "fps", fps: fps});

        lastNow = now;
        lastRenderCount = renderCount;
    }
    const videoFrame = new VideoFrame(canvas, { timestamp: performance.now() });
    try {
      await framesWriter.write(videoFrame);
    } finally {
      videoFrame.close();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  self.postMessage({
    msg: "videoTrack",
    videoTrack: videoTrack,
  }, [videoTrack]);
}