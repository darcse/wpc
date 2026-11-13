# Sanity 웹훅 → 태그 재검증 설정 체크리스트

WPC는 Studio에서 문서를 **발행**하면 Sanity 웹훅이 Next.js의 `/api/revalidate-tag`를 호출하고, 해당 문서 타입 캐시 태그를 바로 무효화한다.  
이 문서는 JW가 Manage·Vercel에서 직접 설정할 때 따른다. **시크릿 실제 값은 어디에도 적지 않는다.**

구현 경로: `src/app/api/revalidate-tag/route.ts`  
관련 기능: `feature_list/SETUP.json` SETUP-001

---

## 0. 준비

1. 앱이 **프로덕션(또는 확인할 배포 URL)** 에 올라가 있는지 확인한다. 로컬만으로는 Sanity가 호출할 공개 URL이 없다.
2. 긴 무작위 시크릿을 하나 만든다(예: `openssl rand -base64 32`). **이 값을 메모장에만 잠깐 두고**, 깃·슬랙·이 문서에는 넣지 않는다.
3. 같은 시크릿을 아래에 **두 곳**에 넣는다: Vercel 환경변수, Sanity 웹훅 Secret.

---

## 1. Vercel 환경변수

1. Vercel 프로젝트 → **Settings → Environment Variables**.
2. 이름: `SANITY_REVALIDATE_SECRET`  
   - `NEXT_PUBLIC_` 를 **붙이지 않는다** (서버 전용).
3. 값은 위에서 만든 시크릿. Production(필요하면 Preview도)에 넣는다.
4. 이미 있는 공개용 변수도 확인한다(값은 여기 적지 않음):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (운영은 보통 `production`)
5. 변수를 바꾼 뒤에는 **Redeploy** 한다. 안 하면 예전 env로 돈다.

로컬에서 시험할 때는 `.env.local`에 같은 **이름**으로만 넣고, `.env.example`처럼 값은 커밋하지 않는다.

---

## 2. Sanity Manage에서 웹훅 만들기

위치: [sanity.io/manage](https://www.sanity.io/manage) → 프로젝트 → **API → Webhooks** → Create.

**데이터셋마다 웹훅을 따로** 만든다 (`development`용 / `production`용). URL·시크릿은 같아도 되고, 데이터셋만 다르게 고른다.

| 항목 | 설정 |
|---|---|
| Name | 예: `wpc-revalidate-tag-production` |
| URL | `https://<배포호스트>/api/revalidate-tag` (`<배포호스트>`를 실제 도메인으로) |
| Dataset | 이 웹훅이 담당하는 데이터셋만 선택 |
| Trigger on | **Create**, **Update**, **Delete** 모두 |
| Filter | `_type in ["genre","artist","album","article"]` |
| Projection | `{_type}` |
| HTTP method | **POST** |
| Secret | Vercel의 `SANITY_REVALIDATE_SECRET`과 **같은** 값 |
| Draft / Version events | **끄기** (발행된 문서만). 켜면 편집 중에도 요청이 쏟아질 수 있다 |
| Status | Enable |

저장한 뒤 목록에서 해당 웹훅이 켜져 있는지 확인한다.

---

## 3. 동작 확인 순서 (먼저 프로덕션 배포)

1. 위 1·2를 **production 배포 + production(또는 실제 쓰는) 데이터셋** 기준으로 끝낸다.
2. Studio에서 테스트용 문서를 하나 **발행**(또는 발행된 문서 수정 후 발행)한다.
3. Manage → 해당 웹훅 → **Attempts**(시도 기록)를 연다.
4. 최근 시도가 **2xx** 인지 본다.
   - **401**: 시크릿 불일치, 또는 서명 없는 요청. Vercel·웹훅 Secret이 같은지, Redeploy 했는지 확인.
   - **500** + Missing `SANITY_REVALIDATE_SECRET`: Vercel에 변수 없음/미배포.
   - **400**: `_type`이 없거나 허용 목록 밖(필터·프로젝션 확인).
5. 공개 목록·상세 페이지가 생긴 뒤에는(PAGE 작업), 발행 직후 새로고침해 내용이 바뀌는지 본다. **지금은 재검증 API만 있으므로 화면 반영 검증은 그때.**

로컬 e2e가 필요하면 ngrok 등으로 `next dev`를 노출하고, **development 전용 웹훅** URL을 터널로 바꾼다. 서명 없는 `curl`로는 401만 확인할 수 있고, 실제 서명 검증은 Sanity가 보낸 요청으로만 확인된다.

---

## 4. 참고 URL

- 웹훅 개요: https://www.sanity.io/docs/content-lake/webhooks
- Next.js + Sanity 서명·재검증: https://www.sanity.io/docs/nextjs/validating-sanity-webhooks-nextjs
- 캐시·태그 전략: https://www.sanity.io/docs/nextjs/caching-and-revalidation-in-nextjs

---

## 5. 에이전트/개발자가 하지 않는 것

- Sanity 웹훅 생성·수정, Vercel 환경변수 입력 → **JW**
- 시크릿 값을 문서·커밋·채팅에 붙이기 → **금지**
- 공개 페이지 GROQ에 태그 붙이기 → **이후 PAGE 작업**
