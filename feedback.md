# UX-001 검증 결과 (T-010, 커밋 3d7f189)

**결론: UX-001 steps 미충족 — 10개 step 중 9개 충족, step 8(/studio "기존처럼")이 FAIL(경미한 회귀). 그 외 지시서 7번의 "링크 터치 높이 44px"는 헤더 링크가 미달(UX-001 step 6 문구는 메뉴 버튼만 요구하므로 step 자체는 충족).**

- 검증일: 2026-11-13 / 검증자: Claude Code (코드 수정 없음, 이 파일만 작성)
- 환경: `next build` 산출물을 `next start -p 3100`으로 띄워 측정. /studio 렌더는 Sanity CORS 등록 포트인 기존 dev 서버(:3000, 같은 HEAD)에서 확인(:3100은 CORS 미등록이라 Studio가 "Connect this studio" 화면을 띄움 — 구현 문제 아님).
- 측정 도구: Claude 내장 브라우저(Chromium) 뷰포트 에뮬레이션 + `getComputedStyle`/`document.fonts`/Performance API, `curl` HTML 비교, `grep`.
- 스크린샷 경로는 이 세션의 캡처 파일(로컬): `~/.claude/projects/-Users-yooyoo-vibe-wpc/1973d6e6-e3f2-4e0b-9b7b-b00a0d11d43a/tool-results/` 아래
  - 390 홈: `mcp-Claude_Browser-blob-1794536337527-oimlef.jpg`
  - 390 메뉴 열림: `mcp-Claude_Browser-blob-1794536337528-7hwhx5.jpg`
  - 1440 홈: `mcp-Claude_Browser-blob-1794536356686-nt4e7s.jpg`
  - 1440 /nope 404: `mcp-Claude_Browser-blob-1794536362735-ly80lv.jpg`
  - /studio(:3000) 로그인 화면: `mcp-Claude_Browser-blob-1794536396117-ug7i3f.jpg`

## 항목별 결과

