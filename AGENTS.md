<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Task handoff (TASK.json)

- 작업 지시는 레포 루트 `TASK.json`에 있다. "TASK.json 읽고 구현해"라는 요청을 받으면 `layer`, `goal`, `context`, `scope`, `done`을 읽고 그대로 구현한다.
- `goal`·`context`·`scope`·`done`·`layer`·`dataset`은 수정하지 않는다. 갱신하는 필드는 `status`와 `result`뿐이다. 착수 시 `in_progress`, 완료 시 `done`, 막히면 `blocked`와 이유를 기록한다.
- `result`에는 변경 요약, 건너뛴 항목과 이유, 빌드·린트 결과, `git diff --stat` 요약을 적는다. 커밋 해시는 `git log`로 확인한다. 스키마 작업이면 해당 타입을 읽는 GROQ 쿼리·컴포넌트 전수 목록도 적는다.
- `layer`가 `research`이면 어떤 파일도 만들거나 수정하지 않고 조사 결과만 `result`에 적는다.
- 데이터셋은 `development`만 쓴다. `production` 접근, Sanity 문서 직접 생성·수정·삭제, 쓰기 토큰 사용은 하지 않는다. 필요해 보이면 변경하지 말고 `result`에 보고하고 `blocked`로 둔다.
- 스키마 필드 삭제·이름 변경·타입 변경은 하지 않는다. 필요해 보이면 영향 범위를 `result`에 보고한다.
- `.env*` 내용은 출력·커밋하지 않는다. 비밀값은 환경변수로만 다루고 서버 전용 키에는 `NEXT_PUBLIC_`를 붙이지 않는다.
- `scope.out`에 해당하는 수정이 필요해 보이면 변경하지 말고 `result`에 보고한다. `done` 항목을 모두 만족하지 못하면 `blocked`로 기록한다.
- 지시보다 나은 설계나 놓친 리스크가 보이면 반박하고 대안을 제안한다.
- 커밋·push: `status`가 `done`일 때만 한다. `TASK.json`, `docs/tasks/`, `feature_list/` 변경을 함께 담고, 메시지는 `feat|fix|chore|docs(범위): 요약`에 작업 ID를 적는다. `.env*`·토큰 파일은 add하지 않고, `git add -A` 대신 대상 파일을 확인한 뒤 add한다. force push와 이미 push한 이력 수정은 금지다. push 실패는 우회하지 말고 보고한다.
- `TASK.json`은 작업 1건만 담는다. 새 작업을 쓰기 전에 기존 내용을 `docs/tasks/{id}.json`으로 보관한 뒤 덮어쓴다. 보관 파일은 수정하지 않는다.
- 새 기능 작업은 `feature_id`로 `feature_list/` 항목과 연결한다. 기능 스펙은 feature_list가 원본이다. `passes`는 JW 또는 플래너(Claude)만 갱신하며 Cursor와 Claude Code는 건드리지 않는다.
- 전체 파일 재작성 금지, 변경되는 부분만 최소 수정한다. 요청받지 않은 기능·추상화·리팩터링을 추가하지 않는다. 인접 코드를 임의로 개선하지 않고, 내 변경이 만든 미사용 코드만 정리한다.
- UI 규칙: window.confirm / alert / prompt를 쓰지 않고 인라인 확인 UI를 쓴다(개발 확인이 Tauri 웹뷰라 깨질 수 있음). 모바일 기준은 입력창 글자 16px 이상, 본문 16px 이상, 메타·라벨 12px 이상, 터치 영역 44px 이상이며 핀치 확대를 막지 않는다. 반응형 확인은 390 / 800 / 1024 / 1440px다.
- 빌드·정적 검증 명령은 npm run build와 npm run lint다. 이 레포에는 tsc, build:verify 스크립트가 없다. docs layer 작업은 빌드 검증을 요구하지 않는다.
- 구현 전 참고: docs/content-model.md(콘텐츠 모델, AI 입력·출처 규칙), docs/design/README.md와 docs/design/DESIGN.md(디자인 기준과 제외 요소). docs/design/mockups는 참고용이며 시안의 가짜 문구·제외 요소·CDN 링크는 가져오지 않는다. 색은 src/app/(site)/site.css 토큰에만 정의하고 컴포넌트에 색 코드를 직접 쓰지 않는다.
