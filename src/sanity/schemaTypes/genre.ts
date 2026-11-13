import {defineArrayMember, defineField, defineType} from 'sanity'

export const genre = defineType({
  name: 'genre',
  title: '장르',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '이름',
      type: 'string',
      validation: (rule) => rule.required().error('이름은 필수입니다'),
    }),
    defineField({
      name: 'nameAlt',
      title: '다른 표기',
      type: 'string',
      description: '한글/원어 표기',
    }),
    defineField({
      name: 'slug',
      title: '슬러그',
      type: 'slug',
      description: '공개 후 바꾸지 마세요.',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required().error('슬러그는 필수입니다'),
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
      name: 'image',
      title: '대표 이미지',
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
      name: 'parentGenre',
      title: '상위 장르',
      type: 'reference',
      to: [{type: 'genre'}],
      validation: (rule) =>
        rule.custom((value, context) => {
          const ref = value?._ref
          if (!ref) return true
          const rawId = context.document?._id
          if (!rawId) return true
          const publishedId = rawId.replace(/^drafts\./, '')
          if (ref === rawId || ref === publishedId) {
            return '자기 자신을 상위 장르로 선택할 수 없습니다'
          }
          return true
        }),
    }),
    defineField({
      name: 'relatedGenres',
      title: '관련 장르',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          weak: true,
          to: [{type: 'genre'}],
        }),
      ],
    }),
    defineField({
      name: 'originYear',
      title: '시작 연도',
      type: 'number',
      validation: (rule) => rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'endYear',
      title: '종료 연도',
      type: 'number',
      validation: (rule) => rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'featuredArtists',
      title: '대표 아티스트',
      description: '화면에 3~5개 정도 노출하는 것을 권장합니다.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          weak: true,
          to: [{type: 'artist'}],
        }),
      ],
    }),
    defineField({
      name: 'featuredAlbums',
      title: '대표 앨범',
      description: '화면에 3~5개 정도 노출하는 것을 권장합니다.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          weak: true,
          to: [{type: 'album'}],
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
      of: [defineArrayMember({type: 'sourceItem'})],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'summary',
      media: 'image',
    },
  },
})
