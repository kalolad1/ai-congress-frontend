
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx): Promise<Doc<"users">[]> => {
    const users = await ctx.db.query("users").order("desc").take(100);
    return users.reverse();
  },
});

export const get = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }): Promise<Doc<"users">> => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    return user;
  },
});

export const create = mutation({
  args: { name: v.string(), userId: v.string()},
  handler: async (ctx, { name, userId }) => {
    await ctx.db.insert("users", { name, userId });
  },
});
