import { defineCollection, z } from 'astro:content';

const newsSchema = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
  }),
});

export const collections = {
  'news-it': newsSchema,
  'news-en': newsSchema,
  'news-de': newsSchema,
};
