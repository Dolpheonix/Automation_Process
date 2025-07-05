# 🛠 Automation Process 사용방법

Node.js 기반 자동화 데스크톱 앱입니다.  
> Git Puller : 지정한 폴더들의 `git pull`을 실행하고, 결과를 상태 아이콘 및 로그로 표시합니다.

---

## 파일 생성 & 실행

### 1. `config.json` 생성

```json
{
  "folders": [
    "C:\\Users\\user\\Type\\Your\\Folder"
  ]
}
```
> 앱 실행 시 자동으로 이 목록을 로드합니다.

---

### 2. 설치

```bash
npm install
```

```bash
npm run dist
```

> 실행 시 지정한 폴더들의 목록과 `Git Pull` 버튼이 표시됩니다.

---

## 기능 요약

| 기능                     | 설명 |
|--------------------------|------|
| ➕ 폴더 추가             | 추가적으로 Git 저장소 폴더를 등록 |
| 🔁 전체 Pull             | 모든 폴더에 대해 순차적으로 `git pull` 실행 |
| 🔄 개별 Pull             | 폴더 하나만 `git pull` 실행 |
| 🗑️ 폴더 삭제            | 해당 폴더 목록에서 제거 |
| ✅ / ❌ 상태 표시        | Pull 성공 / 실패 유무 표시 |
| 출력 로그                | 하단에 각 `git pull` 결과 로그 표시 |

---

## 필요 조건

- Node.js 18 이상
- Git CLI (`git` 명령어 실행 가능)
- Electron 환경 (`npm install`로 자동 설치됨)


