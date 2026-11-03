import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;

// hash + value noise
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x),
             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<6;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * 3.0;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.06;

  // domain warp for flowing water-like motion
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 4.0*q + vec2(1.7, 9.2) + t*0.5),
                fbm(p + 4.0*q + vec2(8.3, 2.8) - t*0.5));
  float f = fbm(p + 4.0*r);

  vec3 col = mix(u_c1, u_c2, clamp(f*f*1.6, 0.0, 1.0));
  col = mix(col, u_c3, clamp(length(r) * 0.7, 0.0, 1.0));
  col = mix(col, u_c2, clamp(q.y * 0.6, 0.0, 1.0));

  // subtle moving highlight bands
  float band = 0.04 * sin((uv.y + r.x) * 20.0 + u_time * 0.4);
  col += band;

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToVec3(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  return [
    parseInt(v.slice(0, 2), 16) / 255,
    parseInt(v.slice(2, 4), 16) / 255,
    parseInt(v.slice(4, 6), 16) / 255,
  ];
}

interface WarpShaderProps {
  className?: string;
  colors?: [string, string, string];
}

export function WarpShader({
  className,
  colors = ["#0c3436", "#178c61", "#27be84"],
}: WarpShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    gl.uniform3fv(gl.getUniformLocation(program, "u_c1"), hexToVec3(colors[0]));
    gl.uniform3fv(gl.getUniformLocation(program, "u_c2"), hexToVec3(colors[1]));
    gl.uniform3fv(gl.getUniformLocation(program, "u_c3"), hexToVec3(colors[2]));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
    };
    resize();

    // Only read layout / resize the drawing buffer when the element actually
    // changes size — never inside the per-frame render loop (avoids thrash).
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    let raf = 0;
    let running = false;
    const start = performance.now();
    const render = () => {
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    const play = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(render);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pause GPU work when the canvas is scrolled off-screen or the tab is hidden.
    let onScreen = true;
    const sync = () => {
      if (onScreen && !document.hidden) play();
      else pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px" },
    );
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      gl.deleteProgram(program);
    };
    // colors is a fixed-length tuple; depend on its values so a new array
    // literal with identical colors does not rebuild the WebGL context.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors[0], colors[1], colors[2]]);

  return (
    <canvas ref={canvasRef} className={cn("h-full w-full block", className)} aria-hidden="true" />
  );
}

export default WarpShader;
