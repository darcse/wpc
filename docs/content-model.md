# WPC 콘텐츠 모델 (확정, 2026-11-11)

스키마 구현(`src/sanity/schemaTypes`)의 기준 문서다. 이 문서와 코드가 다르면 임의로 바꾸지 말고 보고한다.
Studio 라벨과 검증 메시지는 한국어, 필드명은 아래 영문명을 쓴다.

## 공통 원칙

- 문서 타입: `genre`, `artist`, `album`, `article` + 공유 타입 `blockContent`
- 목록류(장르에 속한 아티스트·앨범, 아티스트의 앨범 목록, 하위 장르, 관련 소식, 이 문서를 언급한 글)는 저장하지 않고 프론트 쿼리(`references()`)로 계산한다.
- 공개 여부는 Sanity draft/published로만 통제한다. 별도 `reviewStatus` 필드는 두지 않는다.
- 모든 문서 타입에 `aiGenerated`(boolean, 필수, `initialValue: true`)와 `sources`(URL 배열, 선택, URL 형식 검증)를 둔다.
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

- styles: normal, h2, h3, blockquote (h1 제외)
- lists: bullet, number
- decorators: strong, em
- annotations: `link`(외부 URL, 형식 검증), `internalLink`(weak 참조: genre/artist/album/article). 기본 세트 교체 여부가 문서마다 달라 보이므로 외부 링크도 **명시적으로 선언**하고 Studio에서 동작을 확인한다.
- 블록 이미지: alt 필수
- 유튜브 임베드는 본문에 넣지 않는다(뮤비는 앨범 필드로만).

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
| `featuredArtists` | | artist 참조 배열(weak), 화면 3~5개 노출 |
| `featuredAlbums` | | album 참조 배열(weak), 화면 3~5개 노출 |
| `aiGenerated`, `sources` | 공통 | |

## artist

| 필드 | 필수 | 타입 / 비고 |
|---|---|---|
| `name` | 필수 | string |
| `nameAlt` | | string |
| `slug` | 필수 | slug, source `name` |
| `artistType` | | 선택값: 밴드 / 솔로 / 듀오 / 프로젝트 / 기타 (추후 값 추가) |
| `summary` | | string, 160자 이내 |
| `body` | | blockContent |
| `image` | | image + alt |
| `genres` | 필수 권장 | genre 참조 배열(strong). 비어 있으면 **경고**(발행은 가능) |
| `country`, `city` | | string |
| `activeFrom`, `activeTo` | | number(연도). `activeTo`가 비면 활동 중으로 간주 |
| `members` | | 객체 배열: `artist`(artist 참조, weak) 또는 `name`(string) 중 **하나는 필수** + `role`(string, 선택) + `from`/`to`(연도, 선택) |
| `links` | | 객체 배열: `kind`(밴드캠프/홈페이지/X/인스타그램/유튜브/기타) + `url`(URL 형식) |
| `featuredAlbums` | | album 참조 배열(weak) |
| `aiGenerated`, `sources` | 공통 | |

## album

| 필드 | 필수 | 타입 / 비고 |
|---|---|---|
| `title` | 필수 | string |
| `titleAlt` | | string |
| `slug` | 필수 | slug, `제목-연도` 형태(같은 해 동명이면 아티스트명을 덧붙임), 중복 검증 |
| `artists` | 필수 | artist 참조 배열(strong), 1명 이상 |
| `albumType` | | 선택값: 정규 / EP / 싱글 / 라이브 / 컴필레이션 / 스플릿 / 기타 |
| `releaseDate` | 필수 권장 | date. 비어 있으면 **경고**(발행은 가능). 연도별 보기·정렬 기준 |
| `summary` | | string, 160자 이내 |
| `body` | | blockContent |
| `cover` | | image + alt |
| `genres` | | genre 참조 배열(strong), 선택. 비면 프론트가 소속 아티스트의 장르를 따름 |
| `tracks` | | string 배열(곡 타입 없음, 가사 없음) |
| `musicVideoUrl` | | URL, 유튜브 1개 |
| `links` | | 객체: `appleMusic`, `youtubeMusic`, `spotify` 각각 URL(선택) |
| `aiGenerated`, `sources` | 공통 | |

## article

| 필드 | 필수 | 타입 / 비고 |
|---|---|---|
| `title` | 필수 | string |
| `slug` | 필수 | slug, source `title` |
| `articleType` | | 선택값: 소식 / 리뷰 / 칼럼 / 기타 |
| `summary` | | string, 160자 이내 |
| `body` | 필수 | blockContent |
| `image` | | image + alt |
| `publishedAt` | 필수 | datetime, 정렬 기준 |
| `genres`, `artists`, `albums` | | 각 참조 배열(weak) |
| `sourceUrl` | | URL, 외부 소식 원문 |
| `aiGenerated`, `sources` | 공통 | |

## 쓰기 검증 한계

Studio 검증(required, 형식 등)은 Studio 입력에서만 동작하고 API 쓰기에서는 강제되지 않는다. AI 입력 단계(별도 feature)에서 쓰기 전 검증을 따로 설계한다.
