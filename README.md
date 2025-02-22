## 프로젝트 소개

아뮤즈 과제로 만든 할 일 관리 앱입니다.

리액트와 타입스크립트 Vite로 구성하였으며, 라우터는 React Router, 상태관리는 React Query, 폼 관리는 React Hook Form, 유효성 검사는 Zod, 디자인 시스템은 Shadcn UI를 사용했습니다.

UI를 만들기보단 코드 구조에 집중하였기 때문에 디자인은 최대한 단순하게 Shadcn UI를 사용하였으며, 간단하게 FSD 아키텍처를 이용하여 코드를 구조화하였습니다.

API를 직접 만들기 보다는 JSON-SERVER를 이용하여 간단한 서버를 구축하였습니다.

필수 구현기능이었던 TODO CURD 기능, 검색기능, 우선순위 기능을 구현하였으며, 추가적으로 특정 기준으로 필터링, 모바일 환경에서 더 좋은 경험을 주기 위해 반응형 레이아웃을 적용하였습니다.

테스트 코드는 순수 함수들을 이용한 함수들에 유닛테스트만 작성했습니다.

## 사용 기술

- React
- TypeScript
- TailwindCSS
- React Query
- React Hook Form
- React Router
- Zod
- Shadcn UI
- Vite
- Vitest

## 실행 방법

1. 프로젝트 폴더로 이동
2. `yarn install`
3. `yarn server`
4. `yarn dev`

## 테스트 방법

1. 프로젝트 폴더로 이동
2. `yarn test`
