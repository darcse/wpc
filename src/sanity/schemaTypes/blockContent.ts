import {defineArrayMember, defineField, defineType} from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: '본문',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: '본문', value: 'normal'},
        {title: '제목 2', value: 'h2'},
        {title: '제목 3', value: 'h3'},
        {title: '인용', value: 'blockquote'},
      ],
      lists: [
        {title: '글머리 기호', value: 'bullet'},
        {title: '번호 목록', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: '굵게', value: 'strong'},
          {title: '기울임', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: '외부 링크',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) =>
                  rule
                    .required()
                    .uri({scheme: ['http', 'https', 'mailto', 'tel']})
                    .error('올바른 URL을 입력하세요'),
              }),
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: '문서 링크',
            fields: [
              defineField({
                name: 'reference',
                type: 'reference',
                title: '문서',
                weak: true,
                to: [
                  {type: 'genre'},
                  {type: 'artist'},
                  {type: 'album'},
                  {type: 'article'},
                ],
                validation: (rule) =>
                  rule.required().error('문서 링크 대상은 필수입니다'),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: '이미지',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: '대체 텍스트',
          validation: (rule) =>
            rule.required().error('대체 텍스트는 필수입니다'),
        }),
      ],
    }),
  ],
})
