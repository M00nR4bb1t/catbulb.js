varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
    vec4 color = texture2D(uSampler, vTextureCoord);
    float rgbMax = max(max(color.r, color.g), color.b);
    gl_FragColor = vec4(rgbMax, 0, 0, color.a);
}