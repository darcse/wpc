# WPC 콘텐츠 모델 (확정, 2026-11-13)

스키마 구현(`src/sanity/schemaTypes`)의 기준 문서다. 이 문서와 코드가 다르면 임의로 바꾸지 말고 보고한다.
Studio 라벨과 검증 메시지는 한국어, 필드명은 아래 영문명을 쓴다.

## 공통 원칙

- 문서 타입: `genre`, `artist`, `album`, `article` + 공유 타입 `blockContent`, `sourceItem`
- 목록류(장르에 속한 아티스트·앨범, 아티스트의 앨범 목록, 하위 장르, 관련 소식, 이 문서를 언급한 글)는 저장하지 않고 프론트 쿼리(`references()`)로 계산한다.
- 공개 여부는 Sanity draft/published로만 통제한다. 별도 `reviewStatus` 필드는 두지 않는다.
- 모든 문서 타입에 `aiGenerated`(boolean, 필수, `initialValue: true`)와 `sources`(선택)를 둔다. `sources`는 네 타입 공통으로 `sourceItem` 객체 배열이다. 각 항목은 `title`(string, 필수)과 `url`(url, 선택, http/https)을 갖는다.
- 이미지 필드는 alt(대체 텍스트) 하위 필드를 두고, 이미지가 있으면 alt를 필수로 한다. 이미지 자체는 선택이다.
- `summary`는 160자 이내(초과 시 검증 오류)이며 목록 카드와 SEO 설명에 쓴다.
- slug는 공개 후 바꾸지 않는 값이다(코드로 강제하지 않고 필드 설명에 명시).
- 한국어 단일 사이트다. 다국어·번역 필드는 두지 않는다.
- 필드 삭제·이름 변경·타입 변경은 하지 않는다. 추가는 선택 필드로 한다.

## 참조 강도

| 구분 | 필드 | 강도 |
|---|---|---|
| 구조 참조 | `artist.genres`, `album.artists`, `album.genres`, `genre.parentGenre` | strong (기본) |
| 선택·순환 가능 | `genre.relatedGenres`, `genre.featuredArtists`, `genre.featuredAlbums`, `artist.featuredAlbums`, `artist.members[].artist`, `article.genres/artists/albums` | `weak: true` |
| 본문 인라인 링크 | `blockContent`의 `internalLink` | `weak: true` |

## blockContent (공유 리치텍스트)

- styles(저장값 → 라벨): `normal` → 본문, `h2` → 제목 2, `h3` → 제목 3, `blockquote` → 인용 (h1 제외)
- lists(저장값 → 라벨): `bullet` → 글머리 기호, `number` → 번호 목록
- decorators(저장값 → 라벨): `strong` → 굵게, `em` → 기울임
- annotations: `link`(외부 URL, 형식 검증), `internalLink`(weak 참조: genre/artist/album/article). 기본 세트 교체 여부가 문서마다 달라 보이므로 외부 링크도 **명시적으로 선언**하고 Studio에서 동작을 확인한다.
- 블록 이미지: alt 필수
- 유튜브 임베드는 본문에 넣지 않는다(뮤비는 앨범 필드로만).

## sourceItem (공유 출처 항목)

| 필드 | 필수 | 타입 / 비고 |
|---|---|---|
| `title` | 필수 | string |
| `url` | | url, http/https. 비워 두면 책·잡지 등 URL 없는 출처 |

## genre

| 필드 | 필수 | 타입 / 비고 |
|---|---|---|
| `name` | 필수 | string |
| `nameAlt` | | string, 한글/원어 표기 |
| `slug` | 필수 | slug, source `name` |
| `summary` | | string, 160자 이내 |
| `body` | | blockContent |
| `image` | | image + alt |
| `parentGenre` | | genre 단일 참조(strong), 자기 자신 선택 불가 |
| `relatedGenres` | | genre 참조 배열(weak), 관계 유형 없음 |
| `originYear`, `endYear` | | number(정수, 선택), 1900~2100. 라벨 '시작 연도'·'종료 연도' |
| `featuredArtists` | | artist 참조 배열(weak), 화면 3~5개 노출 |
| `featuredAlbums` | | album 참조 배열(weak), 화면 3~5개 노출 |
| `aiGenerated`, `sources` | 공통 | `sources`는 `sourceItem` 배열 |

## artist

