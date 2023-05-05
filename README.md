# TILTIT


TILTIT은 핸드폰을 기울여, 몬스터를 피하며 미로를 탈출해 목적지에 도달하는 게임입니다.

모바일 기기의 자이로스코프를 이용해, 캐릭터를 이동시킬 수 있으며, 다양한 아이템 및 몬스터와
상호작용 할 수 있습니다.

<br>
<br>

# 📖 목차
- 🔥 Motivation
- 💻 Development
  + Gyroscope의 값으로 캐릭터를 어떻게 이동시킬 수 있을까?
    1) x, y 축의 기울기 데이터만으로, 캐릭터의 대각선 이동 방향과 속도를 측정할 수 있을까?
    2) 이동 중이던 캐릭터에 새로운 기울기 데이터가 입력됐을 때, 힘과 방향을 적용하려면 어떻게 해야 할까?
    3) 기울기의 정도에 따라 캐릭터에 적용되는 힘을 다르게 적용할 수 있을까?
  + 맵의 지형지물(미로)을 만들 때, 하드코딩하지 않는 방법은 없을까?
    1) 구글 spread sheet의 grid 형태를 활용해 미로를 구현해 보자
    2) 지형지물 컴포넌트가 spread sheet의 어느 column & row에 위치해 있는지 알면 실제 화면에서의 position과 width, height를 알아낼 수 있지 않을까?
- 🛠️ Optimization
  + 대형 맵을 만들었더니 과부하가 걸린다. 최적화를 할 수 있는 방법은 없을까?
    1) 너무 많은 컴포넌트를 한 번에 렌더링 시켰었다.
    2) 물리엔진에 전달되는 컴포넌트는 많은 cost가 소요된다.
    3) audio effect가 메모리 누수를 발생시키고 있었다.
- 🎞️ Animation
  + 게임의 동적 요소를 어떻게 살릴 수 있을까?
    1) 애니메이션으로 fade-in/out 효과를 주어 화면 전환을 부드럽게!
    2) png 이미지를 동적으로 바꾸어 캐릭터 컴포넌트를 생동감 있게 표현하자
    3) 캐릭터가 몬스터와 충돌 시, 몬스터가 무적 캐릭터와 충돌 시 애니메이션 효과를 주자!
       * 사이드 이펙트에 따른 컴포넌트의 애니메이션 효과 부여
       * 최적화를 위해, 애니메이션 효과가 끝나면 컴포넌트 unMount!
    4) 몬스터가 배회하는 효과를 주자
       * 좌표가 이동되는 대형 맵을 구현하니 몬스터에 설정된 배회 좌표가 꼬여버렸다
- 🗓 Schedule
- 🛠 Tech Stacks
- 🔗 Repository Link
- 🧑‍💻 Member

<br>
<br>

# 🔥 Motivation

이번 개인 프로젝트의 메인 목표는 '**1. 동적인 요소와 2. UI/UX의 디테일을 살리고, 3. 스스로 메인 로직을 개발하여 프로젝트에 적용해 보자**'였습니다.

프로젝트 주제를 고민하다 보니, 게임을 개발하면 이번 프로젝트의 메인 목표들을 달성할 수 있을 것이라 생각했습니다. 

1) 게임은 사용자의 다양한 행동에 즉각적으로 반응해야 할 수밖에 없었기에, 첫 번째 목표였던 동적인 요소를 만들어 보는 경험을 쌓을 수 있을 것이라 생각했습니다.
2) 게임은 유저의 플레이 경험이 주요 개발 목표인 만큼. 설명이 필요 없는 직관적인 UI/UX가 필수적일 것이라 생각했고, 두 번째 목표였던 UI/UX의 디테일에 대해 많은 고민을 해볼 수 있을 것이라 생각했습니다.
3) 유저의 활동에 따라 게임오버, 몬스터 처치, 득점 등의 로직을 원하는 만큼 추가할 수 있을 것이라 생각했고, 
  Gyroscope로 개발할 경우 기기의 기울기에 따른 이동 거리 & 방향을 실시간으로 적용하는 과정에서 메인 로직을 개발해 보는 경험을 해볼 수 있을 것이라 생각했습니다.

무엇보다 그동안 배워왔던 웹 기반의 개발 경험을 게임에 어떻게 활용할 수 있을지, 예상하지 못했던 어떤 챌린지들이 있을지 경험해 보고 싶었습니다.

<br>
<br>

# 💻 Development
1) x, y 축의 기울기 데이터만으로, 캐릭터의 대각선 이동 방향과 속도를 측정할 수 있을까?
  + 캐릭터는 x축 혹은 y축 만으로 이동하는것이 아닌, 핸드폰의 기울어진 정도와 방향에 따라 대각선으로 이동 할 수 있어야 했습니다. Gyroscope는 x, y 축의 기울기 데이터를 제공하지만, 대각선의 각도와 값을 제공하지 않기 때문에, 어떻게 캐릭터를 대각선으로 이동시켜야 할 지 고민을 해야 했습니다. 방법은 벡터였습니다. 벡터는 수학개념으로 '**크기와 방향을 갖는 물리량**'을 의미합니다. 

