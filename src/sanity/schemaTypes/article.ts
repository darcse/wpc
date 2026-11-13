import {defineArrayMember, defineField, defineType} from 'sanity'

export const article = defineType({
  name: 'article',
  title: '아티클',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (rule) => rule.required().error('제목은 필수입니다'),
    }),
    defineField({
      name: 'slug',
      title: '슬러그',
      type: 'slug',
      description: '공개 후 바꾸지 마세요.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required().error('슬러그는 필수입니다'),
    }),
    defineField({
      name: 'articleType',
      title: '종류',
      type: 'string',
      options: {
        list: [
          {title: '소식', value: 'news'},
          {title: '리뷰', value: 'review'},
          {title: '칼럼', value: 'column'},
          {title: '인터뷰', value: 'interview'},
          {title: '기타', value: 'other'},
        ],
        layout: 'radio',
      },
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
      validation: (rule) => rule.required().min(1).error('본문은 필수입니다'),
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
      name: 'publishedAt',
      title: '발행일',
      type: 'datetime',
      validation: (rule) => rule.required().error('발행일은 필수입니다'),
    }),
    defineField({
      name: 'genres',
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
      name: 'artists',
      title: '관련 아티스트',
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
      name: 'albums',
      title: '관련 앨범',
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
      name: 'sourceUrl',
      title: '원문 링크',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).error('올바른 URL을 입력하세요'),
    }),
    defineField({
      name: 'featured',
      title: '홈 노출',
      type: 'boolean',
      description:
        '메인(홈) 화면에 이 아티클을 노출할지 여부입니다. 장르·아티스트의 ‘대표 아티스트·대표 앨범’ 참조 배열과는 별개입니다.',
      initialValue: false,
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
      title: 'title',
      subtitle: 'publishedAt',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      const date =
        typeof subtitle === 'string'
          ? new Date(subtitle).toLocaleString('ko-KR')
          : ''
      return {title, subtitle: date, media}
    },
  },
})