| # | 항목 | 판정 | 근거 |
|---|---|---|---|
| 1 | lint / build | PASS | `npm run lint` → "No issues", exit 0. `npm run build` → exit 0, 라우트 `/`(○), `/_not-found`(○), `/api/revalidate-tag`(ƒ), `/studio/[[...tool]]`(○) |
| 2 | 홈 다크 배경·밝은 글자·헤더·푸터 | PASS | `.site-root` computed `background-color: rgb(14,14,17)`(=#0E0E11 바탕), `color: rgb(244,244,246)`(=#F4F4F6). `<header>`·`<footer>` 각 1개 렌더 |
| 3 | 모서리 0px | PASS | 390(메뉴 닫힘·열림)/800/1024/1440 및 /nope에서 보이는 모든 요소 중 `border-radius ≠ 0px` 요소 **0개**. `src`에 `rounded` 클래스 0건. 토큰 `--radius-*: 0`, `--radius-full`만 9999px |
| 4 | 폰트 적용 | PASS | computed `font-family`: 로고·h1 `"Playfair Display", …, "Noto Serif KR"` / 본문·링크 `"Plus Jakarta Sans", …, "Noto Sans KR"` / Archive·Menu·AI 고지 `"Space Mono", …, "Noto Sans KR"`. `document.fonts` loaded: Playfair 600, Jakarta 400, Space Mono 400·700, **Noto Sans KR 400 한글 유니코드 슬라이스 7개(U+AC..~ 범위) 로드** → 한글이 시스템 폰트로 떨어지지 않음. Noto Serif KR은 현재 한글 제목이 화면에 없어 미사용이라, `font-display` 클래스 h2에 한글을 임시 주입(DOM만, 코드 수정 아님)해 확인 → Noto Serif KR 6 face 로드, `fonts.check('24px "Noto Serif KR"','한글 제목')=true`. woff2는 모두 `/_next/static/media/` 셀프호스트(Google Fonts 외부 요청 없음) |
| 5 | 헤더 네비게이션 href | PASS | Primary nav: Genres→/genres, Artists→/artists, Albums→/albums, Articles→/articles. 모바일 nav·푸터 nav도 동일. 네 경로 모두 HTTP 404(정상) |
| 6 | 반응형 | PASS | `scrollWidth`=뷰포트 폭: 390→390, 800→800, 1024→1024, 1440→1440(가로 스크롤 없음, 390 메뉴 열린 상태도 없음). 390: 메뉴 버튼 노출(44×44), 클릭 시 `aria-expanded` false→true, `aria-label` Open menu→Close menu, 텍스트 Menu→Close, 링크 4개 표시 / 재클릭 시 false로 닫힘 / Escape로 닫힘. `aria-controls`가 메뉴 id와 일치. 800 이상에서는 메뉴 버튼 숨김·인라인 링크. 화면 하단 fixed/sticky 요소 0개(하단 탭바 없음) |
| 7 | 최소 기준 | **FAIL(부분)** | 본문: 홈 소개 18px, 404 본문 16px, 모바일 메뉴 링크 16px ✔. 12px 미만 텍스트 요소 **0개**(4개 폭 모두; 최소는 Archive·Menu·AI 고지 12px) ✔. viewport `width=device-width, initial-scale=1`(user-scalable·maximum-scale 없음) ✔. 메뉴 버튼 44×44, 모바일 메뉴 링크 44px, 푸터 링크 44px, 404 Back 링크 44px ✔. **미달: 헤더 로고 링크 141×28px(전 폭), 데스크톱 인라인 nav 링크 높이 38px(800/1024/1440)** ✘. 참고: 푸터 소개문·푸터/헤더 nav 링크는 14px(body-sm) — "본문" 정의에 따라 판단 필요 |
| 8 | 푸터 구성·제외 요소 | PASS | 푸터 텍스트: "Wet Pillow Club" / "슈게이징과 주변 장르를 다루는 밴드 음악 아카이브" / Genres·Artists·Albums·Articles / "이 사이트의 콘텐츠는 AI의 도움을 받아 작성되며 사실과 다른 내용이 있을 수 있습니다". 홈 전체 innerText에 그 외 요소 없음. `grep -rniE 'login|sign in|edit mode|verified|canonical|license|peer|open archive|search|gear|profile|telemetry'` (site 컴포넌트·(site)·not-found·lib/site.ts) → 0건 |
| 9 | /studio | **FAIL(경미)** | 정상 로드: :3000에서 Sanity 로그인 화면 렌더(스크린샷). 사이트 오염 없음: `.site-root` 0, `<footer>` 0, `--wpc-`/tailwind 규칙 포함 스타일시트 0, `curl` HTML에 `rel="stylesheet"` 0. **회귀: `body` margin 8px**(브라우저 기본값) → `#sanity` 컨테이너가 (8,8)에서 시작하고 문서 높이 916px > 뷰포트 900px로 **바깥 세로 스크롤 16px 발생**(`scrollTo` 후 `scrollY=16`). 아래 FAIL 상세 참고 |
| 10 | 엣지: 없는 경로 / studio 하위 | PASS | `/nope` HTTP 404, 헤더·푸터·다크 배경 유지, "404 / Page not found / 요청한 페이지를 찾을 수 없습니다. / Back to home(→/, 44px)", `robots=noindex`. `/studio/foo/bar`, `/studio/nope-xyz` → HTTP 200, Studio 캐치올이 처리, 사이트 header/footer/stylesheet 0 |
| 11 | 색 코드 직접 사용 | PASS | `grep -rnE '#[0-9A-Fa-f]{3,8}\b' src \| grep -v site.css` → 0건. `grep -rnE '(rgba?\|hsla?\|oklch\|oklab)\(' src \| grep -v site.css` → 0건. Tailwind 팔레트 색 클래스(`bg-zinc-*` 등)·임의값 `[#…]` → 0건. `style=` 인라인 → 0건. hex는 `site.css`의 `--wpc-*` 11개에만 있고 값은 docs/design/README.md 확정값과 일치 |
| 12 | 구조 점검 | PASS(개선 제안 있음) | 색은 `--wpc-surface-canvas/surface/surface-hover/border/text/text-muted/text-subtle/accent/accent-hover/mint/rose` 역할 이름 → `@theme inline`에서 `--color-*`로 매핑. 정의 셀렉터가 `:root, [data-theme='dark']`이고 SiteShell이 `data-theme="dark"`를 붙이므로 `[data-theme='light']` 블록 한 벌 추가로 라이트 확장 가능. `git show --stat 3d7f189`: 변경은 TASK.json, docs/design/**, docs/tasks/T-009.json, feature_list/UX.json, src/app 레이아웃·page·not-found·site.css·studio/layout, src/components/site/*, src/lib/{fonts,site}.ts, globals.css·템플릿 page.tsx 삭제. **`src/app/api`, `src/sanity`, `sanity.config.ts`, `next.config.ts`, `package.json` 변경 0건**(scope 밖 수정 없음). 신규 파일은 모두 import됨(미사용 파일 없음). 중복은 아래 제안 참고 |

## FAIL 상세

### F1. /studio body 기본 margin 8px → 바깥 스크롤 16px (step 8 "기존처럼")
- 재현: `npm run dev` → `http://localhost:3000/studio` → 콘솔에서 `getComputedStyle(document.body).margin` = `8px`, `document.documentElement.scrollHeight`(916) > `innerHeight`(900). 페이지 전체가 16px 위아래로 스크롤되고 Studio가 8px 안쪽에서 시작.
- 원인 추정: T-010 전에는 루트 `layout.tsx`가 `globals.css`(Tailwind preflight 포함)를 import해 Studio에도 `body{margin:0}`이 적용됐다. 이번에 Tailwind를 `(site)`로 옮기면서 루트·studio 레이아웃에 리셋이 하나도 남지 않아 브라우저 기본 margin이 살아났다. NextStudio는 `#sanity`에 `height:100vh`만 주고 body margin은 건드리지 않는다.
- 수정 제안: Studio 쪽에만 최소 리셋(body margin 0, 필요하면 높이)을 두거나, 루트 `<body>`에 Tailwind와 무관한 margin 0만 주는 방식. Tailwind preflight 전체를 다시 루트로 올리는 것은 분리 의도에 어긋나므로 피한다. TASK result는 이 부분을 "HTML 구조상 사이트 크롬 없음"으로만 확인해 놓쳤다.

### F2. 헤더 로고·데스크톱 nav 링크 터치 높이 미달 (지시서 7번)
- 재현: 800/1024/1440px에서 `nav[aria-label=Primary] a` 높이 38px, 모든 폭에서 로고 링크 `a[href="/"]` 높이 28px.
- 원인 추정: 데스크톱 링크는 `py-space-sm`(8px×2) + body-sm 줄높이 22px = 38px. 로고는 패딩 없음. 800~1024px는 태블릿 터치 폭이라 영향이 있다.
- 수정 제안: 헤더 링크·로고에도 모바일 메뉴·푸터처럼 최소 높이 44px(min-h-11 상당)을 준다. 헤더 높이 64px 안에 들어가므로 레이아웃 변화는 없다. UX-001 step 6 문구는 "메뉴 버튼"만 요구하므로 이 항목을 step 실패로 볼지는 JW 판단.

## 관찰·리스크 (FAIL 아님)

1. **클라이언트 이동 시 Studio로 사이트 CSS 누수**: 홈에서 `window.next.router.push('/studio')`로 이동하면 사이트 CSS 4개가 그대로 남아 `--wpc-`·Tailwind 규칙이 Studio에 적용됨(body margin도 0으로 바뀜). 지금은 사이트에 /studio 링크가 없어 실사용 경로는 없지만, 나중에 헤더/푸터에 Studio 링크를 넣으면 재현된다. 링크를 넣는다면 일반 `<a>`(전체 새로고침)로 두는 게 안전.
2. **/studio가 사이트 폰트·CSS를 미리 받음**: Studio HTML에 사이트 woff2 6개 `preload`와 site CSS 4개 `preload as=style`가 들어가고 실제로 200으로 다운로드됨(적용은 안 됨). 루트 `not-found.tsx`가 site.css·SiteShell을 import해서 루트 세그먼트 자원으로 묶이는 것으로 추정. 기능 문제는 없고 대역폭 낭비.
3. **404 페이지 `<title>` 비어 있음**: `document.title === ""`. metadata가 `(site)/layout.tsx`에만 있고 루트 not-found는 그 밖이라서. SEO 메타는 이번 scope 밖이지만 기본 title 정도는 다음 작업에서 챙길 만함.
4. **AI 고지 문구 가독성**: Space Mono(고정폭)로 한글 문장을 쓰면 공백이 고정폭 너비로 넓어져 단어 사이가 벌어져 보임(390 스크린샷). 한글 문장은 sans로 두고 영문 라벨만 mono로 쓰는 쪽을 제안.
5. **site.css 중복**: `.font-display`·`.font-mono` 커스텀 클래스와 `.site-root`의 font-family가 `@theme inline`의 `--font-display/--font-sans/--font-mono`와 같은 스택을 다시 적고 있음(Tailwind가 같은 이름 유틸리티를 이미 생성). 폰트 스택 변경 시 세 군데를 고쳐야 하므로 한 곳으로 줄이는 것을 제안.
6. **1440px 레이아웃**: 본문 카드가 좌측 정렬이고 최대 폭 컨테이너가 없음. 자리표시자 단계라 문제는 아니고 PAGE 작업에서 컨테이너 폭 토큰을 정할 때 고려.
7. 아직 쓰이지 않는 토큰(`accent-hover`, `mint`, `rose`, display-hero 계열 등)은 DESIGN.md 이관용이라 미사용 파일/중복으로 보지 않음.

## TASK.json result(Cursor 자기 보고) 대조

| 보고 내용 | 확인 결과 |
|---|---|
| lint/build 통과 | 일치 |
| 색 검색 0건 | 일치(검색식 확장해도 0건) |
| 한글 폰트 Noto Sans KR + Noto Serif KR | 일치, 실제 로드 확인 |
| Studio에 사이트 크롬·stylesheet 0 | 일치. 단 body margin 회귀(F1)와 preload 다운로드(관찰 2)는 보고에 없음 |
| 390/800/1024/1440 미확인 | 이번 검증에서 확인 완료(표 6·7번) |
| 추가 의존성 없음 | 일치(package.json 변경 없음) |
