import {
  type ListingActivity,
  type ListingAccessibility,
} from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        accessibility: z.custom<ListingAccessibility>(),
        activity: z.custom<ListingActivity>(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.listing.findMany({
        where: {
          accessibility: input.accessibility,
          activity: input.activity,
        },
        include: {
          _count: true,
        },
      });
    }),
  getCount: publicProcedure
    .input(
      z.object({
        accessibility: z.custom<ListingAccessibility>(),
        activity: z.custom<ListingActivity>(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.listing.count({
        where: {
          accessibility: input.accessibility,
          activity: input.activity,
        },
      });
    }),
  getAllByUserId: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.listing.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.listing.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.listing.findUnique({
        where: {
          slug: input.slug,
        },
      });
    }),
});
