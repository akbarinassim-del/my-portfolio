/** GPU compositing for the RGB + alpha halves of our ordinary H.264 video.
 * Native WebM alpha is inconsistent on iOS; H.264 decoding works across engines.
 * Only decoded video frames trigger a draw; no per-frame pixel readback is used.
 */
export function createPortraitRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", {
    alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: true,
    antialias: false, depth: false, stencil: false, powerPreference: "low-power",
  });
  if (!gl) throw new Error("Portrait compositing unavailable");
  const shaders: WebGLShader[] = [];
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  const dispose = () => {
    shaders.forEach(shader => gl.deleteShader(shader));
    gl.deleteProgram(program); gl.deleteBuffer(buffer); gl.deleteTexture(texture);
  };
  try {
    for (const [type, source] of [
      [gl.VERTEX_SHADER, `attribute vec2 position;
        varying vec2 uv;
        void main() {
          uv = vec2((position.x + 1.0) * .5, (1.0 - position.y) * .5);
          gl_Position = vec4(position, 0.0, 1.0);
        }`],
      [gl.FRAGMENT_SHADER, `precision highp float;
        uniform sampler2D frame;
        varying vec2 uv;
        void main() {
          vec2 pixel = vec2(uv.x, uv.y * .5);
          vec3 color = texture2D(frame, pixel).rgb;
          float alpha = texture2D(frame, pixel + vec2(0.0, .5)).r;
          gl_FragColor = vec4(color * alpha, alpha);
        }`],
    ] as const) {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Portrait shader unavailable");
      shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("Portrait shader failed");
      gl.attachShader(program!, shader);
    }
    gl.linkProgram(program!);
    if (!gl.getProgramParameter(program!, gl.LINK_STATUS) || !buffer || !texture) throw new Error("Portrait renderer failed");
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program!, "position");
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(program!, "frame"), 0);
    gl.viewport(0, 0, canvas.width, canvas.height);
    return {
      draw(media: HTMLVideoElement) {
        if (gl.isContextLost() || media.videoWidth !== 1280 || media.videoHeight !== 1440) throw new Error("Portrait frame unavailable");
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, media);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      },
      hasTransparency() {
        const pixels = new Uint8Array(16);
        [[20, 360], [1260, 360], [640, 5], [640, 360]].forEach(([x, y], i) => {
          gl.readPixels(x, 719 - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels.subarray(i * 4, i * 4 + 4));
        });
        return pixels[3] < 16 && pixels[7] < 16 && pixels[11] < 16 && pixels[15] > 240;
      },
      dispose,
    };
  } catch (error) { dispose(); throw error; }
}