| 필드 | 필수 | 타입 / 비고 |
|---|---|---|
| `name` | 필수 | string |
| `nameAlt` | | string |
| `slug` | 필수 | slug, source `name` |
| `artistType` | | 선택값(저장값 → 라벨): `band` → 밴드, `solo` → 솔로, `duo` → 듀오, `project` → 프로젝트, `other` → 기타 (추후 값 추가) |
| `summary` | | string, 160자 이내 |
| `body` | | blockContent |
| `image` | | image + alt |
| `genres` | 필수 권장 | genre 참조 배열(strong). 비어 있으면 **경고**(발행은 가능) |
| `country`, `city` | | string |
| `activeFrom`, `activeTo` | | number(정수, 연도), 1900~2100. `activeTo`가 비면 활동 중으로 간주 |
| `members` | | 객체 배열: `artist`(artist 참조, weak) 또는 `name`(string) 중 **하나는 필수** + `role`(string, 선택) + `from`/`to`(연도, 선택, 1900~2100) |
| `links` | | 객체 배열: `kind`(필수, 저장값 → 라벨: `bandcamp` → 밴드캠프, `website` → 홈페이지, `x` → X, `instagram` → 인스타그램, `youtube` → 유튜브, `other` → 기타) + `url`(필수, URL 형식 http/https) |
| `featuredAlbums` | | album 참조 배열(weak) |
| `featured` | | boolean, 선택, `initialValue: false`, 라벨 '홈 노출'. 메인 노출용이며 `featuredAlbums`·장르의 대표 참조 배열과 별개. 값이 없으면(미체크·미설정) 프론트는 최신순으로 대체 |
| `aiGenerated`, `sources` | 공통 | `sources`는 `sourceItem` 배열 |

## album

| 필드 | 필수 | 타입 / 비고 |
|---|---|---|
| `title` | 필수 | string |
| `titleAlt` | | string |
| `slug` | 필수 | slug, 생성 시 `제목-연도` 형태(한글 유지 slugify). 같은 해 동명은 아티스트명을 **수동**으로 덧붙임(자동 접미사 미구현). 중복은 Sanity 슬러그 기본 유일성 검증에 의존 |
| `artists` | 필수 | artist 참조 배열(strong), 1명 이상 |
| `albumType` | | 선택값(저장값 → 라벨): `full` → 정규, `ep` → EP, `single` → 싱글, `live` → 라이브, `compilation` → 컴필레이션, `split` → 스플릿, `other` → 기타 |
| `releaseDate` | 필수 권장 | date. 비어 있으면 **경고**(발행은 가능). 연도별 보기·정렬 기준 |
| `label` | | string, 선택. 라벨 '레이블' |
| `summary` | | string, 160자 이내 |
| `body` | | blockContent |
| `cover` | | image + alt |
| `genres` | | genre 참조 배열(strong), 선택. 비면 프론트가 소속 아티스트의 장르를 따름 |
| `tracks` | | string 배열(곡 타입 없음, 가사 없음) |
| `musicVideoUrl` | | URL, 유튜브 1개 |
| `links` | | 객체: `appleMusic`, `youtubeMusic`, `spotify` 각각 URL(선택). `youtubeMusic`은 URL을 그대로 저장하고 재생목록 ID는 프론트가 URL에서 계산해 임베드에 쓴다. `list=`가 없으면 Studio에서 **경고**(발행은 가능). 임베드가 불가할 때를 대비해 프론트는 YouTube Music 링크 버튼을 항상 함께 둔다 |
| `featured` | | boolean, 선택, `initialValue: false`, 라벨 '홈 노출'. 메인 노출용이며 장르·아티스트의 대표 참조 배열과 별개. 값이 없으면 프론트는 최신순으로 대체 |
| `aiGenerated`, `sources` | 공통 | `sources`는 `sourceItem` 배열 |

## article

| 필드 | 필수 | 타입 / 비고 |
|---|---|---|
| `title` | 필수 | string |
| `slug` | 필수 | slug, source `title` |
| `articleType` | | 선택값(저장값 → 라벨): `news` → 소식, `review` → 리뷰, `column` → 칼럼, `interview` → 인터뷰, `other` → 기타 |
| `summary` | | string, 160자 이내 |
| `body` | 필수 | blockContent |
| `image` | | image + alt |
| `publishedAt` | 필수 | datetime, 정렬 기준 |
| `genres`, `artists`, `albums` | | 각 참조 배열(weak) |
| `sourceUrl` | | URL, 외부 소식 원문 |
| `featured` | | boolean, 선택, `initialValue: false`, 라벨 '홈 노출'. 메인 노출용이며 장르·아티스트의 대표 참조 배열과 별개. 값이 없으면 프론트는 최신순으로 대체. genre에는 없음 |
| `aiGenerated`, `sources` | 공통 | `sources`는 `sourceItem` 배열 |

## v1에서 하지 않기로 한 것

- 장비·음향 수치(페달 체인, RT60, dB 등)는 제외한다. 나중에 별도 `gear` 문서 타입으로 확장할 수 있다.
- 트랙 러닝타임은 제외한다. `tracks`는 문자열 배열을 유지한다.
- 아티클 본문 표는 제외한다.
- 해시태그 필드는 두지 않는다. 연결된 장르 이름으로 대체한다.
- 저자 필드는 두지 않는다. `aiGenerated`가 true면 화면에 'AI 작성'으로 표시한다.
- 카탈로그 번호는 제외한다.

## AI 입력 단계에서 정할 규칙

- `country`는 자유 입력이므로 영문 표준명으로 표기를 통일한다.
- 실존 인물의 발언은 출처가 있을 때만 인용하고 지어내지 않는다.
- 가상의 저자·기여자 이름을 쓰지 않는다.

## 쓰기 검증 한계

Studio 검증(required, 형식 등)은 Studio 입력에서만 동작하고 API 쓰기에서는 강제되지 않는다. AI 입력 단계(별도 feature)에서 쓰기 전 검증을 따로 설계한다.
