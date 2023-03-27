import {
  type ListingActivity,
  type ListingAccessibility,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    if (!ctx.session || ctx.session.user.role !== "ADMIN") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.prisma.listing.findMany({
      include: {
        _count: true,
      },
    });
  }),
  getAllByStatus: publicProcedure
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
        userId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      if (!ctx.session || !input.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.listing.findMany({
        where: {
          userId: input.userId,
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
