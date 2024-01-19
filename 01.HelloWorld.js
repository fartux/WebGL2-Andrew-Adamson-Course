const vertexShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: vert

void main()
{

    gl_PointSize = 100.0;
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}`;

const fragmentShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: frag

// float precision im fragment shader definieren (Bei anderen Datentypen optional)
precision mediump float;

out vec4 fragColor;

void main()
{
    fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`;

// Canvas definieren
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');

// Programm erstellen
const program = gl.createProgram();

// Shader: Create -> Set GLSL Source -> Compile -> Attach
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
gl.attachShader(program, vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
gl.attachShader(program, fragmentShader);

// Programm linken
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    console.log(gl.getShaderInfoLog(fragmentShader));
}

// Programm benutzen
gl.useProgram(program);

gl.drawArrays(gl.POINTS, 0, 1);