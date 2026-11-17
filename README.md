# Wet Pillow Club (WPC)

슈게이징과 주변 장르를 다루는 밴드 음악 아카이브. 공개·읽기 전용 중심이다.

## 스택

| 항목 | 버전·비고 |
|---|---|
| Next.js | 16.4.5 (App Router) |
| React | 19.3.0 |
| Tailwind CSS | v4 (`@tailwindcss/turbopack`) |
| Sanity | 5.31.2 + next-sanity 13.4.0 |
| 배포 | Vercel |

Node.js `>=22.12`.

## 구조

- **Sanity**가 콘텐츠 백엔드다. Studio는 `/studio`에 임베드된다.
- 공개 사이트는 `src/app/(site)/` 라우트 그룹, Studio는 `src/app/studio/`로 레이아웃·스타일을 분리한다.
- 콘텐츠 모델·스키마는 `src/sanity/schemaTypes/`, 사이트 GROQ는 `src/sanity/queries/`.

## 실행

```bash
npm run dev    # http://localhost:3000
npm run lint
npm run build
npm run start  # 빌드 후 프로덕션 서버
```

- 사이트: `/`
- Studio: `/studio`
- 장르 목록: `/genres`

## 환경변수

이름은 `.env.example` 기준이다. **값은 커밋하지 않는다.**

| 이름 | 용도 |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity 프로젝트 |
| `NEXT_PUBLIC_SANITY_DATASET` | 데이터셋 |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API 버전(없으면 코드 기본값) |
| `SANITY_REVALIDATE_SECRET` | 웹훅 시크릿(서버 전용, `NEXT_PUBLIC_` 금지) |

## 데이터셋

| 환경 | 데이터셋 |
|---|---|
| 로컬 개발 | `development` |
| Vercel 운영 | `production` |

에이전트·로컬 구현은 `development`만 쓴다.

## 콘텐츠 갱신

Sanity 웹훅 → `POST /api/revalidate-tag` → 문서 타입명 태그 재검증.
설정 절차는 `docs/webhook-setup.md`.

## 문서

| 경로 | 내용 |
|---|---|
| `docs/content-model.md` | 콘텐츠 모델, AI 입력·출처 규칙 |
| `docs/design/` | 디자인 기준(`README.md`, `DESIGN.md`)·시안 |
| `docs/webhook-setup.md` | 웹훅·Vercel 설정 |
| `feature_list/` | 기능 스펙(원본, `passes` 포함) |
| `docs/tasks/` | 완료 TASK 보관 |
| `TASK.json` | 현재 작업 1건 |
| `feedback.md` | Claude Code 검증 결과 |
| `AGENTS.md` | Cursor 등 구현 에이전트 규칙 |
| `CLAUDE.md` | Claude Code 검증 전용 규칙 |

## 작업 흐름

1. **플래너(Claude)** — `TASK.json`·`feature_list` 작성
2. **Cursor** — TASK 구현·커밋·push
3. **Claude Code** — 검증 후 `feedback.md` 작성
4. **JW** — 확인 후 `passes` 갱신
