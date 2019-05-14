varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
    float r = texture2D(uSampler, vTextureCoord + vec2(0.005, 0.005)).r;
    float g = texture2D(uSampler, vTextureCoord).g;
    float b = texture2D(uSampler, vTextureCoord + vec2(-0.005, -0.005)).b;
    float a = texture2D(uSampler, vTextureCoord).a;
    gl_FragColor = vec4(r, g, b, a);
}