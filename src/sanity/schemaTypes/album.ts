import {defineArrayMember, defineField, defineType, type SlugifierFn} from 'sanity'

const slugifyAlbum: SlugifierFn = (input) =>
  input
    .trim()
    .toLowerCase()
    .normalize('NFKC')
    .replace(/\s+/g, '-')
    .replace(/[^\w\uac00-\ud7a3-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

export const album = defineType({
  name: 'album',
  title: '앨범',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (rule) => rule.required().error('제목은 필수입니다'),
    }),
    defineField({
      name: 'titleAlt',
      title: '다른 표기',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: '슬러그',
      type: 'slug',
      description:
        '공개 후 바꾸지 마세요. 생성 시 제목-연도 형태입니다. 같은 해 동명이면 아티스트명을 수동으로 덧붙이세요.',
      options: {
        source: (doc) => {
          const title = typeof doc?.title === 'string' ? doc.title : ''
          const releaseDate =
            typeof doc?.releaseDate === 'string' ? doc.releaseDate : ''
          const year = releaseDate.slice(0, 4)
          return [title, year].filter(Boolean).join('-')
        },
        slugify: slugifyAlbum,
        maxLength: 120,
      },
      validation: (rule) => rule.required().error('슬러그는 필수입니다'),
    }),
    defineField({
      name: 'artists',
      title: '아티스트',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'artist'}]})],
      validation: (rule) =>
        rule.min(1).error('아티스트를 1명 이상 지정해야 합니다'),
    }),
    defineField({
      name: 'albumType',
      title: '앨범 타입',
      type: 'string',
      options: {
        list: [
          {title: '정규', value: 'full'},
          {title: 'EP', value: 'ep'},
          {title: '싱글', value: 'single'},
          {title: '라이브', value: 'live'},
          {title: '컴필레이션', value: 'compilation'},
          {title: '스플릿', value: 'split'},
          {title: '기타', value: 'other'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'releaseDate',
      title: '발매일',
      type: 'date',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return '발매일을 입력하는 것을 권장합니다'
          return true
        }).warning(),
    }),
    defineField({
      name: 'summary',
      title: '한 줄 요약',
      type: 'string',
      validation: (rule) =>
        rule.max(160).error('한 줄 요약은 160자 이내여야 합니다'),
    }),
    defineField({
      name: 'body',
      title: '본문',
      type: 'blockContent',
    }),
    defineField({
      name: 'cover',
      title: '커버 이미지',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: '대체 텍스트',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const parent = context.parent as {asset?: {_ref?: string}} | undefined
              if (parent?.asset?._ref && !alt?.trim()) {
                return '이미지가 있으면 대체 텍스트는 필수입니다'
              }
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'genres',
      title: '장르',
      description: '비우면 프론트가 소속 아티스트의 장르를 따를 수 있습니다.',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'genre'}]})],
    }),
    defineField({
      name: 'tracks',
      title: '트랙리스트',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'musicVideoUrl',
      title: '뮤직비디오 URL',
      type: 'url',
      description: '유튜브 1개',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).error('올바른 URL을 입력하세요'),
    }),
    defineField({
      name: 'links',
      title: '스트리밍 링크',
      type: 'object',
      fields: [
        defineField({
          name: 'appleMusic',
          title: 'Apple Music',
          type: 'url',
          validation: (rule) =>
            rule.uri({scheme: ['http', 'https']}).error('올바른 URL을 입력하세요'),
        }),
        defineField({
          name: 'youtubeMusic',
          title: 'YouTube Music',
          type: 'url',
          validation: (rule) =>
            rule.uri({scheme: ['http', 'https']}).error('올바른 URL을 입력하세요'),
        }),
        defineField({
          name: 'spotify',
          title: 'Spotify',
          type: 'url',
          validation: (rule) =>
            rule.uri({scheme: ['http', 'https']}).error('올바른 URL을 입력하세요'),
        }),
      ],
    }),
    defineField({
      name: 'aiGenerated',
      title: 'AI 생성 여부',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sources',
      title: '출처',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'url',
          validation: (rule) =>
            rule.uri({scheme: ['http', 'https']}).error('올바른 URL을 입력하세요'),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist0: 'artists.0.name',
      artist1: 'artists.1.name',
      artist2: 'artists.2.name',
      media: 'cover',
      date: 'releaseDate',
    },
    prepare({title, artist0, artist1, artist2, media, date}) {
      const artists = [artist0, artist1, artist2].filter(Boolean)
      const year = typeof date === 'string' ? date.slice(0, 4) : ''
      const artistLabel = artists.length ? artists.join(', ') : '아티스트 미지정'
      return {
        title,
        subtitle: year ? `${artistLabel} · ${year}` : artistLabel,
        media,
      }
    },
  },
})
