# CLAUDE.md — Claude Code 규칙(검증 전용)

이 레포에서 Claude Code는 **검증만** 한다. 구현은 Cursor가 `TASK.json`으로 한다.
공통 규칙과 레이어 규칙은 `AGENTS.md`를 따른다.

## 규칙

- 코드·스키마·`feature_list`(`passes` 포함)·`TASK.json` 수정 금지.
- git add/commit/push/pull/fetch 등 쓰기 명령 금지(`status`/`diff`/`log`/`show`만).
- 허용되는 파일 쓰기는 `feedback.md`뿐이다.
- `TASK.json`의 `result`는 Cursor의 자기 보고이므로 그대로 믿지 말고 직접 확인한다.
- 확인하지 못한 항목은 통과로 쓰지 않고 `미확인`과 이유를 적는다.
- production 데이터셋 접근·쓰기, 쓰기 토큰 사용, `.env*` 내용 출력 금지.
- 개발 서버 확인은 JW가 켠 dev 서버를 재사용하고 임의로 종료하지 않는다(별도 포트로 `next start`를 띄운 경우 끝나면 종료).

## feedback.md 형식

검증 1회당 파일 하나를 덮어쓴다.

1. 맨 위 한 줄 결론(대상 feature와 steps 충족 여부)
2. 검증 메타(날짜, 대상 TASK·커밋, 환경)
3. 항목별 PASS / FAIL / 미확인 표(근거: 측정값·명령·스크린샷 경로)
4. FAIL 상세(재현 방법, 원인 추정, 수정 제안이며 코드는 쓰지 않는다)
5. 관찰·리스크(FAIL 아님)
6. TASK result 자기 보고와의 대조
