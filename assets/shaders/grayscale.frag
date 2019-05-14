varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
    vec4 color = texture2D(uSampler, vTextureCoord);
    float rgbMean = (color.r + color.g + color.b) / 3.0;
    gl_FragColor = vec4(rgbMean, rgbMean, rgbMean, color.a);
}