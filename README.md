# 프로젝트 소개

### 목적: 지도 기반으로 버스 정류장/노선/도착 정보를 빠르게 조회하고, 데스크톱(Electron) 환경에서도 사용할 수 있는 통합 버스 정보 앱.

### 구성: React(Web) + Express(API) + Electron(데스크톱) 모노레포.

### 주요 기능

- 정류장 주변 탐색: 위경도 기준 근처 정류장 목록 조회
- 정류장 상세: 정류장 경유 노선, 첫차/막차 정보
- 실시간 도착: 노선별 도착 예정 정보 정렬 표시(“곧도착” 처리)
- 노선 경로: 노선의 경유 정류장 목록/순서 표시
- 검색: 정류장명/노선번호 통합 검색
- 로컬 DB 초기화: 공공데이터 API로 MongoDB 시드

### 모노레포 구조

- apps/web: React + Vite + Tailwind + MapLibre UI
- apps/server: Express API 서버
- apps/electron: 데스크톱 실행용 Electron
- /packages/ui: 공용 UI 컴포넌트

### 기술 스택

프론트엔드: React 19, Vite, TailwindCSS, MapLibre GL
백엔드: Node.js, Express, Axios
데스크톱: Electron
데이터: MongoDB
툴링: Nx, TypeScript, Vitest, ESLint/Prettier

### 개발 실행

전체(서버+웹+Electron): yarn dev
개별 실행: yarn server, yarn web, yarn electron
포트: --

### API 요약

GET /api/stop?lat&lng: 위경도 주변 정류장 목록
GET /api/stop-info?nodeId&cityCode: 정류장 경유 노선
GET /api/arrival?stopId&routeId&cityCode: 실시간 도착 정보
GET /api/bus-line/:routeid: 노선 경유 정류장 목록(정렬)
GET /api/search?q=키워드: 정류장/노선 통합 검색(Mongo)
시드용(운영 차단 권장)
GET /api/init/bus-stops: 정류장 데이터 MongoDB 저장
GET /api/init/bus-numbers: 노선 데이터 MongoDB 저장

### 개발 메모

웹 개발 서버는 /api를 VITE_SERVER_URL로 프록시합니다.
서버는 CORS 활성화 상태입니다.
BUSSTOP_SERVICE_KEY는 공공데이터포털 키가 필요합니다.

### 빌드/배포

Electron 패키징: cd bus-app && yarn nxe:make:app
웹 정적 빌드/서버 번들: Nx 스크립트 사용 가능 (nx build ...)
