# catbulb.js
*[English](https://github.com/M00nR4bb1t/catbulb.js/blob/master/README.md) / 한국어*

## 목차
- [catbulb.js](#catbulbjs)
  - [목차](#%EB%AA%A9%EC%B0%A8)
  - [기능](#%EA%B8%B0%EB%8A%A5)

>**DISCLAIMER: catbulb는 현재 개발의 극초기 단계에 있습니다. 이에 따라, 본 README의 본문에서 언급될 기능들 중 일부는 아직 구현되지 않았을 수 있습니다. 이러한 기능들은 (Features 섹션에서처럼 체크박스 등으로 따로 표기되지 않은 경우) ~~취소선을 통해~~ 표기되어 있습니다.<br><br>본 README는 [원본 README](https://github.com/M00nR4bb1t/catbulb.js/blob/master/README.md)의 번역본입니다. 원본에 비하여 수정이 늦어질수 있는 점 양해 부탁드립니다.**

***catbulb.js***는 JavaScript JRPG풍 어드벤쳐 게임 프레임워크입니다. [PixiJS](http://pixijs.com)를 기반으로 하여 WebGL과 HTML5 Canvas API 둘 모두를 지원하며, [Electron](https://electronjs.org/) 따위를 통해 데스크탑으로도 쉽게 포팅 가능합니다.

catbulb를 통해서 게임을 개발하는 데에는 코드가 필요하지 않습니다<sup id="a1">[[1]](#footnote1)</sup>! ~~모든 데이터를 하나의 JSON파일로부터 읽어들일 뿐만 아니라~~ [Tiled](https://www.mapeditor.org/) 맵 파일 (.json) 까지 지원하고 있거든요. 하지만 동시에, catbulb는 ES6 Class 를 채용합니다. 따라서, 필요하시다면 약간의 코딩만으로 기능을 추가/변경할 수 있습니다.

현재, catbulb는 개발의 극초기 단계에 있으며 기본적인 기능 여럿을 지원하고 있지 않습니다. 그러므로, 지금으로써는 catbulb를 개발에 사용하는 것을 추천드리지 않습니다. (LICENSE 파일이 없는 이유가 바로 이것입니다.) 그럼에도 catbulb를 사용하고 싶으시다면, [issue를 생성해 주세요](https://github.com/M00nR4bb1t/catbulb.js/issues/new).

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
* [ ] Loader
   * [ ] data.json
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
<span id="footnote1">[[1]](#a1)</span> JSON은 *데이터 포맷*으로 코드로 치지 않습니다.