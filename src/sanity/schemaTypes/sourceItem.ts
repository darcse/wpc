import {defineField, defineType} from 'sanity'

export const sourceItem = defineType({
  name: 'sourceItem',
  title: '출처 항목',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (rule) => rule.required().error('제목은 필수입니다'),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).error('올바른 URL을 입력하세요'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
  },
})
