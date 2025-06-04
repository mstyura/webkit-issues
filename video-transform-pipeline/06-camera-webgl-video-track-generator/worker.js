let animationWorker = null;

self.onmessage = function(e) {
    switch (e.data.msg) {
    case 'init':
        self.onmessage = null;
        const inputVideoTrack = e.data.inputVideoTrack;
        runVideoEffect(inputVideoTrack);
        break;
    }
};

const runVideoEffect = async (inputVideoTrack) => {
  const canvas = new OffscreenCanvas(3840, 2160);
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    throw new Error("WebGL not supported");
  }

  const videoTrackGenerator = new VideoTrackGenerator();
  const processor = new MediaStreamTrackProcessor({ track: inputVideoTrack });

  self.postMessage({
    msg: "videoTrack",
    videoTrack: videoTrackGenerator.track,
  }, [videoTrackGenerator.track]);

  const createProgram = (vs, fs) => {
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) {
        throw new Error("shader compile error");
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader));
      }

      return shader;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);

    return prog;
  };

  const videoVS = `#version 300 es
  in vec2 a_position;
  out vec2 v_texCoord;

  void main() {
      v_texCoord = (a_position + 1.0) * 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
  }`;

  const videoFS = `#version 300 es
  precision highp float;
  in vec2 v_texCoord;
  uniform sampler2D u_texture;
  out vec4 outColor;

  void main() {
      outColor = texture(u_texture, v_texCoord);
  }`;

  const triangleVS = `#version 300 es
  in vec2 a_position;
  uniform float u_time;

  void main() {
      float dx = 0.3 * sin(u_time * 0.8);
      float dy = 0.2 * cos(u_time * 1.2);
      gl_Position = vec4(a_position + vec2(dx, dy), 0.0, 1.0);
  }`;

  const triangleFS = `#version 300 es
  precision highp float;
  out vec4 outColor;

  void main() {
      outColor = vec4(1.0, 0.3, 0.1, 1.0);
  }`;

  const videoProgram = createProgram(videoVS, videoFS);
  const triangleProgram = createProgram(triangleVS, triangleFS);

  const quadBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const triangleBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0.0, 0.1, -0.1, -0.1, 0.1, -0.1]),
    gl.STATIC_DRAW
  );

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  let renderCount = 0;
  let lastNow = performance.now();
  let lastRenderCount = 0;
  await processor.readable
    .pipeThrough(
      new TransformStream({
        transform: async (videoFrame, controller) => {
          renderCount += 1;
          try {
            gl.useProgram(videoProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
            const pos1 = gl.getAttribLocation(videoProgram, "a_position");
            gl.enableVertexAttribArray(pos1);
            gl.vertexAttribPointer(pos1, 2, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(
              gl.TEXTURE_2D,
              0,
              gl.RGBA,
              gl.RGBA,
              gl.UNSIGNED_BYTE,
              videoFrame
            );

            const texLoc = gl.getUniformLocation(videoProgram, "u_texture");
            gl.uniform1i(texLoc, 0);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            gl.useProgram(triangleProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
            const pos2 = gl.getAttribLocation(triangleProgram, "a_position");
            gl.enableVertexAttribArray(pos2);
            gl.vertexAttribPointer(pos2, 2, gl.FLOAT, false, 0, 0);

            const timeLoc = gl.getUniformLocation(triangleProgram, "u_time");
            const time = performance.now() * 0.001;
            gl.uniform1f(timeLoc, time);

            gl.drawArrays(gl.TRIANGLES, 0, 3);

            const newFrame = new VideoFrame(canvas, {
              timestamp: videoFrame.timestamp,
            });

            controller.enqueue(newFrame);

            const now = performance.now();
            if (now - lastNow > 1000) {
                const renderedFrames = (renderCount - lastRenderCount);
                const elapsedTime = (now - lastNow);

                const fps = 1000 * (renderedFrames / elapsedTime);

                self.postMessage({msg: "fps", fps: fps});

                lastNow = now;
                lastRenderCount = renderCount;
            }
          } finally {
            videoFrame.close()
          }
        },
      })
    )
    .pipeTo(videoTrackGenerator.writable);
};
