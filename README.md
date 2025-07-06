
---

# 🛠 Automation Process

Node.js 기반의 Git 자동화 데스크톱 애플리케이션입니다.

> Git Puller, Package Manager 기능을 통해 프로젝트 폴더를 관리하고 자동으로 최신 상태를 유지합니다.

---

## 📦 설치 및 실행

### 1. `config.json` 생성

```json
{
  "folders": [
    "C:\\Users\\user\\Type\\Your\\Folder"
  ]
}
```

* 앱 실행 시 해당 폴더 목록을 자동으로 로드합니다.

### 2. 앱 설치 및 빌드

```bash
npm install
npm run dist
```

* 빌드 후 실행 파일이 `dist/` 폴더에 생성됩니다.

---

## 🧩 주요 기능

| 기능          | 설명                                      |
| ----------- | --------------------------------------- |
| ➕ 폴더 추가     | Git 저장소 폴더를 수동으로 추가                     |
| 🔁 전체 Pull  | 등록된 모든 폴더에 대해 `git pull` 실행             |
| 🔄 개별 Pull  | 특정 폴더만 `git pull` 실행                    |
| 🗑️ 폴더 삭제   | 목록에서 폴더 제거                              |
| ✅ / ❌ 상태 표시 | Pull 성공/실패 여부 표시                        |
| 📄 출력 로그    | 각 `git pull` 결과를 로그로 표시                 |
| 📦 패키지 매니저  | Node.js, Python 프로젝트의 패키지 목록 및 최신 버전 확인 |
| 🔁 전체 Check | 모든 프로젝트의 패키지 최신 버전 일괄 확인                |
| ⬆️ / ✅ / ❓  | 패키지 상태: 업데이트 필요 / 최신 / 확인 불가            |

---

## 💡 사용 환경

* Node.js 18 이상
* Git CLI (환경변수 등록 필수)
* Python (선택, Python 프로젝트 지원 시)
* Electron (자동 설치됨)

---

## ⚙️ 빌드/배포 주의사항

### 📁 `assets/` 폴더

* 이미지 및 아이콘 등 정적 리소스는 `assets/`에 위치
* `package.json`의 `extraResources` 또는 `asarUnpack` 설정으로 빌드 시 포함

### 🖼 이미지 경로

* Electron 빌드 환경에서는 정적 파일을 다음과 같이 동적으로 불러야 함:

```js
const iconPath = window.getAssetPath('assets/nodejs.png');
```

### ⚙️ config.json 경로

* 개발 환경: 프로젝트 루트의 `config.json` 사용
* 빌드 환경: Electron의 `app.getPath('userData')` 위치에 자동 저장/로드됨

---

## 📁 폴더 구조

```
Automation-process/
├── assets/              # 정적 리소스 (이미지, 아이콘 등)
├── renderer/            # 프론트엔드 HTML/JS
├── util/                # Node/Python 패키지 분석 유틸
├── preload.js           # Electron preload 스크립트
├── app.js               # Electron 메인 프로세스
├── package.json
└── README.md
```

---