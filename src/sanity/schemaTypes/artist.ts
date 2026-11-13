import {defineArrayMember, defineField, defineType} from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: '아티스트',
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
      name: 'artistType',
      title: '구분',
      type: 'string',
      options: {
        list: [
          {title: '밴드', value: 'band'},
          {title: '솔로', value: 'solo'},
          {title: '듀오', value: 'duo'},
          {title: '프로젝트', value: 'project'},
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
      name: 'genres',
      title: '장르',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'genre'}]})],
      validation: (rule) =>
        rule.min(1).warning('장르를 1개 이상 지정하는 것을 권장합니다'),
    }),
    defineField({
      name: 'country',
      title: '국가',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: '도시',
      type: 'string',
    }),
    defineField({
      name: 'activeFrom',
      title: '활동 시작 연도',
      type: 'number',
      validation: (rule) => rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'activeTo',
      title: '활동 종료 연도',
      type: 'number',
      description: '비우면 활동 중으로 간주합니다.',
      validation: (rule) => rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'members',
      title: '멤버',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'member',
          title: '멤버',
          fields: [
            defineField({
              name: 'artist',
              title: '아티스트 참조',
              type: 'reference',
              weak: true,
              to: [{type: 'artist'}],
            }),
            defineField({
              name: 'name',
              title: '이름',
              type: 'string',
            }),
            defineField({
              name: 'role',
              title: '역할',
              type: 'string',
            }),
            defineField({
              name: 'from',
              title: '시작 연도',
              type: 'number',
              validation: (rule) => rule.integer().min(1900).max(2100),
            }),
            defineField({
              name: 'to',
              title: '종료 연도',
              type: 'number',
              validation: (rule) => rule.integer().min(1900).max(2100),
            }),
          ],
          validation: (rule) =>
            rule.custom((member) => {
              const value = member as
                | {artist?: {_ref?: string}; name?: string}
                | undefined
              if (!value?.artist?._ref && !value?.name?.trim()) {
                return '아티스트 참조 또는 이름 중 하나는 필수입니다'
              }
              return true
            }),
          preview: {
            select: {
              title: 'name',
              artistName: 'artist.name',
              role: 'role',
            },
            prepare({title, artistName, role}) {
              return {
                title: title || artistName || '이름 없음',
                subtitle: role,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'links',
      title: '링크',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'link',
          title: '링크',
          fields: [
            defineField({
              name: 'kind',
              title: '종류',
              type: 'string',
              options: {
                list: [
                  {title: '밴드캠프', value: 'bandcamp'},
                  {title: '홈페이지', value: 'website'},
                  {title: 'X', value: 'x'},
                  {title: '인스타그램', value: 'instagram'},
                  {title: '유튜브', value: 'youtube'},
                  {title: '기타', value: 'other'},
                ],
              },
              validation: (rule) => rule.required().error('링크 종류는 필수입니다'),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) =>
                rule
                  .required()
                  .uri({scheme: ['http', 'https']})
                  .error('올바른 URL을 입력하세요'),
            }),
          ],
          preview: {
            select: {title: 'kind', subtitle: 'url'},
          },
        }),
      ],
    }),
    defineField({
      name: 'featuredAlbums',
      title: '대표 앨범',
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
      name: 'featured',
      title: '홈 노출',
      type: 'boolean',
      description:
        '메인(홈) 화면에 이 아티스트를 노출할지 여부입니다. 장르·아티스트의 ‘대표 아티스트·대표 앨범’ 참조 배열과는 별개입니다.',
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
      title: 'name',
      subtitle: 'summary',
      media: 'image',
    },
  },
})
