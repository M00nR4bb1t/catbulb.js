# catbulb.js ![icon](_favicon.ico)
*[English](https://github.com/M00nR4bb1t/catbulb.js/blob/master/README.md) / 한국어*

## 목차
- [catbulb.js](#catbulbjs-icon)
  - [목차](#%EB%AA%A9%EC%B0%A8)
  - [설치](#%EC%84%A4%EC%B9%98)
    - [빠른 설치](#%EB%B9%A0%EB%A5%B8-%EC%84%A4%EC%B9%98)
    - [상세 설치](#%EC%83%81%EC%84%B8-%EC%84%A4%EC%B9%98)
    - [알아 둘 것들](#%EC%95%8C%EC%95%84-%EB%91%98-%EA%B2%83%EB%93%A4)
  - [기능](#%EA%B8%B0%EB%8A%A5)

>**DISCLAIMER: 본 README는 현재 갱신되고 있지 않습니다.**

>**DISCLAIMER: catbulb는 현재 개발의 극초기 단계에 있습니다. 이에 따라, 본 README의 본문에서 언급될 기능들 중 일부는 아직 구현되지 않았을 수 있습니다. 이러한 기능들은 (Features 섹션에서처럼 체크박스 등으로 따로 표기되지 않은 경우) ~~취소선을 통해~~ 표기되어 있습니다.<br><br>본 README는 [원본 README](https://github.com/M00nR4bb1t/catbulb.js/blob/master/README.md)의 번역본입니다. 원본에 비하여 수정이 늦어질수 있는 점 양해 부탁드립니다.**

***catbulb.js***는 JavaScript JRPG풍 어드벤쳐 게임 프레임워크입니다. ([데모](https://catbulb-demo.herokuapp.com)) [PixiJS](http://pixijs.com)를 기반으로 하여 WebGL과 HTML5 Canvas API 둘 모두를 지원하며, [Electron](https://electronjs.org/) 따위를 통해 데스크탑으로도 쉽게 포팅 가능합니다.

catbulb를 통해서 게임을 개발하는 데에는 코드가 필요하지 않습니다<sup id="a1">[[1]](#footnote1)</sup>! ~~모든 데이터를 하나의 JSON파일로부터 읽어들일 뿐만 아니라~~ [Tiled](https://www.mapeditor.org/) 맵 파일 (.json) 까지 지원하고 있거든요. 하지만 동시에, catbulb는 ES6 Class 를 채용합니다. 따라서, 필요하시다면 약간의 코딩만으로 기능을 추가/변경할 수 있습니다.

현재, catbulb는 개발의 극초기 단계에 있으며 기본적인 기능 여럿을 지원하고 있지 않습니다. 그러므로, 지금으로써는 catbulb를 개발에 사용하는 것을 추천드리지 않습니다. (LICENSE 파일이 없는 이유가 바로 이것입니다.) 그럼에도 catbulb를 사용하고 싶으시다면, [issue를 생성해 주세요](https://github.com/M00nR4bb1t/catbulb.js/issues/new).

## 설치

### 빠른 설치

여러분의 컴퓨터에 파이썬이 설치되어 있다는 가정 하에, 아래 커맨드를 사용하여 catbulb를 설치하고 개발용 웹 서버를 설정할 수 있습니다.

```shell
git clone https://github.com/M00nR4bb1t/catbulb.js.git
cd catbulb.js
python -m http.server 5000
```
혹은, 파이썬 버전 2.* 이하를 사용하고 계신다면,
```shell
git clone https://github.com/M00nR4bb1t/catbulb.js.git
cd catbulb.js
python -m SimpleHTTPServer 5000
```

위 커맨드가 정상적으로 적용된다면, [localhost:5000](http://localhost:5000)에 웹 서버가 열린 것을 보실 수 있을 겁니다!

### 상세 설치

먼저, `git clone`을 사용하여 catbulb를 설치하세요.

```shell
git clone https://github.com/M00nR4bb1t/catbulb.js.git 
```

`catbulb.js/`에 작동하는 catbulb 데모가 설치된 것을 보실수 있을 겁니다.


'catbulb.js/'폴더의 디렉토리 구조는 아래와 같습니다 (Git 관련 파일이나 README 파일등은 제외하고요.):

```
catbulb.js/
├── sources/
│   ├── entity.js
│   ├── events.js
│   ├── main.js
│   ├── player.js
│   ├── tilemap.js
│   ├── triggers.js
│   ├── utilities.js
│   │
│   └── data.js
├── assets/
│   ├── .../
│   └── └── ...
├── build.py
├── index.html
├── index.php
├── pixi.min.js
├── SAT.min.js
└── style.css
```

catbulb 소스 파일을 수정하실 계획이 없다면, 본 레포지토리에 포함되어 있는 `build.py` 파이썬 스크립트를 통해 소스 파일들을 합칠 수 있습니다. catbulb와 catbulb의 모든 dependency들을 `catbulb.min.js` 파일 하나로 결합 및 경량화 시키시려면, 아래 커맨드를 사용하세요. 아래 파이썬 스크립트는 JS 경량화에 [JavaScript Minifier Web API](https://javascript-minifier.com/)를  사용하므로, 인터넷 연결 없이는 작동하지 않는다는 점을 유의해 주세요.

```shell
python ./build.py -- includeDependencies catbulb.min.js
```
혹은,
```shell
chmod +x build.py
./build.py --includeDependencies catbulb.min.js
```
위 스크립트를 실행하셨다면, `<body>`의 끝에 아래 코드를 더하는 것 만으로 catbulb를 여러분의 프로젝트에 포함시킬 수 있습니다:
```html
<!-- 당연하지만, 데이터 파일은 그래도 필요하죠. -->
<script src="data.js"></script>
<script src="catbulb.min.js"></script>
```

만약 catbulb 소스 파일을 수정할 계획이시라면 `source/` 안의 JS 파일 모두와 `SAT.min.js`, 그리고 `pixi.min.js`를 `<body>` 끝에 아래와 같이 포함시키시면 됩니다 (제대로 작동하지 않는다면 소스 파일의 순서를 확인해 주세요!):

```html
<!-- Dependencies -->
<script src="pixi.min.js"></script>
<script src="SAT.min.js"></script>

<!-- catbulb Source Files -->
<script src="sources/data.js"></script>

<script src="sources/utilities.js"></script>
<script src="sources/entity.js"></script>
<script src="sources/events.js"></script>
<script src="sources/triggers.js"></script>
<script src="sources/player.js"></script>
<script src="sources/tilemap.js"></script>
<script src="sources/main.js"></script>
```

### 알아 둘 것들

* 어떠한 이유로 dependency들은 ([PixiJS](http://www.pixijs.com), [SAT.js](http://jriecken.github.io/sat-js/)) 제외하고 오로지 catbulb 소스 파일들 만을 결합 및 경량화 시키시고 싶다면, `build.py`를 `--includeDependencies` 플래그 없이 실행 시키시면 됩니다.

## 기능
* [ ] Player
   * [x] 걷기
   * [ ] 뛰기
* [x] Tilemap
   * [x] 타일 렌더링
   * [ ] 타일 애니매이션
* [ ] Events & Triggers
   * [x] `EventPlayer` & `Trigger`
   * [x] Message 이벤트
   * [x] MapChange 이벤트
* [ ] Loader
   * [ ] data.js
      * [x] 에셋 목록
      * [x] 맵
      * [x] 타일셋
      * [x] 이벤트 & 트리거
      * [x] 비트맵 폰트
      * [ ] 플레이어 파티 목록
      * [ ] SE & BGM
      * [ ] ...
   * [x] Tiled JSON 로더
* [ ] `BitmapText`
   * [ ] 글리프
      * [x] ASCII
      * [x] 한글 조합형
      * [ ] 한글 완성형
      * [ ] 히라가나 & 가타카나
      * [ ] 한자 (일본)
      * [ ] Latin Extended
      * [ ] 한자 (중국, 번체)
      * [ ] 한자 (중국, 간체)
      * [ ] ...
   * [ ] 서식
      * [x] 텍스트 흔들림
      * [x] 텍스트 색상
      * [ ] 텍스트 크기
      * [x] 자동 줄바꿈
* [ ] 인벤토리 시스템
   * [ ] ...
* [ ] 전투 시스템
   * [ ] ...

***
<span id="footnote1">[[1]](#a1)</span> `data.js`는 사실상 JSON이므로, 코드로 치지 않습니다.